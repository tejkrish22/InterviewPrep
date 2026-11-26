"""Bring up two namespaced robots (sensor + watchdog each) and the experiment server."""
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration, PathJoinSubstitution
from launch_ros.actions import Node
from launch_ros.substitutions import FindPackageShare


def robot(ns, params, reliable):
    return [
        Node(package="lab_nodes", executable="sensor_sim", namespace=ns, parameters=[params]),
        Node(
            package="lab_nodes",
            executable="monitor.py",
            namespace=ns,
            parameters=[params, {"reliable": reliable}],
            output="screen",
        ),
    ]


def generate_launch_description():
    params = PathJoinSubstitution([FindPackageShare("lab_nodes"), "config", "params.yaml"])
    reliable = LaunchConfiguration("reliable")
    return LaunchDescription(
        [
            DeclareLaunchArgument("reliable", default_value="false", description="Monitor QoS reliability"),
            *robot("robot1", params, reliable),
            *robot("robot2", params, reliable),
            Node(package="lab_nodes", executable="experiment_server.py", output="screen"),
        ]
    )
