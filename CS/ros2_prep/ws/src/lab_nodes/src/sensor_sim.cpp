// Simulated sensor: publishes a sine wave on "reading" and offers a "set_mode"
// service. In "fault" mode it stops publishing, as a dead sensor would.
#include <chrono>
#include <cmath>
#include <memory>
#include <string>

#include "lab_interfaces/srv/set_mode.hpp"
#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/float64.hpp"

using SetMode = lab_interfaces::srv::SetMode;

class SensorSim : public rclcpp::Node {
public:
  SensorSim() : Node("sensor_sim") {
    const double rate_hz = declare_parameter("rate_hz", 20.0);
    declare_parameter("amplitude", 1.0);

    // High-rate sensor data: best effort, small queue.
    pub_ = create_publisher<std_msgs::msg::Float64>("reading", rclcpp::SensorDataQoS());

    timer_ = create_wall_timer(std::chrono::duration<double>(1.0 / rate_hz), [this] { publish(); });

    srv_ = create_service<SetMode>(
        "set_mode", [this](const std::shared_ptr<SetMode::Request> req, std::shared_ptr<SetMode::Response> res) {
          if (req->mode != "nominal" && req->mode != "fault") {
            res->success = false;
            res->message = "unknown mode '" + req->mode + "' (use nominal or fault)";
            return;
          }
          mode_ = req->mode;
          res->success = true;
          res->message = "mode set to " + mode_;
          RCLCPP_INFO(get_logger(), "%s", res->message.c_str());
        });

    RCLCPP_INFO(get_logger(), "publishing at %.1f Hz", rate_hz);
  }

private:
  void publish() {
    if (mode_ == "fault") {
      return;
    }
    // Read the parameter every tick so `ros2 param set` takes effect live.
    const double amplitude = get_parameter("amplitude").as_double();
    std_msgs::msg::Float64 msg;
    msg.data = amplitude * std::sin(t_);
    t_ += 0.1;
    pub_->publish(msg);
  }

  double t_ = 0.0;
  std::string mode_ = "nominal";
  rclcpp::Publisher<std_msgs::msg::Float64>::SharedPtr pub_;
  rclcpp::TimerBase::SharedPtr timer_;
  rclcpp::Service<SetMode>::SharedPtr srv_;
};

int main(int argc, char** argv) {
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<SensorSim>());
  rclcpp::shutdown();
  return 0;
}
