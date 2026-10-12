## HTTP Methods

1. HTTP methods describe the action that the client wants to perform on a resource.
2. Every HTTP request contains a method that tells the server what operation should be performed on the requested URL.

| Method  | Means                          | Example                                            | Safe / Idempotent   |
| ------- | ------------------------------ | -------------------------------------------------- | ------------------- |
| GET     | Read Data                      | GET /users/10<br>- Fetch user 10                   | Safe, Idempotent    |
| POST    | Create or Submit Data          | POST /users<br>- Create a  new user                | Not Safe, Not Idempotent |
| PUT     | Replace or Update a data       | PUT /users/10<br>- Replace user 10                 | Not Safe, Idempotent |
| PATCH   | Update Partially               | PATCH /users/10<br>- Update some fields of user 10 | Not Safe, Not Idempotent |
| DELETE  | Delete a resource              | DELETE /users/10<br>- Delete user 10               | Not Safe, Idempotent |
| HEAD    | Fetch Headers only, not body   | HEAD /users/10<br>- Fetch headers only, not body   | Safe, Idempotent    |
| OPTIONS | Ask what methods are supported | OPTIONS /users<br>- Ask supported methods          | Safe, Idempotent    |

3. GET vs POST
	1. GET and POST are often misunderstood as secure versus insecure methods. This is incorrect.
	2. Both GET and POST can be secure when used over HTTPS.
	3. The actual difference lies in their purpose.
	4. GET is used to fetch or read data.
	5. POST is used to create or submit new data.

## Safety and Idempotency

1. **Safe** - the method only reads data and does not change server state.
2. **Idempotent** - sending the same request once or many times leaves the server in the same final state.
3. Idempotency is about the final server state, not about identical responses.
4. Examples
	1. `DELETE /users/10` - idempotent. Repeating it keeps user 10 deleted, even if the status code changes (200 then 404).
	2. `PUT /users/10` - idempotent. It replaces the resource with the same body every time.
	3. `POST /users` - not idempotent. Each call creates a new user.
	4. `PATCH /users/10` - usually not idempotent, e.g. "increase balance by 100".
5. Every safe method is idempotent, but not every idempotent method is safe (PUT, DELETE).
6. Idempotent requests can be safely retried after a timeout without duplicate side effects.

## HTTP Status Codes

1. Every HTTP response contains a status code that tells what happened to the request.
2. Status codes are grouped into 5 categories
	1. 1xx –> Informational responses.
	2. 2xx –> Successful responses.
	3. 3xx –> Redirection responses.
	4. 4xx –> Client-side errors.
	5. 5xx –> Server-side errors.
3. 1xx Information Responses
	1. 100 Continue – The server has received the initial request and the client may continue sending the remaining data.
	2. 101 Switching Protocols – The communication protocol is being switched.
	3. 103 Early Hints – The server sends hints about resources the client can start loading before the final response arrives.
4. 2xx Success Responses
	1. These indicate that the request was successfully processed.
	2. 200 OK - The request was successful
	3. 201 Created - A new resource was created
	4. 202 Accepted - The request was accepted for processing, but is not complete yet
	5. 204 No Content - The request succeeded and there is no body to return
5. 3xx Redirection Responses
	1. These status codes indicate that the requested resource has moved or some further action is needed.
	2. 301 Moved Permanently - Resource has permanently moved to another location
	3. 302 Found - Resource is temporarily at a different location
	4. 304 Not Modified - The cached copy is still valid, so no body is sent
	5. 307 Temporary Redirect - Same as 302, but the method and body must not be changed
	6. 308 Permanent Redirect - Same as 301, but the method and body must not be changed
6. 4xx Client Side Errors
	1. These errors occur because something is wrong with the request sent by the client.
	2. 400 Bad Request - Invalid request
	3. 401 Unauthorized - User is not authenticated
	4. 403 Forbidden  - User is authenticated but does not have permission
	5. 404 Not found - Requested resource does not exist
	6. 405 Method Not Allowed - The method is not supported for this resource
	7. 409 Conflict - The request conflicts with the current state of the resource
	8. 429 Too Many Requests - The client has sent too many requests and is being rate limited
7. 5xx Server errors
	1. These errors indicate that the request sent by the client is valid, but the server failed while processing it.
	2. 500 Internal Server Error - The server encountered an unexpected error.
	3. 501 Not Implemented - The server does not support the requested functionality
	4. 502 Bad Gateway - A server acting as a gateway received an invalid response from the upstream server
	5. 503 Service Unavailable - The server is temporarily overloaded or down for maintenance
	6. 504 Gateway Timeout - A gateway did not receive a response from the upstream server in time
