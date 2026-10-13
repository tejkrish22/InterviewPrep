## What is HTTPS ?

1. HTTPS (HyperText Transfer Protocol Secure) is the secure version of HTTP. It is simply HTTP running over TLS (Transport Layer Security)
2. While HTTP defines how requests and responses are structured and exchanged, TLS ensures that this communication happens securely.

## Why HTTPS is needed ?

1. All the communication in HTTP is done via plain text.
2. So, Man-in-the-Middle attacks can occur.
3. That's why HTTPS is used; to have secure communication.

## HTTP vs HTTPS

| **HTTP** | **HTTPS** |
| --- | --- |
| Data is sent in plaintext. | Data is encrypted. |
| Identity is not verified. | Server identity is verified. |
| Communication can be intercepted. | Communication is protected. |
| Data may be modified. | Integrity is ensured. |

## How HTTPS works?

When you enter `takeuforward.org`:

1. Connection is established via TCP or QUIC.
2. TLS handshake begins
3. The browser and server exchange information.
4. The server proves its identity using certificates.
5. Encryption keys are established.
6. A secure channel is created.
7. HTTP requests and responses are exchanged securely.

## TLS Handshake

1. TLS handshake is used to establish a secure channel before any communication is done.
2. Modern systems use TLS 1.3
3. HTTP/1.1 and HTTP/2
	1. TCP Handshake -> TLS Handshake -> HTTP Comms
4. HTTP/3
	1. QUIC integrates TLS into the connection establishment process itself, making setup even faster.
5. TLS steps
	1. Client Hello
	2. Server Hello
	3. Certificate exchange
	4. Key Generation
	5. Finished messages
	6. Secure channel is set

## Certificates : Proving server identity

1. A certificate is a digital document that proves the identity of a server.
2. It is issued and signed by a trusted organisation known as a **Certificate Authority (CA)**.
3. A certificate generally contains
	1. Domain name
	2. Public key
	3. Issuer info
	4. Validity period
	5. Digital signature of the certificate authority
4. During the TLS handshake the server sends its certificate to the browser, thus server identity is authorised by the browser.
