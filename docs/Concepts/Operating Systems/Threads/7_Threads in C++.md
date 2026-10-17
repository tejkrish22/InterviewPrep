## Introduction to Threads in C++

1. Starting from C++11, C++ provides native, cross-platform multithreading support in the standard library via `<thread>`.
2. Under the hood, `std::thread` maps directly to OS-level kernel threads:
	- **POSIX threads (`pthreads`)** on Linux and macOS.
	- **Win32 Threads** on Windows.
3. Threads in the same C++ process share the same heap, global memory, and address space, but each thread has its own **call stack**, **registers**, and **Program Counter**.

---

## 1. Thread Lifecycle: Joinable vs. Detached

Every `std::thread` instance begins in a **joinable** state. Before the `std::thread` object goes out of scope and is destroyed, you must explicitly decide its completion model: either **`join()`** or **`detach()`**.

> **Crucial Rule:** If a `std::thread` is destroyed while still joinable (neither `join()` nor `detach()` was called), the runtime immediately calls `std::terminate()`, crashing the entire program!

### Joinable Thread (`t.join()`)

- **Behavior:** The calling thread (e.g., `main`) pauses execution and waits until the target thread finishes its task.
- **Ownership:** Caller takes ownership of completion.
- **Resource Cleanup:** All OS and thread resources are cleanly released once `join()` returns.
- **After calling `join()`:** `t.joinable()` becomes `false`.

### Detached Thread (`t.detach()`)

- **Behavior:** The target thread is separated from the `std::thread` object and continues running independently in the background (daemon-like).
- **Ownership:** Ownership is handed over to the C++ runtime and OS. Resources are automatically reclaimed when the thread exits.
- **After calling `detach()`:** `t.joinable()` becomes `false`.
- **Key Pitfall:** If `main()` finishes and the process exits, all detached background threads are abruptly terminated, regardless of whether they completed their work.

### Code Example: Joinable vs. Detached

```cpp
#include <iostream>
#include <thread>
#include <chrono>

void worker_joinable(int id) {
    std::cout << "[Worker " << id << "] Started working...\n";
    std::this_thread::sleep_for(std::chrono::milliseconds(400));
    std::cout << "[Worker " << id << "] Finished work.\n";
}

void worker_detached(int id) {
    std::cout << "[Daemon " << id << "] Running background task...\n";
    std::this_thread::sleep_for(std::chrono::milliseconds(300));
    std::cout << "[Daemon " << id << "] Background task completed.\n";
}

int main() {
    // ==========================================
    // 1. Joinable Thread Demo
    // ==========================================
    std::cout << "=== 1. Joinable Thread Demo ===\n";
    std::thread t1(worker_joinable, 1);

    std::cout << "t1.joinable() before join: " << std::boolalpha << t1.joinable() << "\n";

    // main thread blocks here until t1 completes
    t1.join();

    std::cout << "t1.joinable() after join:  " << t1.joinable() << "\n\n";

    // ==========================================
    // 2. Detached Thread Demo
    // ==========================================
    std::cout << "=== 2. Detached Thread Demo ===\n";
    std::thread t2(worker_detached, 2);

    std::cout << "t2.joinable() before detach: " << t2.joinable() << "\n";

    // Detach: thread runs independently in background
    t2.detach();

    std::cout << "t2.joinable() after detach:  " << t2.joinable() << "\n";

    // main thread continues its own work
    std::cout << "[Main] Doing other work while daemon runs...\n";
    std::this_thread::sleep_for(std::chrono::milliseconds(500));
    std::cout << "[Main] Exiting main function.\n";

    return 0;
}
```

### Joinable vs. Detached Comparison

| Feature | Joinable Thread (`join()`) | Detached Thread (`detach()`) |
| --- | --- | --- |
| **Caller Blocking** | Yes (caller waits until worker finishes) | No (caller continues immediately) |
| **Result Collection** | Easy (results collected after join) | Harder (requires shared state / channels) |
| **Resource Cleanup** | Reclaimed immediately after `join()` | Reclaimed by OS when thread exits |
| **Process Exit** | Caller ensures thread finishes first | Dies abruptly if `main()` exits |
| **Use Case** | Parallel compute, divide-and-conquer | Background logging, heartbeats, GC |

---

## 2. Capturing the Return

A common question in C++ multithreading is whether `t.join()` returns the computed result of the thread function.

> **Key Rule:** `t.join()` **returns `void`**. It does not return data; it is strictly an execution barrier that pauses the caller until the worker thread has completely finished.

To capture return values from worker threads back into the caller, there are **3 standard approaches**:

### Method 1: Pass by Reference with `std::ref()`

The caller allocates a variable on its stack and passes it by reference to the worker. By default, `std::thread` constructors decay and copy all arguments by value, so you must wrap the output variable in **`std::ref()`**.

```cpp
#include <iostream>
#include <thread>

void add_worker(int a, int b, int& result) {
    result = a + b; // Writes directly to caller's stack variable
}

int main() {
    int sum = 0;

    // std::ref() ensures 'sum' is passed by reference, not by value
    std::thread t(add_worker, 10, 20, std::ref(sum));

    // Wait for worker thread to finish
    t.join();

    // Safe to read 'sum' ONLY AFTER t.join() returns
    std::cout << "Result: " << sum << "\n"; // Output: 30
    return 0;
}
```

- **Pros:** Zero heap allocation overhead; maximum performance for divide-and-conquer loops.
- **Cons:** If the worker throws an exception, it cannot cross the thread boundary and immediately aborts via `std::terminate()`.

### Method 2: `std::promise` and `std::future`

The idiomatic C++ producer-consumer mechanism for communicating results or exceptions between threads.

```cpp
#include <iostream>
#include <thread>
#include <future>

void add_worker(int a, int b, std::promise<int> prom) {
    prom.set_value(a + b); // Fulfills the promise
}

int main() {
    std::promise<int> prom;
    std::future<int> fut = prom.get_future();

    std::thread t(add_worker, 10, 20, std::move(prom));

    // fut.get() blocks until the promise is set and retrieves the value
    int sum = fut.get();
    t.join();

    std::cout << "Result: " << sum << "\n"; // Output: 30
    return 0;
}
```

- **Pros:** Clean decoupling; full support for propagating C++ exceptions (`prom.set_exception(...)` is rethrown when calling `fut.get()`).
- **Cons:** Involves small shared-state allocation overhead.

### Method 3: `std::async` (High-Level Task Abstraction)

If you just want to run a background computation and collect its normal `return` value without manually creating or joining `std::thread`:

```cpp
#include <iostream>
#include <future>

int add_worker(int a, int b) {
    return a + b; // Normal return statement
}

int main() {
    // std::async runs worker on a background thread and returns a future
    std::future<int> fut = std::async(std::launch::async, add_worker, 10, 20);

    // fut.get() waits for thread completion and returns the result
    int sum = fut.get();
    std::cout << "Result: " << sum << "\n"; // Output: 30
    return 0;
}
```

- **Pros:** Cleanest syntax; no manual thread handles or explicit `.join()` calls required.
- **Cons:** Less granular control over OS thread attributes or CPU affinity.

### Summary: Choosing the Right Return Strategy

| Strategy | Return Mechanism | Exception Safe? | Best Used For |
| --- | --- | --- | --- |
| **`std::ref()`** | Output reference parameter | No (`std::terminate`) | High-performance loops, low latency |
| **`std::promise` / `std::future`** | Channel (`prom.set_value`) | Yes (rethrown on `get`) | Explicit threads needing return / error propagation |
| **`std::async`** | Normal function `return` | Yes (rethrown on `get`) | One-off background tasks, task parallelism |

---

## 3. Hands-on Benchmark: 1 Thread vs. 3 Threads

To understand concurrency in practice, consider a CPU-bound task: performing calculations over a large range $[0, N)$.

- **Single Thread:** 1 thread computes the entire range sequentially on a single CPU core.
- **3 Threads:** The range is divided into 3 equal sub-ranges and executed concurrently on separate CPU cores using `std::ref()` for each thread's partial sum.

### Complete C++ Program

```cpp
#include <iostream>
#include <thread>
#include <vector>
#include <chrono>

// CPU-intensive workload (bit-mixing loop that cannot be optimized away to O(1))
void compute_work(unsigned long long start, unsigned long long end, unsigned long long& result) {
    unsigned long long acc = 0;
    for (unsigned long long i = start; i < end; ++i) {
        acc += (i ^ (i >> 3)) + 1;
    }
    result = acc;
}

int main() {
    const unsigned long long N = 900'000'000ULL; // 900 million iterations

    std::cout << "Available CPU Cores: " 
              << std::thread::hardware_concurrency() << "\n\n";

    // ==========================================
    // 1. Single-Threaded Execution
    // ==========================================
    std::cout << "--- [1] Single-Threaded Execution ---" << std::endl;
    unsigned long long single_res = 0;

    auto t1 = std::chrono::high_resolution_clock::now();
    compute_work(0, N, single_res);
    auto t2 = std::chrono::high_resolution_clock::now();

    auto single_ms = std::chrono::duration_cast<std::chrono::milliseconds>(t2 - t1).count();
    std::cout << "Result: " << single_res << "\n";
    std::cout << "Time:   " << single_ms << " ms\n\n";

    // ==========================================
    // 2. Multi-Threaded Execution (3 Threads)
    // ==========================================
    std::cout << "--- [2] Split Across 3 Threads ---" << std::endl;
    unsigned long long res1 = 0, res2 = 0, res3 = 0;
    unsigned long long step = N / 3;

    auto t3 = std::chrono::high_resolution_clock::now();

    // Launch 3 worker threads with equal chunks
    // Note: Use std::ref() to pass output variables by reference
    std::thread th1(compute_work, 0, step, std::ref(res1));
    std::thread th2(compute_work, step, 2 * step, std::ref(res2));
    std::thread th3(compute_work, 2 * step, N, std::ref(res3));

    // Wait for all 3 worker threads to complete
    th1.join();
    th2.join();
    th3.join();

    unsigned long long multi_res = res1 + res2 + res3;
    auto t4 = std::chrono::high_resolution_clock::now();

    auto multi_ms = std::chrono::duration_cast<std::chrono::milliseconds>(t4 - t3).count();
    std::cout << "Result: " << multi_res << "\n";
    std::cout << "Time:   " << multi_ms << " ms\n";
    std::cout << "Speedup: ~" << (double)single_ms / multi_ms << "x\n";

    return 0;
}
```

### Benchmark Results & Observations

```text
Available CPU Cores: 10

--- [1] Single-Threaded Execution ---
Result: 408632199939093632
Time:   165 ms

--- [2] Split Across 3 Threads ---
Result: 408632199939093632
Time:   48 ms
Speedup: ~3.4x
```

### Why Does the 3-Thread Version Run Faster?

1. **Parallel Execution on Multi-Core Hardware:** Modern CPUs have multiple physical cores. When 3 threads run simultaneously, the OS scheduler assigns each thread to a distinct CPU core, doing 3 times the work in parallel.
2. **Independent Memory & No Locks:** Each thread writes to its own local reference (`res1`, `res2`, `res3`). Because threads do not share an accumulator or fight over a `std::mutex`, there is zero lock contention.
3. **No False Sharing:** Separate stack variables ensure threads do not invalidate each other's CPU cache lines.

---

## 4. Critical Thread Safety & Interview Gotchas

### 1. Data Races and Mutex Contention

- **What is a Data Race?** When two or more threads concurrently access the same memory location, at least one access is a write, and there is no synchronization (e.g. mutex or atomic). In C++, data races result in **Undefined Behavior (UB)**.
- **Why Didn't We Use a Mutex in the Loop?**
  If all 3 threads locked a `std::mutex` to update a single shared `sum` variable inside the loop:

  ```cpp
  // ANTI-PATTERN: Lock contention destroys multithreading performance
  std::lock_guard<std::mutex> lock(mtx);
  shared_sum += val;
  ```

  The program would run **much slower than single-threaded code** because threads spend most of their time waiting for the lock and incurring context-switch overhead.
- **Rule of Thumb:** Keep heavy loops thread-local (accumulate locally), and only synchronize once at the end.

### 2. Dangling References with Detached Threads

- When passing pointers or references to a detached thread, make sure the referenced object outlives the thread:

  ```cpp
  void dangerous() {
      int local_var = 42;
      std::thread t([&]() {
          std::this_thread::sleep_for(std::chrono::milliseconds(100));
          std::cout << local_var << "\n"; // UNDEFINED BEHAVIOR: local_var already destroyed!
      });
      t.detach();
  } // local_var destroyed here while thread is still sleeping!
  ```

### 3. Argument Passing by Value vs. Reference

- The `std::thread` constructor always decays and copies arguments into thread-local storage.
- If a function expects a reference (`void foo(int& x)`), passing `x` directly will fail to compile. You must explicitly pass `std::ref(x)` to pass the actual reference.

---

## 5. Important C++ Thread APIs

### `std::thread` Member Functions

| API | Category | Description |
| --- | --- | --- |
| `std::thread(fn, args...)` | Lifecycle | Constructs thread and immediately begins execution of `fn` |
| `t.join()` | Synchronization | Blocks calling thread until `t` completes execution |
| `t.detach()` | Lifecycle | Detaches thread execution from object to run in background |
| `t.joinable()` | Status | Returns `true` if thread object holds an active joinable thread |
| `t.get_id()` | Inspection | Returns unique `std::thread::id` for the thread |
| `t.native_handle()` | OS Interop | Accesses underlying OS thread handle (e.g., `pthread_t` on POSIX) |
| `t.swap(other)` | Utility | Swaps underlying thread handles between two `std::thread` objects |
| `std::thread::hardware_concurrency()` | System | Static method returning number of hardware CPU cores / threads |

### `std::this_thread` Operations (Current Thread)

| API | Purpose | Description |
| --- | --- | --- |
| `std::this_thread::get_id()` | Identification | Returns thread ID of the currently executing thread |
| `std::this_thread::sleep_for(dur)` | Timing | Suspends current thread for a relative duration (e.g. `100ms`) |
| `std::this_thread::sleep_until(tp)` | Timing | Suspends current thread until an absolute time point |
| `std::this_thread::yield()` | Scheduling | Relinquishes current CPU time slice to reschedule other ready threads |

### C++20 Enhancement: `std::jthread`

| Feature | Description |
| --- | --- |
| **Auto-Join RAII** | Automatically calls `join()` upon destruction if joinable, eliminating accidental `std::terminate()` crashes. |
| **Cooperative Cancellation** | Integrates with `std::stop_token` and `request_stop()` for safe, non-abrupt thread termination. |
