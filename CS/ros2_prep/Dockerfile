# Interview-prep layer on top of the existing Jazzy image.
# Adds a C++ compiler, colcon and ros2_control so packages can be built and run.
FROM atlas/dev-ros2-jazzy-isaac-6.1:local

USER root
ARG PROXY_URL

# The base image's proxy (proxy.cat.com) is unreachable off-VPN, and the host proxy
# resets plain HTTP, so switch apt to HTTPS sources and an HTTPS ROS mirror.
RUN sed -i "s|http://archive.ubuntu.com|https://archive.ubuntu.com|; s|http://security.ubuntu.com|https://security.ubuntu.com|" \
        /etc/apt/sources.list.d/ubuntu.sources \
 && sed -i "s|http://packages.ros.org/ros2/ubuntu|https://repo.ros2.org/ubuntu/main|" /etc/apt/sources.list.d/ros2.list \
 && rm -f /etc/apt/sources.list.d/docker.list \
 && export http_proxy="$PROXY_URL" https_proxy="$PROXY_URL" HTTP_PROXY="$PROXY_URL" HTTPS_PROXY="$PROXY_URL" \
 && apt-get update \
 && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        g++ gdb python3-colcon-common-extensions \
        ros-jazzy-ros2-control ros-jazzy-ros2-controllers ros-jazzy-ros2controlcli \
        ros-jazzy-xacro ros-jazzy-joint-state-publisher-gui \
        ros-jazzy-rqt-joint-trajectory-controller ros-jazzy-plotjuggler-ros \
        ros-jazzy-rmw-cyclonedds-cpp ros-jazzy-tf2-tools \
 && rm -rf /var/lib/apt/lists/*

USER dev
