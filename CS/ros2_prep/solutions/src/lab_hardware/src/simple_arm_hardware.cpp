#include "lab_hardware/simple_arm_hardware.hpp"

#include <algorithm>
#include <cmath>
#include <string>

#include "hardware_interface/types/hardware_interface_type_values.hpp"
#include "pluginlib/class_list_macros.hpp"

namespace lab_hardware {

using hardware_interface::CallbackReturn;
using hardware_interface::HW_IF_POSITION;
using hardware_interface::HW_IF_VELOCITY;
using hardware_interface::return_type;

CallbackReturn SimpleArmHardware::on_init(const hardware_interface::HardwareComponentInterfaceParams& params) {
  if (SystemInterface::on_init(params) != CallbackReturn::SUCCESS) {
    return CallbackReturn::ERROR;
  }
  const auto& hw_params = get_hardware_info().hardware_parameters;
  if (const auto it = hw_params.find("tau"); it != hw_params.end()) {
    tau_ = std::stod(it->second);
  }
  if (tau_ <= 0.0) {
    RCLCPP_ERROR(get_logger(), "tau must be > 0, got %.3f", tau_);
    return CallbackReturn::ERROR;
  }
  RCLCPP_INFO(get_logger(), "init: %zu joints, tau = %.2f s", get_hardware_info().joints.size(), tau_);
  return CallbackReturn::SUCCESS;
}

CallbackReturn SimpleArmHardware::on_activate(const rclcpp_lifecycle::State&) {
  // Hold the current position so enabling the drives never causes a jump.
  for (const auto& joint : get_hardware_info().joints) {
    set_command(joint.name + "/" + HW_IF_POSITION, get_state<double>(joint.name + "/" + HW_IF_POSITION));
  }
  RCLCPP_INFO(get_logger(), "activated: drives enabled");
  return CallbackReturn::SUCCESS;
}

CallbackReturn SimpleArmHardware::on_deactivate(const rclcpp_lifecycle::State&) {
  RCLCPP_INFO(get_logger(), "deactivated: drives disabled");
  return CallbackReturn::SUCCESS;
}

return_type SimpleArmHardware::read(const rclcpp::Time&, const rclcpp::Duration& period) {
  const double dt = period.seconds();
  const double alpha = std::clamp(dt / tau_, 0.0, 1.0);
  for (const auto& joint : get_hardware_info().joints) {
    const std::string pos_if = joint.name + "/" + HW_IF_POSITION;
    const double pos = get_state<double>(pos_if);
    const double cmd = get_command<double>(joint.name + "/" + HW_IF_POSITION);
    const double target = std::isfinite(cmd) ? cmd : pos;
    const double new_pos = pos + alpha * (target - pos);
    set_state(pos_if, new_pos);
    set_state(joint.name + "/" + HW_IF_VELOCITY, dt > 0.0 ? (new_pos - pos) / dt : 0.0);
  }
  return return_type::OK;
}

return_type SimpleArmHardware::write(const rclcpp::Time&, const rclcpp::Duration&) {
  // Real hardware: send the position commands to the drives here.
  return return_type::OK;
}

}  // namespace lab_hardware

PLUGINLIB_EXPORT_CLASS(lab_hardware::SimpleArmHardware, hardware_interface::SystemInterface)
