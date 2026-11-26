#pragma once

#include "hardware_interface/system_interface.hpp"
#include "hardware_interface/types/hardware_component_interface_params.hpp"
#include "rclcpp/rclcpp.hpp"
#include "rclcpp_lifecycle/state.hpp"

namespace lab_hardware {

// Simulated arm: each joint follows its position command with a first-order lag
// (time constant `tau` from the URDF). On real hardware, read()/write() would talk
// to the drives over EtherCAT/CAN/serial instead.
class SimpleArmHardware : public hardware_interface::SystemInterface {
public:
  hardware_interface::CallbackReturn on_init(
      const hardware_interface::HardwareComponentInterfaceParams& params) override;
  hardware_interface::CallbackReturn on_activate(const rclcpp_lifecycle::State& previous_state) override;
  hardware_interface::CallbackReturn on_deactivate(const rclcpp_lifecycle::State& previous_state) override;
  hardware_interface::return_type read(const rclcpp::Time& time, const rclcpp::Duration& period) override;
  hardware_interface::return_type write(const rclcpp::Time& time, const rclcpp::Duration& period) override;

private:
  double tau_ = 0.3;
};

}  // namespace lab_hardware
