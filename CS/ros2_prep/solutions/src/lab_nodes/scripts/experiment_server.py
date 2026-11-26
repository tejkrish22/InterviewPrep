#!/usr/bin/env python3
"""Action server that "runs an experiment": streams progress and can be cancelled."""
import time

import rclpy
from rclpy.action import ActionServer, CancelResponse, GoalResponse
from rclpy.executors import MultiThreadedExecutor
from rclpy.node import Node

from lab_interfaces.action import RunExperiment
from lab_interfaces.msg import ExperimentStatus


class ExperimentServer(Node):
    def __init__(self):
        super().__init__("experiment_server")
        self.status_pub = self.create_publisher(ExperimentStatus, "experiment_status", 10)
        self.server = ActionServer(
            self,
            RunExperiment,
            "run_experiment",
            execute_callback=self.execute,
            goal_callback=self.on_goal,
            cancel_callback=self.on_cancel,
        )

    def on_goal(self, goal):
        if goal.duration_s <= 0.0:
            self.get_logger().warn("rejecting goal: duration_s must be > 0")
            return GoalResponse.REJECT
        return GoalResponse.ACCEPT

    def on_cancel(self, goal_handle):
        self.get_logger().info("cancel requested")
        return CancelResponse.ACCEPT

    def execute(self, goal_handle):
        goal = goal_handle.request
        self.get_logger().info(f"running '{goal.config_path}' for {goal.duration_s:.1f}s")
        feedback = RunExperiment.Feedback()
        result = RunExperiment.Result()
        steps = 10
        for i in range(1, steps + 1):
            if goal_handle.is_cancel_requested:
                goal_handle.canceled()
                self.publish_status(goal.config_path, ExperimentStatus.IDLE, feedback.progress)
                result.success, result.message = False, "canceled"
                return result
            time.sleep(goal.duration_s / steps)
            feedback.progress = i / steps
            goal_handle.publish_feedback(feedback)
            self.publish_status(goal.config_path, ExperimentStatus.RUNNING, feedback.progress)

        goal_handle.succeed()
        self.publish_status(goal.config_path, ExperimentStatus.DONE, 1.0)
        result.success, result.message = True, "completed"
        return result

    def publish_status(self, experiment_id, state, progress):
        self.status_pub.publish(ExperimentStatus(experiment_id=experiment_id, state=state, progress=progress))


def main():
    rclpy.init()
    # Multi-threaded so cancel requests are handled while execute() is busy.
    rclpy.spin(ExperimentServer(), executor=MultiThreadedExecutor())


if __name__ == "__main__":
    main()
