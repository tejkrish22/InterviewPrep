## The State problem

1. HTTP is a **stateless protocol** by design.
2. This means every request is treated independently, and the server does not automatically remember anything about previous requests.
3. Suppose a user sends a request to `/login` and successfully authenticates. A little later, the same user sends another request to `/dashboard`.
4. From HTTP's perspective, these are just two completely separate requests.
5. So, HTTP cannot support to let server know that both the requests have come from the same user.

## Sessions : Server-Side State

1. A session is a mechanism that allows the server to maintain user-specific state.
2. Unlike cookies or tokens, the actual session data stays on the server - in a DB.
3. Only a small identifier called the `session_id` is shared with the client.
4. How `session-id` works ?
	1. As the user logins with credentials, the server creates `session_id` for that user and stores in DB.
	2. This `session_id` is sent back to browser as response.
	3. In future requests the browser sends this `session_id` to the server.
	4. As the browser receives the session id, it can be stored in
		1. Cookies
		2. localStorage
		3. sessionStorage
		4. Application memory
	5. And server validates the user with stored `session_id`.

## Cookies : Small Browser Storage

1. Cookies are small pieces of information stored by the browser for a particular website.
2. Their purpose is to preserve information across multiple requests.
3. The server can send the response header with `Set-Cookie`, the browser stores this cookie automatically.
4. Generally, sensitive information should not be directly stored inside cookies.

## Other Browser Storage Mechanisms

1. localStorage
	1. localStorage allows applications to store data inside the browser.
	2. Data remains available even after the browser tab is closed and reopened.
	3. It is commonly used by frontend applications to store tokens and preferences.
2. sessionStorage
	1. sessionStorage behaves similarly to localStorage, but the data exists only while the current browser tab remains open.
	2. Closing the tab removes the stored information.
3. Memory Storage
	1. Applications can also store information in memory.
	2. For example, React applications often keep tokens inside state variables.
	3. Refreshing the page or restarting the application removes the data.

## Tokens : Client-Side Auth Proof

1. Sessions keep state on the server, Tokens take a different approach.
2. Instead of storing user information on the server, the server creates a token and gives it to the client.
3. The client stores the token and sends it along with future requests.
4. One common example is JWT (JSON Web Token).
5. Token can also be stored similar to session id.

## Session vs Token

| Sessions | Tokens |
| --- | --- |
| State lives on server | State lives mostly on client |
| Client stores session ID | Client stores token |
| Server performs lookup | Server verifies token |
| Easy to invalidate | Revocation is harder |
| Centralized state | Stateless architecture |

1. Sessions require centralised storage because every request may need access to session information.
2. In large systems, this storage is often maintained using databases or Redis.
3. Tokens are naturally easier to scale because the server does not necessarily need to maintain user state separately.
4. This makes tokens popular in distributed systems and micro-service architectures.

## Storage Comparison

| Feature | Cookie | localStorage | sessionStorage | Memory |
| --- | --- | --- | --- | --- |
| **Capacity** | ~4 KB | ~5–10 MB | ~5 MB | Available RAM |
| **Persistence** | Expiry / Session | Persistent | Tab close | Page refresh |
| **Auto-Sent in HTTP** | Yes | No | No | No |
| **Scope** | Domain & path | Origin (all tabs) | Tab only | Page only |
| **JS Accessible** | No if `HttpOnly` | Yes | Yes | Yes |
| **Vulnerable to** | CSRF | XSS | XSS | None (transient) |
| **Primary Usage** | Session ID / auth | UI preferences | Form drafts | Short-lived tokens |
