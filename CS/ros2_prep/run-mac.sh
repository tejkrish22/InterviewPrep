#!/usr/bin/env bash
# macOS: start (or reuse) the ROS 2 prep container and open a shell in it.
# Run again in another terminal for more shells in the same container.
# GUI apps (RViz, rqt, turtlesim) show up in the browser at http://localhost:6080/vnc.html
set -euo pipefail

NAME=ros2prep
IMAGE=ros2-prep:jazzy-mac
VNC_PASSWORD="${VNC_PASSWORD:-ros2prep}"
DIR="$(cd "$(dirname "$0")" && pwd)"

if ! docker image inspect "$IMAGE" >/dev/null 2>&1; then
  docker build -f "$DIR/Dockerfile.mac" -t "$IMAGE" "$DIR"
fi

if ! docker ps --format '{{.Names}}' | grep -qx "$NAME"; then
  docker rm -f "$NAME" >/dev/null 2>&1 || true
  # No host networking on macOS; all shells share this one container, so DDS works.
  # The desktop port is published on 127.0.0.1 only.
  docker run -d --init --name "$NAME" \
    -p 127.0.0.1:6080:6080 --shm-size=512m \
    -e VNC_PASSWORD="$VNC_PASSWORD" \
    -e XDG_RUNTIME_DIR=/tmp/runtime-dev \
    -v "$DIR/ws":/home/dev/ws \
    -v "$DIR/solutions":/home/dev/solutions \
    -e ROS_DOMAIN_ID=42 -e ROS_AUTOMATIC_DISCOVERY_RANGE=LOCALHOST \
    --entrypoint /usr/local/bin/start-desktop.sh \
    "$IMAGE" >/dev/null
  echo "Desktop: http://localhost:6080/vnc.html  (password: $VNC_PASSWORD)"
fi

exec docker exec -it -w /home/dev/ws "$NAME" bash --rcfile /home/dev/ws/.rosrc -i
