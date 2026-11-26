// Lifecycle (managed) node standing in for a hardware driver.
// It only publishes a heartbeat while ACTIVE.
#include <chrono>
#include <memory>
#include <string>

#include "rclcpp/rclcpp.hpp"
#include "rclcpp_lifecycle/lifecycle_node.hpp"
#include "std_msgs/msg/string.hpp"

using CallbackReturn = rclcpp_lifecycle::node_interfaces::LifecycleNodeInterface::CallbackReturn;

class FakeDriver : public rclcpp_lifecycle::LifecycleNode {
public:
  FakeDriver() : LifecycleNode("fake_driver") { declare_parameter("port", "/dev/ttyUSB0"); }

  CallbackReturn on_configure(const rclcpp_lifecycle::State&) override {
    port_ = get_parameter("port").as_string();
    pub_ = create_publisher<std_msgs::msg::String>("heartbeat", 10);
    timer_ = create_wall_timer(std::chrono::milliseconds(500), [this] { tick(); });
    timer_->cancel();  // nothing runs until activated
    RCLCPP_INFO(get_logger(), "configured: opened %s", port_.c_str());
    return CallbackReturn::SUCCESS;
  }

  CallbackReturn on_activate(const rclcpp_lifecycle::State& state) override {
    LifecycleNode::on_activate(state);  // activates the lifecycle publisher
    timer_->reset();
    RCLCPP_INFO(get_logger(), "activated: motors enabled");
    return CallbackReturn::SUCCESS;
  }

  CallbackReturn on_deactivate(const rclcpp_lifecycle::State& state) override {
    timer_->cancel();
    LifecycleNode::on_deactivate(state);
    RCLCPP_INFO(get_logger(), "deactivated: motors disabled");
    return CallbackReturn::SUCCESS;
  }

  CallbackReturn on_cleanup(const rclcpp_lifecycle::State&) override {
    timer_.reset();
    pub_.reset();
    RCLCPP_INFO(get_logger(), "cleaned up: closed %s", port_.c_str());
    return CallbackReturn::SUCCESS;
  }

  CallbackReturn on_shutdown(const rclcpp_lifecycle::State&) override {
    timer_.reset();
    pub_.reset();
    RCLCPP_INFO(get_logger(), "shut down");
    return CallbackReturn::SUCCESS;
  }

private:
  void tick() {
    std_msgs::msg::String msg;
    msg.data = "alive " + std::to_string(++count_);
    pub_->publish(msg);
  }

  std::string port_;
  int count_ = 0;
  rclcpp_lifecycle::LifecyclePublisher<std_msgs::msg::String>::SharedPtr pub_;
  rclcpp::TimerBase::SharedPtr timer_;
};

int main(int argc, char** argv) {
  rclcpp::init(argc, argv);
  auto node = std::make_shared<FakeDriver>();
  rclcpp::spin(node->get_node_base_interface());
  rclcpp::shutdown();
  return 0;
}
