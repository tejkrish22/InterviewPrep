cmake_minimum_required(VERSION 3.8)
project(lab_nodes)

if(CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)
find_package(rclcpp_lifecycle REQUIRED)
find_package(std_msgs REQUIRED)
find_package(lab_interfaces REQUIRED)

add_executable(sensor_sim src/sensor_sim.cpp)
ament_target_dependencies(sensor_sim rclcpp std_msgs lab_interfaces)

add_executable(fake_driver src/fake_driver.cpp)
ament_target_dependencies(fake_driver rclcpp rclcpp_lifecycle std_msgs)

install(TARGETS sensor_sim fake_driver DESTINATION lib/${PROJECT_NAME})
install(PROGRAMS scripts/monitor.py scripts/experiment_server.py DESTINATION lib/${PROJECT_NAME})
install(DIRECTORY launch config DESTINATION share/${PROJECT_NAME})

ament_package()
