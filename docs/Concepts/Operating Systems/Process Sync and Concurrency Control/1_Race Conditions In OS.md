## What is Race Condition ?

1. A race condition is a timing-dependent correctness failure.
2. The result becomes unsafe when concurrent executions access shared state and the access order is not controlled.
3. Concurrent executions may be different kinds of execution units.
	1. Threads
	2. Processes
	3. Requests
	4. Workers

## 3 Ingredients of a Race

1. Shared State: Two executions can access the same data or resource.
2. Mutation: At least one execution writes or changes the state.
3. Uncontrolled Interleaving: Steps from different executions mix in different orders.

## Identifying Race

1. Find the shared state
2. Ask who reads and writes
3. Check overlap and multi-step correctness

## Handling Race

1. Synchronisation: Use synchronisation mechanisms when access order matters.
2. Immutable Data: Make data mutable as and when necessary only
3. Ownership transfer: Moving ownership can avoid shared mutation.
