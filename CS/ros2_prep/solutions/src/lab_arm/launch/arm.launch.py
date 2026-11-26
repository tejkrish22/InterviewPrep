"""Planar arm with ros2_control: robot_state_publisher, controller manager, controllers, RViz."""
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.conditions import IfCondition
from launch.substitutions import Command, FindExecutable, LaunchConfiguration, PathJoinSubstitution
from launch_ros.actions import Node
from launch_ros.parameter_descriptions import ParameterValue
from launch_ros.substitutions import FindPackageShare


def generate_launch_description():
    pkg = FindPackageShare("lab_arm")
    use_mock = LaunchConfiguration("use_mock")
    gui = LaunchConfiguration("gui")

    robot_description = ParameterValue(
        Command(
            [
                FindExecutable(name="xacro"), " ",
                PathJoinSubstitution([pkg, "urdf", "arm.urdf.xacro"]),
                " use_mock:=", use_mock,
            ]
        ),
        value_type=str,
    )
    controllers = PathJoinSubstitution([pkg, "config", "controllers.yaml"])

    return LaunchDescription(
        [
            DeclareLaunchArgument("use_mock", default_value="true", description="mock hardware (true) or lab_hardware plugin (false)"),
            DeclareLaunchArgument("gui", default_value="true", description="start RViz"),
            # Publishes /robot_description and does FK: /joint_states -> /tf
            Node(
                package="robot_state_publisher",
                executable="robot_state_publisher",
                parameters=[{"robot_description": robot_description}],
            ),
            # Controller manager: loads the hardware plugin from the URDF and runs the control loop.
            Node(
                package="controller_manager",
                executable="ros2_control_node",
                parameters=[controllers],
                remappings=[("~/robot_description", "/robot_description")],
                output="screen",
            ),
            Node(package="controller_manager", executable="spawner", arguments=["joint_state_broadcaster"]),
            Node(package="controller_manager", executable="spawner", arguments=["arm_controller"]),
            Node(
                package="rviz2",
                executable="rviz2",
                arguments=["-d", PathJoinSubstitution([pkg, "rviz", "arm.rviz"])],
                condition=IfCondition(gui),
            ),
        ]
    )
