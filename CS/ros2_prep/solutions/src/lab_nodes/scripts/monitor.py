#!/usr/bin/env python3
"""Safety watchdog: raises an e-stop if the sensor goes silent."""
import rclpy
from rclpy.node import Node
from rclpy.qos import HistoryPolicy, QoSProfile, ReliabilityPolicy
from std_msgs.msg import Bool, Float64


class Monitor(Node):
    def __init__(self):
        super().__init__("monitor")
        reliable = self.declare_parameter("reliable", False).value
        self.timeout_s = self.declare_parameter("timeout_s", 0.5).value

        qos = QoSProfile(
            history=HistoryPolicy.KEEP_LAST,
            depth=5,
            reliability=ReliabilityPolicy.RELIABLE if reliable else ReliabilityPolicy.BEST_EFFORT,
        )
        self.create_subscription(Float64, "reading", self.on_reading, qos)
        self.estop_pub = self.create_publisher(Bool, "estop", 10)

        # Fail-safe: start in e-stop and only clear once data has actually arrived.
        self.last_rx = None
        self.estop = True
        self.create_timer(0.1, self.check)
        self.get_logger().info(f"watching 'reading' ({'RELIABLE' if reliable else 'BEST_EFFORT'}), e-stop until data")

    def on_reading(self, msg):
        self.last_rx = self.get_clock().now()

    def check(self):
        if self.last_rx is None:
            silent = True
            silent_s = float("inf")
        else:
            silent_s = (self.get_clock().now() - self.last_rx).nanoseconds * 1e-9
            silent = silent_s > self.timeout_s
        if silent != self.estop:
            self.estop = silent
            if silent:
                self.get_logger().error(f"sensor silent for {silent_s:.2f}s -> E-STOP")
            else:
                self.get_logger().info("sensor back -> e-stop cleared")
        self.estop_pub.publish(Bool(data=self.estop))


def main():
    rclpy.init()
    rclpy.spin(Monitor())


if __name__ == "__main__":
    main()
