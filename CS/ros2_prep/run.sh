#!/usr/bin/env bash
# Start (or reuse) the ROS 2 prep container and open a shell in it.
# Run this again in another terminal to get a second shell in the same container.
set -euo pipefail

NAME=ros2prep
DIR="$(cd "$(dirname "$0")" && pwd)"

# Allow GUI apps (RViz, rqt) from the container to use this user's X display.
xhost +SI:localuser:"$(id -un)" >/dev/null 2>&1 || true

if ! docker ps --format '{{.Names}}' | grep -qx "$NAME"; then
  docker rm -f "$NAME" >/dev/null 2>&1 || true
  # Host networking + a private domain ID + localhost-only discovery keeps
  # this ROS graph off the shared LAN.
  docker run -d --init --name "$NAME" \
    --network host --ipc host \
    -e DISPLAY="${DISPLAY:-:0}" -e QT_X11_NO_MITSHM=1 \
    -v /tmp/.X11-unix:/tmp/.X11-unix:rw \
    --device /dev/dri --group-add "$(getent group video | cut -d: -f3)" --group-add "$(getent group render | cut -d: -f3)" \
    -e XDG_RUNTIME_DIR=/tmp/runtime-dev \
    -v "$DIR/ws":/home/dev/ws \
    -v "$DIR/solutions":/home/dev/solutions \
    -e ROS_DOMAIN_ID=42 -e ROS_AUTOMATIC_DISCOVERY_RANGE=LOCALHOST \
    -e http_proxy= -e https_proxy= -e HTTP_PROXY= -e HTTPS_PROXY= \
    --entrypoint sleep \
    ros2-prep:jazzy infinity >/dev/null
fi

exec docker exec -it -w /home/dev/ws "$NAME" bash --rcfile /home/dev/ws/.rosrc -i
