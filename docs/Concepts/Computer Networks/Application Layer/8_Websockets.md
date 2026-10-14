## Problem with HTTP

1. Traditional HTTP follows a request-response model. The client (browser) sends a request and the server sends back a response.
2. Communication is always initiated by the client.
3. This works very well for loading webpages, submitting forms, or calling APIs occasionally.
4. However, it becomes inefficient when applications require real-time updates like chatting, stock price update etc.

## Websocket Communication

1. WebSocket introduces a persistent full-duplex communication channel between the client and server.
2. Once the connection is established, both sides can send messages independently at any time.
3. Unlike HTTP, where the server waits for requests, WebSocket allows the server to actively push information whenever updates are available.

## Websocket Characteristics

1. Persistent Connection
2. Full-Duplex Communication
3. Low Latency
4. Server Push
5. Reduced Overhead

## Websocket Connection Establishment

1. Browser-based WebSockets start as a normal HTTP connection and then upgrade to the WebSocket protocol. This allows WebSockets to work smoothly with existing web infrastructure.
2. The client first sends a normal HTTP request containing special headers such as:
	1. `Upgrade: websocket`
	2. `Connection: Upgrade`
3. These headers tell the server that the client wants to switch from HTTP to the WebSocket protocol.
4. If the server supports WebSockets, it replies with :`HTTP/1.1 101 Switching Protocols`
5. The status code 101 literally means that the server agrees to switch protocols. After this handshake completes, the communication protocol changes from HTTP to WebSocket and a persistent bidirectional channel is established.
6. From this point onward, both client and server can communicate freely without repeatedly creating new HTTP requests.

## HTTP vs WebSocket

| **Feature**                      | **HTTP**                                                                  | **WebSocket**                                                    |
| -------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Communication Model**          | Request-response communication.                                           | Bidirectional communication.                                     |
| **Who Initiates Communication?** | Only the client initiates requests.                                       | Both client and server can send messages anytime.                |
| **Connection Type**              | Uses request-response interactions over persistent transport connections. | Maintains a long-lived connection.                               |
| **Real-Time Updates**            | Requires polling or repeated requests.                                    | Server can push updates immediately.                             |
| **Protocol Setup**               | Uses HTTP directly.                                                       | Starts with HTTP and upgrades to WebSocket.                      |
| **Latency**                      | Higher because updates often require repeated requests.                   | Lower because communication happens over an existing connection. |
| **Typical Use Cases**            | Webpages, REST APIs, form submissions.                                    | Chat applications, games, notifications, live dashboards.        |
