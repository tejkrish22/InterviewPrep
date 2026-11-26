#!/usr/bin/env bash
# Container entrypoint: virtual desktop on :1, exposed to the browser through noVNC on port 6080.
set -euo pipefail

mkdir -p ~/.vnc
printf '%s\n' "${VNC_PASSWORD:?VNC_PASSWORD must be set}" | vncpasswd -f > ~/.vnc/passwd
chmod 600 ~/.vnc/passwd

# -localhost: only websockify (same container) can reach the VNC port.
Xtigervnc :1 -geometry "${VNC_GEOMETRY:-1600x900}" -depth 24 \
  -rfbport 5901 -rfbauth ~/.vnc/passwd -SecurityTypes VncAuth -localhost yes &

until [ -S /tmp/.X11-unix/X1 ]; do sleep 0.2; done
openbox &
websockify --web /usr/share/novnc 6080 localhost:5901 &

exec sleep infinity
