## API

1. API stands for Application Programming Interface. An API acts as a contract between two systems.
2. In modern applications, the frontend (client) and backend (server) are usually separate systems that need to communicate with each other.
3. The frontend may need information such as user details, progress, submissions, analytics, or product information, but it should never directly access the database. Instead, all communication happens through APIs.

## REST

1. REST stands for Representational State Transfer.
2. It is an architectural style used for designing APIs over HTTP.
3. REST is not a protocol. Rather, it is a collection of design principles that help create scalable, maintainable, and predictable APIs.
4. The central idea behind REST is very simple:
	1. The URL identifies **what resource** we are talking about.
	2. The HTTP method specifies **what action** should be performed.

## Important REST Principles

1. **Resource-Oriented Design**: Everything is treated as a resource and identified using URLs.
2. **Stateless Communication**: Each request should contain all information required to process it. The server should not depend on previous requests to understand the current request.
3. **Uniform Interface**: Standard HTTP methods such as GET, POST, PUT, PATCH, and DELETE should be used consistently.
4. **Meaningful Status Codes**: Servers should communicate the outcome of requests using standard HTTP status codes.
5. **Predictable Structure**: APIs should follow a consistent pattern so that they are easy to understand and maintain.

## Structure of a REST Request

1. A REST request consists of several important components:
	1. Method: Specifies the operation to perform.
	2. URL: Identifies the resource.
	3. Headers: Provide additional information about the request.
	4. Path Parameters: Identify specific resources.
	5. Query Parameters: Modify or filter the response.
	6. Body: Carries data being sent to the server.
2. Some examples
	1. `GET /users/10`
	2. `GET /api/problems?difficuly=easy&topic=arrays`
	3. `POST /api/users`
