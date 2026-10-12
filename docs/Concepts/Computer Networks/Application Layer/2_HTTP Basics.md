## Intro

1. HTTP (HyperText Transfer Protocol) is the main application layer protocol used on the web.
2. A simple way to understand HTTP is to think of it as a protocol that allows a client and a server to communicate over the network.
3. At its core, HTTP follows a simple request-response model : Client sends a request → Server sends a response.
4. HTTP does not define what the data means internally. Its job is to define how web messages are structured and exchanged so that both sides can understand each other.

## HTTP Request Structure

1. An HTTP request sent by a client consists of three main parts
	1. Request Line
	2. Headers
	3. Optional Body
2. Request Line contains three things
	1. Method
	2. Path
	3. HTTP Version
	- Example: `GET /products/123 HTTP/1.1`
3. Headers contain extra info about the request
	1. Host: api.example.com
	2. User-Agent: Chrome
	3. Accept: application/json
4. Optional Body
	1. The body is optional and is used only when data needs to be sent along with the request.
	2. The body may contain information such as email, contact number, etc.

## HTTP Response Structure

1. Upon receiving a request, the server responds back with a response and it also has three parts
	1. Status Line
	2. Headers
	3. Optional Body
2. The Status Line tells the result of the request. It contains
	1. HTTP version
	2. Status Code
	3. Status Message
	- Example: `HTTP/1.1 200 OK`
3. Headers contain extra details about the response
4. The Optional Body contains the actual data returned by the server.
	1. In general, the response body may contain webpages, images, JSON data, files, or any other application-specific content.
