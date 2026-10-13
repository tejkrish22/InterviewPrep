## HTTP/0.9

1. HTTP/0.9 was the earliest and simplest version of HTTP. At that time, the web mainly consisted of simple HTML pages and the requirements were very limited.
2. Communication was essentially: **Request → HTML Page**
	1. No headers
	2. No status codes
	3. No metadata
3. As websites became larger and more complex, this simplistic approach was no longer sufficient, leading to HTTP/1.0.

## HTTP/1.0 - One Request per Connection

1. HTTP/1.0 introduced a proper request-response structure.
2. Since HTTP runs over TCP, and TCP is a connection-oriented and reliable protocol, communication begins only after a TCP connection has been established.
3. Typical flow
	1. TCP connection is established
	2. Client sends an HTTP request
	3. Server sends the HTTP response
	4. The connection is closed
4. Problems with HTTP/1.0
	1. Handshake cost : Every request requires a fresh TCP handshake before data transfer can begin. Repeated handshakes introduce overhead.
	2. Increased Latency : Repeated connection establishment and teardown increase the overall page loading time.
	3. Higher Server Load : The server has to manage many short-lived connections, consuming more CPU and memory.

## HTTP/1.1 - Persistent Connections

1. HTTP/1.1 introduced one of its biggest improvements: persistent connections, also known as keep-alive connections. One TCP connection → Multiple HTTP requests and responses. This avoids repeated TCP handshakes and significantly improves performance.
2. HTTP/1.1 also made the Host header mandatory. This allows multiple websites to share the same IP address. The server can identify which website the client actually wants. This concept is called virtual hosting.
3. Persistent connections do not remain alive forever. Servers usually define an idle timeout. If no new request arrives during that period, the connection is automatically closed.
4. HTTP/1.1 Pipelining
	1. Normally, the client sends one request and waits for its response before sending another request.
	2. With pipelining, the client can send multiple requests continuously without waiting.
	3. However, responses must be delivered in the same order as requests.
5. Head-of-line blocking
	1. If response 1 is very slow and response 2 and 3 are ready, they cannot be delivered before response 1.
	2. Every queued response must wait for the slow one, even if it is already complete.

## HTTP/2

1. HTTP/2 does not change **what HTTP means**; it changes **how HTTP data is transmitted**.

|**Feature**|**Purpose**|
|---|---|
|**Multiplexing**|Allows multiple requests and responses simultaneously.|
|**Binary Framing**|Converts communication into efficient binary frames.|
|**HPACK Compression**|Reduces repeated header overhead.|
|**Stream Prioritization**|Allows important resources to be delivered first.|
|**Server Push**|Proactively sends resources before they are requested.|

2. Limitations
	1. HTTP/2 solves head-of-line blocking at HTTP level problem through multiplexing.
	2. However, all these streams still share a single TCP connection.
	3. Therefore, if a packet is lost at the TCP layer, every stream using that connection is affected.
	4. Thus, head-of-line blocking at TCP level still exists.

## HTTP/3

1. HTTP/3 replaces TCP with QUIC, a transport protocol built on top of UDP.
2. QUIC provides
	1. Reliable data transfer
	2. Ack and re-transmissions
	3. Congestion control
	4. Flow control
	5. Multiplexed streams
	6. Connection migration
	7. Fast connection establishment
3. UDP remains exactly the same simple transport protocol. QUIC simply uses UDP as a foundation and implements reliability and advanced functionality above it.
4. QUIC gives each stream its own independent delivery. If a packet is lost, only the affected stream waits, while the other streams continue. This removes TCP-level head-of-line blocking.
5. TLS is built into QUIC, so the transport and encryption handshakes happen together. This reduces connection setup to fewer round trips.
6. QUIC connections are identified by a connection ID rather than the IP and port pair. A client can switch networks, such as Wi-Fi to mobile data, without rebuilding the connection.

## Summary

|**Version**|**Main Idea**|**Limitation**|
|---|---|---|
|**HTTP/0.9**|Very simple request → HTML response|No headers, no status codes, no structure|
|**HTTP/1.0**|One TCP connection per request|Connection setup overhead|
|**HTTP/1.1**|Persistent connections and pipelining|HTTP-level Head-of-Line blocking|
|**HTTP/2**|Multiplexing, binary framing, HPACK|TCP-level Head-of-Line blocking|
|**HTTP/3**|QUIC over UDP with independent streams|Designed to overcome TCP limitations|
