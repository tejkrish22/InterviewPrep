## Thread Safety

1. Code is **thread-safe** if it behaves correctly when called by multiple threads at the same time.
2. When multiple threads share same data chunk, and try to modify then unexpected results could occur.
3. The result depends on timing leading to Race condition.
4. Thread Safety Guarantees
	1. Consistent State across threads
	2. Controlled Mutation by threads

## Reentrancy

1. A function is **reentrant** if it can be safely entered again before an earlier execution of the same function has finished.
2. Re-entry can happen by
	1. Another thread
	2. Recursion
	3. Signal or Interrupt-Like flow
3. Good Signs of Reentrant Code
	1. Local Variables
	2. Caller-Provided data
	3. Current-call state
4. Bad Signs of Reentrant Code
	1. Shared static buffers
	2. Global mutable buffers
	3. Reused internal storage

## Thread Safe vs Reentrant

| Dimension       | Thread-Safe                                                | Reentrant                                                                                              |
| --------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Main condition  | Safe when multiple threads call the code at the same time. | Safe when the same function is entered again before an earlier call finishes.                          |
| Typical overlap | Different threads may call the function concurrently.      | The same function may be re-entered through another thread, recursion, signal, or interrupt-like flow. |
| State strategy  | Shared mutable state must be avoided or controlled.        | Hidden shared mutable state is usually avoided.                                                        |
| Synchronization | May use internal synchronization to protect shared state.  | Cannot blindly rely on internal synchronization if re-entry itself can become unsafe.                  |
| Main goal       | Prevent corruption when multiple threads run the code.     | Survive overlapping entry in the same function or call chain.                                          |
| Common trap     | Assuming thread-safe means fast or internally threaded.    | Assuming a function is reentrant just because it is safe for normal threaded calls.                    |

> *A function can be thread-safe but not reentrant*

## Race Condition

1. Classic increment counter example.
2. Good Interleaving vs Bad Interleaving decides the state of the shared data.
3. Interleaving means the order in which steps from different threads mix.
4. The same code can produce different results depending on where the scheduler pauses one thread and runs another.
