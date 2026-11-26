cmake_minimum_required(VERSION 3.8)
project(lab_hardware)

if(CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

find_package(ament_cmake REQUIRED)
find_package(hardware_interface REQUIRED)
find_package(pluginlib REQUIRED)
find_package(rclcpp REQUIRED)
find_package(rclcpp_lifecycle REQUIRED)

add_library(lab_hardware SHARED src/simple_arm_hardware.cpp)
target_compile_features(lab_hardware PUBLIC cxx_std_17)
target_include_directories(lab_hardware PUBLIC
  $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
  $<INSTALL_INTERFACE:include/${PROJECT_NAME}>)
ament_target_dependencies(lab_hardware hardware_interface pluginlib rclcpp rclcpp_lifecycle)

# Register the plugin so the controller manager can find it by name.
pluginlib_export_plugin_description_file(hardware_interface lab_hardware.xml)

install(TARGETS lab_hardware
  LIBRARY DESTINATION lib
  ARCHIVE DESTINATION lib
  RUNTIME DESTINATION bin)
install(DIRECTORY include/ DESTINATION include/${PROJECT_NAME})

ament_package()
