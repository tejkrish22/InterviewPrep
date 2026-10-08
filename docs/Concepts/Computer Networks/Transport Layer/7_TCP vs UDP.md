## Differences b/w TCP and UDP

| Feature         | TCP                           | UDP                        |
| --------------- | ----------------------------- | -------------------------- |
| Connection      | Connection-oriented           | Connectionless             |
| Handshake       | Requires handshake            | No handshake               |
| Reliability     | Reliable delivery             | Best-effort delivery       |
| Ordering        | Delivers an ordered byte stream | No ordering guarantee    |
| Acknowledgments | Uses ACKs and retransmissions | No ACKs or retransmissions |
| Header Size     | 20–60 bytes                   | 8 bytes                    |
| Performance     | Reliability adds overhead and possible retransmission delays | Lower built-in overhead; not guaranteed faster |
| Primary Goal    | Reliable, ordered byte stream | Minimal, connectionless datagram delivery |
| Usage           | HTTP/1.1, HTTP/2, FTP, Email   | DNS commonly, real-time voice/video, QUIC (HTTP/3) |


