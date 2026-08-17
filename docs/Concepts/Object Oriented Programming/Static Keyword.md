---
notion-id: 33cd9a38-fc71-807c-ae4c-d0feb402659b
---
## `static` keyword in C++ (OOP)
In a class, `static` members belong to the **class itself**, not to individual objects.
So:
- **Static data member** → shared by all objects
- **Static member function** → can be called without creating an object

---
## 1) Static data members (static variables in a class)
A **static data member** is a variable that is **common for all objects** of the class.
### Key points
- Only **one copy** exists for the whole class.
- Memory is allocated **once** (not per object).
- It is created/initialized **independent of objects**.
- Accessed using:
    - `ClassName::member` (preferred)
    - `object.member` (allowed, but not recommended)

### Example: counting objects
```c++
#include <bits/stdc++.h>
using namespace std;

class Counter {
public:
    static int cnt; // declaration

    Counter() {
        cnt++;
    }
};

int Counter::cnt = 0; // definition (outside class)

int main() {
    Counter a, b, c;
    cout << Counter::cnt; // 3
}
```
> Note: In classic C++, static data members must be **defined outside** the class (as shown). (In C++17, `inline static` can avoid the out-of-class definition.)

---
## 2) Static member functions (static methods)
A **static member function** belongs to the class and does **not** need an object to be called.
### Key points
- Called using `ClassName::functionName()`.
- **No `this` pointer** (because it's not tied to any object).
- Can access:
    - ✅ static data members
    - ✅ other static member functions
    - ❌ non-static data members directly
    - ❌ non-static member functions directly

### Example: static getter
```c++
#include <bits/stdc++.h>
using namespace std;

class Counter {
    static int cnt;

public:
    Counter() { cnt++; }

    static int getCount() {
        return cnt; // ok (static -> static)
    }
};

int Counter::cnt = 0;

int main() {
    Counter a, b;
    cout << Counter::getCount(); // 2
}
```

---
## 3) Interaction: static vs non-static members
### A) Can a non-static function access static members?
✅ Yes. A non-static member function can access both static and non-static members.
```c++
class A {
    static int s;
    int x;
public:
    void f() {
        s++; // ok
        x++; // ok
    }
};
```
### B) Can a static function access non-static members?
❌ Not directly.
Reason: non-static members need a specific object, but static functions have **no `this`**.
✅ Solution: pass an object (or pointer/reference to object) into the static function.
```c++
class A {
    int x;
public:
    A(int x) : x(x) {}

    static void printX(const A& obj) {
        cout << obj.x; // ok (access via object)
    }
};
```

---
## 4) When to use static members (common use-cases)
- **Counting objects** created (`cnt` example).
- **Shared constants/config** across all objects.
- **Utility/helper functions** that logically belong to the class.
- **Singleton / Factory patterns** (often uses static functions/variables).

---
## 5) Important interview points
- Static data members are **shared** across all objects.
- Static member functions have **no `this` pointer**.
- Static functions can access **only static members directly**.
- Prefer accessing static members using `ClassName::member`.
- Static members have **class lifetime** (exist as long as the program runs).

---
## Mini summary
- **Non-static members** → belong to each object (separate copy per object).
- **Static members** → belong to the class (single shared copy).