## Port

1. A port is a logical number used by the operating system to identify which application or process should receive incoming data.
2. A port is simply a software-level identifier used for process-to-process communication.

## How ports work?

1. When a packet reaches a destination machine, it contains more than just the destination IP address, The packet also contains a destination port number.
2. The overall process works as follows:
	1. The packet arrives at the destination machine.
	2. The operating system examines the destination port number.
	3. The operating system looks up the port table for that port number.
	4. Internally, the operating system maintains information that maps port numbers to applications and processes.
	5. It determines which application is associated with the port.
	6. The data is delivered to the correct application process.
## Port Number Range

1. Port numbers range from **0 to 65535** - 2^16

| Range       | Category                | Purpose                             |
| ----------- | ----------------------- | ----------------------------------- |
| 0-1023      | Well Known              | Standardised services and Protocols |
| 1024-49151  | Registered Ports        | User apps and registered services   |
| 49152-65535 | Dynamic/ephemeral ports | Temporary Client-Side connections   |
## Well Known Ports

| **Port(s)** | **Protocol / Service** | **Description**                                  | **Transport Protocol** |
| ----------- | ---------------------- | ------------------------------------------------ | ---------------------- |
| **20, 21**  | FTP                    | Used for file transfer between client and server | TCP                    |
| **22**      | SSH                    | Secure remote login and command execution        | TCP                    |
| **23**      | Telnet                 | Unsecured remote login (deprecated)              | TCP                    |
| **25**      | SMTP                   | Used for sending emails between servers          | TCP                    |
| **53**      | DNS                    | Domain name to IP address resolution             | UDP / TCP              |
| **67, 68**  | DHCP                   | Automatic IP address assignment to devices       | UDP                    |
| **80**      | HTTP                   | Transfer of web pages (unencrypted)              | TCP                    |
| **110**     | POP3                   | Email retrieval (downloads emails locally)       | TCP                    |
| **143**     | IMAP                   | Email access while keeping mail on server        | TCP                    |
| **443**     | HTTPS                  | Secure web communication using TLS               | TCP                    |
| **3306**    | MySQL                  | Database service for MySQL                       | TCP                    |
| **5432**    | PostgreSQL             | Database service for PostgreSQL                  | TCP                    |
| **6379**    | Redis                  | In-memory key-value data store                   | TCP                    |
| **27017**   | MongoDB                | NoSQL database service                           | TCP                    |
## Are these port numbers mandatory ?

1. A common misconception is that a service can only run on its default port, that is not true.
2. These port assignments are conventions rather than strict protocol requirements.
3. For example, HTTP commonly uses port 80 and HTTPS commonly uses port 443, but a web server can be configured to run on a different port such as 8080
4. The actual port used depends on system configuration and deployment requirements.
5. This flexibility allows multiple services to run on the same machine without conflict.

## Usage of Nginx / Load Balancer

> **Core Rule:** **IP address** brings the packet to the machine; **Port number** brings it to the specific process listening on that port.

### 1. How a Packet Reaches the Right Process
```
Client Browser ──> Server IP:443 ──> Server OS checks Dest Port (443) ──> Listening Process (Nginx / Load Balancer)
```

### 2. Why Internal App Ports Are Hidden Behind Nginx / Reverse Proxy
Instead of exposing application ports directly (`8080`, `3000`, `9000`), public traffic hits a single entry point (port `443`).

```
                     ┌──> App A: 8080 (Internal API)
example.com:443 ──> Nginx / Load Balancer ┼──> App B: 3000 (Internal Web)
                     └──> App C: 9000 (Internal Admin)
```

* **Security:** Backend app ports remain hidden behind firewall/VPC.
* **TLS Termination:** Centralized SSL/TLS certificate handling.
* **Simplified URLs:** Users connect over clean standard ports (`80`/`443`) without specifying custom port numbers.
* **Load Balancing & Routing:** Smooth distribution of traffic across internal instances.

---

### 3. Handling Multiple Apps Wanting Port 443 (Port Collisions)
* **Constraint:** A single IP + Port + Protocol combination can only be bound by **one listening socket** at a time. Binding a second process yields: `Error: Address already in use`.
* **Solution:** Single front process (Nginx/HAProxy/Reverse Proxy) owns port `443` and routes incoming requests dynamically:
  * **Routing by Hostname (SNI/Host Header):**
    * `api.example.com` ──> App A (`8080`)
    * `admin.example.com` ──> App B (`9000`)
  * **Routing by Path:**
    * `example.com/dashboard` ──> App C (`3000`)
