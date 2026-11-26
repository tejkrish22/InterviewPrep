# C++ Quick Revision (robotics software interview)

Format: **concept → 1-line answer → pitfall**. The code in section 10 was compiled and tested with `-fsanitize=address,undefined`.

---

## 1. RAII and smart pointers (asked almost always)

**RAII** means the constructor acquires a resource and the destructor releases it. The resource can be memory, a file, a mutex, a socket, or a CAN port, and cleanup happens **even if an exception is thrown**.
- Examples: `std::lock_guard`, `std::unique_ptr`, `std::fstream`, a driver class that closes `/dev/ttyUSB0` in its destructor.

| Pointer | Ownership | Notes |
|---|---|---|
| `std::unique_ptr<T>` | **single** owner, move-only | Zero overhead. The default choice. `std::make_unique<T>(...)` |
| `std::shared_ptr<T>` | **shared**, reference counted | The ref count is atomic, which has a cost. `std::make_shared` does one allocation. ROS 2 uses it everywhere (`Node::SharedPtr`) |
| `std::weak_ptr<T>` | non-owning observer of a shared_ptr | `lock()` gives a shared_ptr, or null if the object is gone. **Breaks cycles** |
| raw `T*` / `T&` | non-owning | Fine for "use but don't own" |

- **Pitfall: cycle leak.** A holds `shared_ptr<B>` and B holds `shared_ptr<A>`, so the ref count never reaches 0. Fix: make one of them `weak_ptr`.
- **Pitfall:** capturing `shared_from_this()` in a callback keeps the object alive forever. Capture a `weak_ptr` instead.
- **Pitfall:** never create two `shared_ptr`s from the same raw pointer, because it will be deleted twice.

---

## 2. Copy vs move, and the rule of 0/3/5

- **lvalue** has a name and an address (`x`). **rvalue** is a temporary (`x + 1`, `std::move(x)`).
- **Move** steals the guts (pointer, buffer) and leaves the source **valid but unspecified**. It's cheap, O(1).
- `std::move` **doesn't move anything**. It's just a cast to an rvalue, so that the move overload gets picked.
- **Rule of 0:** use RAII members (`vector`, `unique_ptr`) and write none of the special functions. **This is preferred.**
- **Rule of 3:** if you write a destructor, a copy constructor or copy assignment, you probably need all three.
- **Rule of 5:** 3 + the move constructor + move assignment. **Mark the moves `noexcept`**, or `std::vector` will copy instead of move when it grows.
- Perfect forwarding: `template<class T> void f(T&& x) { g(std::forward<T>(x)); }`

---

## 3. OOP and polymorphism

- **Virtual function → vtable.** Each polymorphic object has a hidden **vptr** pointing to its class's table of function pointers. A call through a base pointer looks it up at runtime (**dynamic dispatch**).
- **Virtual destructor in the base class is mandatory** if you delete through a base pointer. Otherwise the derived destructor isn't called: undefined behaviour and leaks.
- `override` makes the compiler check that you really override something. `final` forbids further overriding.
- **Pure virtual** (`= 0`) makes the class **abstract**, i.e. an interface. ros2_control's `SystemInterface` is one.
- **Object slicing:** passing a `Derived` **by value** as a `Base` cuts off the derived part. Pass by reference or pointer.
- **Don't call virtual functions in a constructor or destructor.** The derived part doesn't exist yet (or anymore).
- **Static vs dynamic polymorphism:** templates/CRTP resolve at compile time (no runtime cost); virtual functions resolve at runtime (more flexible, e.g. plugins).
- **Composition over inheritance.** SOLID in one line: small classes, depend on interfaces, open to extension (plugins) without modifying existing code.
- **Your link:** the handler registry per machine type in the scenario tool is the **strategy + factory pattern**. pluginlib in ROS 2 is the same idea.

---

## 4. `const`, references and memory

- `const T&` parameter: no copy, no modification. Use it for big objects.
- `const` member function (`int get() const`) promises not to modify the object. `mutable` members are exempt (e.g. a mutex in a const getter).
- `constexpr`: computed at compile time where possible.
- Reference vs pointer: a reference **can't be null and can't be reseated**; a pointer can be both.
- **Stack** is fast, automatic and limited in size. **Heap** is `new`/`make_unique`, slower, and size is dynamic.
- **Real-time rule (control loops):** **no heap allocation in the loop**. Pre-allocate (`reserve`), use fixed-size buffers (`std::array`, ring buffers), and don't throw.
- Undefined behaviour classics: dangling references (returning a reference to a local), use-after-free, out-of-bounds access, signed overflow, data races. Tools: ASan, UBSan, TSan, Valgrind.

---

## 5. STL containers and complexity

| Container | Access | Insert / erase | Notes |
|---|---|---|---|
| `vector` | O(1) | O(1) amortised at the end, O(n) in the middle | **Default.** Contiguous, cache-friendly. Growing it invalidates iterators |
| `deque` | O(1) | O(1) at both ends | |
| `list` | O(n) | O(1) given an iterator | `splice` is O(1). Used in an LRU cache |
| `map` / `set` | O(log n) | O(log n) | Red-black tree, **sorted** |
| `unordered_map` / `set` | O(1) average | O(1) average | Hash table. Worst case O(n). Rehashing invalidates iterators |
| `priority_queue` | top O(1) | O(log n) | Max-heap by default. Min-heap: `std::greater<>` |
| `array` | O(1) | n/a | Fixed size, on the stack, so **real-time friendly** |

- `emplace_back(args...)` constructs in place; `push_back(obj)` copies or moves.
- `reserve(n)` avoids repeated reallocation.
- **Erase while iterating:** `it = v.erase(it);`, or the erase-remove idiom `v.erase(std::remove_if(...), v.end());`

---

## 6. Concurrency (very relevant for ROS 2 executors and drivers)

- `std::thread t(f); t.join();`. A thread that is neither joined nor detached calls `std::terminate`.
- **Data race:** two threads access the same data, at least one writes, with no synchronisation. That's **UB**.
- `std::mutex` plus **`std::lock_guard`** (simple) or **`std::unique_lock`** (needed with condition variables; can unlock early).
- `std::scoped_lock(m1, m2)` locks several mutexes **without deadlock**.
- **Deadlock** has four conditions: mutual exclusion, hold-and-wait, no preemption, circular wait. Fix: always **lock in the same order**, use `scoped_lock`, keep critical sections small, and never call unknown code while holding a lock.
- **Condition variable:** wait **with a predicate** (`cv.wait(lk, [&]{ return ready; })`) to handle **spurious wake-ups**.
- `std::atomic<T>`: lock-free for simple types like flags and counters. Example: `std::atomic<bool> estop{false};`
- `std::async` / `std::future`: run a task and get its result later.
- **ROS 2 link:** callbacks on a `MultiThreadedExecutor` can run in parallel, so shared state needs a mutex or a `MutuallyExclusive` callback group. In real-time code, avoid blocking mutexes and use lock-free buffers (`realtime_tools::RealtimeBuffer`).

---

## 7. Templates and modern C++ features

- Function and class templates are generic code instantiated at compile time. Errors show up at compile time (sometimes long ones).
- `auto`, range-for, structured bindings `auto [k, v] = *it;`
- Lambdas: `[=]` captures by copy, `[&]` by reference, `[this]` captures the object. **Pitfall:** capturing `&` to a local and calling the lambda later is a dangling reference.
- `std::optional<T>` (maybe a value), `std::variant` (type-safe union), `std::string_view` (non-owning string, so watch its lifetime).
- `enum class`: scoped and type-safe.
- `std::chrono`: always use it for time, never raw doubles for durations in APIs. `using namespace std::chrono_literals; 10ms`
- C++20 features you can mention: concepts, ranges, `std::span`, coroutines, `<=>`.

---

## 8. Exceptions and error handling

- Exceptions should be for exceptional cases. Destructors are `noexcept` and must never throw.
- In **real-time loops**, avoid exceptions; return error codes or a status. ros2_control uses `return_type::OK/ERROR`.
- Exception-safety levels: no-throw, strong (commit or rollback; copy-and-swap gives you this), and basic (no leaks, valid state).

---

## 9. Build and tooling (JD: CMake, testing)

```cmake
cmake_minimum_required(VERSION 3.16)
project(lab_driver CXX)
set(CMAKE_CXX_STANDARD 17)
add_library(driver src/driver.cpp)
target_include_directories(driver PUBLIC include)
target_link_libraries(driver PUBLIC Threads::Threads)
add_executable(driver_node src/main.cpp)
target_link_libraries(driver_node PRIVATE driver)
enable_testing()
find_package(GTest REQUIRED)
add_executable(driver_test test/driver_test.cpp)
target_link_libraries(driver_test PRIVATE driver GTest::gtest_main)
add_test(NAME driver_test COMMAND driver_test)
```
- `PUBLIC` / `PRIVATE` / `INTERFACE` control whether consumers inherit the include paths and links.
- Static `.a` gets copied into the binary; shared `.so` is loaded at runtime. Your Boost.Python `.so` plus copying dependency libs is a shared-library story.
- GoogleTest: `TEST(Suite, Name) { EXPECT_EQ(a, b); ASSERT_TRUE(x); }`
- Debugging: `gdb` (`bt`, `frame`, `p var`), core dumps, ASan/TSan, `valgrind`, `perf` for profiling.

---

## 10. Likely live-coding problems (tested code)

### Ring buffer (fixed size, no allocation, so real-time friendly)
```cpp
template <typename T, std::size_t N>
class RingBuffer {
public:
  bool push(const T& v) {
    if (size_ == N) return false;          // full (or overwrite oldest, if you're asked to)
    buf_[head_] = v;
    head_ = (head_ + 1) % N;
    ++size_;
    return true;
  }
  std::optional<T> pop() {
    if (size_ == 0) return std::nullopt;
    T v = buf_[tail_];
    tail_ = (tail_ + 1) % N;
    --size_;
    return v;
  }
private:
  std::array<T, N> buf_{};
  std::size_t head_ = 0, tail_ = 0, size_ = 0;
};
```
Use case: sensor sample history, or a moving-average filter.

### Thread-safe queue (producer/consumer, e.g. driver thread → ROS publisher)
```cpp
template <typename T>
class ThreadSafeQueue {
public:
  void push(T v) {
    { std::lock_guard<std::mutex> lk(m_); q_.push(std::move(v)); }
    cv_.notify_one();                      // notify after unlocking
  }
  T wait_pop() {
    std::unique_lock<std::mutex> lk(m_);
    cv_.wait(lk, [this] { return !q_.empty(); });   // predicate handles spurious wake-ups
    T v = std::move(q_.front());
    q_.pop();
    return v;
  }
private:
  std::queue<T> q_;
  std::mutex m_;
  std::condition_variable cv_;
};
```

### LRU cache: O(1) get/put (list + hash map)
```cpp
class LRUCache {
public:
  explicit LRUCache(std::size_t cap) : cap_(cap) {}
  std::optional<int> get(int key) {
    auto it = map_.find(key);
    if (it == map_.end()) return std::nullopt;
    items_.splice(items_.begin(), items_, it->second);   // move to front, O(1)
    return it->second->second;
  }
  void put(int key, int value) {
    auto it = map_.find(key);
    if (it != map_.end()) {
      it->second->second = value;
      items_.splice(items_.begin(), items_, it->second);
      return;
    }
    if (items_.size() == cap_) {                          // evict least recently used
      map_.erase(items_.back().first);
      items_.pop_back();
    }
    items_.emplace_front(key, value);
    map_[key] = items_.begin();
  }
private:
  std::size_t cap_;
  std::list<std::pair<int, int>> items_;
  std::unordered_map<int, std::list<std::pair<int, int>>::iterator> map_;
};
```

### Rule of 5 (owning raw buffer; in real code prefer `std::vector`, i.e. the rule of 0)
```cpp
class Buffer {
public:
  explicit Buffer(std::size_t n) : n_(n), data_(new double[n]{}) {}
  ~Buffer() { delete[] data_; }
  Buffer(const Buffer& o) : n_(o.n_), data_(new double[o.n_]) { std::copy(o.data_, o.data_ + n_, data_); }
  Buffer& operator=(const Buffer& o) { if (this != &o) { Buffer tmp(o); swap(tmp); } return *this; } // copy-and-swap
  Buffer(Buffer&& o) noexcept : n_(o.n_), data_(o.data_) { o.n_ = 0; o.data_ = nullptr; }
  Buffer& operator=(Buffer&& o) noexcept {
    if (this != &o) { delete[] data_; n_ = o.n_; data_ = o.data_; o.n_ = 0; o.data_ = nullptr; }
    return *this;
  }
  void swap(Buffer& o) noexcept { std::swap(n_, o.n_); std::swap(data_, o.data_); }
private:
  std::size_t n_;
  double* data_;
};
```

### Other likely robotics-flavoured exercises (know the approach)
- **Moving average / low-pass filter:** ring buffer plus a running sum; or `y = α·x + (1−α)·y_prev`.
- **Rate limiter / watchdog:** store the last command time with `std::chrono::steady_clock`. If `now − last > timeout`, publish zero velocity.
- **Clamp joint commands:** `std::clamp(cmd, min, max)`, and scale the whole velocity vector to keep its direction.
- **Angle wrap to [−π, π]:** `std::atan2(std::sin(a), std::cos(a))`, or `std::remainder(a, 2*M_PI)`.
- **Interpolation between waypoints:** `p = p0 + (p1 − p0)·t`, with t = elapsed / duration clamped to [0, 1].
- **Parse a CAN or serial frame:** read bytes, check the header and checksum, extract fields with `memcpy` (not pointer casts), and watch the **endianness**.

---

## 11. Rapid-fire answers

- **`new`/`delete` vs smart pointers?** Smart pointers apply RAII to memory: they're exception-safe and make ownership clear. Avoid raw `new` in modern C++.
- **`unique_ptr` vs `shared_ptr`?** Single vs shared ownership. Default to unique; use shared only when ownership is genuinely shared.
- **Why a virtual destructor?** So that deleting through a base pointer calls the derived destructor.
- **What does `std::move` do?** It casts to an rvalue so the move overload is chosen. It doesn't move anything itself.
- **`vector` vs `list`?** Vector is almost always faster (contiguous, cache-friendly). Use list only for O(1) splicing with stable iterators.
- **`map` vs `unordered_map`?** Sorted O(log n) vs hashed O(1) average.
- **How do you avoid deadlock?** Consistent lock order, `scoped_lock`, small critical sections, no callbacks while holding a lock.
- **Why `noexcept` on a move?** So containers move instead of copying when they reallocate.
- **What's in a real-time loop?** Pre-allocated memory, no locks/allocation/exceptions/blocking I/O, and a bounded execution time.
- **`struct` vs `class`?** Only the default access differs: public vs private.
- **`inline`, `static`, `extern`?** `inline` allows multiple identical definitions across translation units (headers). A `static` member is per-class, not per-object; a `static` local is initialised once. `extern` declares a variable that's defined elsewhere.
