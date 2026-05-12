---
notion-id: 33cd9a38-fc71-8077-9d6e-fdd19347e19d
---
## What is a constructor?
A **constructor** is a special member function of a class that is **automatically called when an object is created**. Its main job is to **initialize** the object’s data members and/or acquire resources (memory, file handles, locks, etc.).
Key points:
- Name is **exactly the same as the class name**.
- Has **no return type** (not even `void`).
- Can be **overloaded** (multiple constructors with different parameter lists).
- If you don’t define any constructor, the compiler may generate a **default constructor** (depending on member types).

---
## Why constructors matter in OOP
Constructors support OOP principles by:
- **Encapsulation**: ensure the object starts in a valid state.
- **Abstraction**: hide initialization details behind the class interface.
- **Resource management (RAII)**: acquire resources in constructor and release them in destructor.

---
## Types of constructors in C++
### 1) Default constructor
A constructor that can be called with **no arguments**.
```c++
class A {
public:
    A() { /* initialize */ }
};

A obj; // calls A()
```
Notes:
- If you define **any** constructor, the compiler **may not** automatically generate a default one.
- You can force it with `A() = default;`.

---
### 2) Parameterized constructor
Takes parameters to initialize the object.
```c++
class Point {
    int x, y;
public:
    Point(int xVal, int yVal) : x(xVal), y(yVal) {}
};

Point p(10, 20);
```

---
### 3) Copy constructor
Creates a new object as a copy of an existing object.
Signature:
```c++
ClassName(const ClassName& other);
```
Example:
```c++
class Box {
    int w;
public:
    Box(int w) : w(w) {}
    Box(const Box& b) : w(b.w) {}
};

Box b1(5);
Box b2 = b1; // copy constructor
```
When it is called:
- When an object is initialized from another object: `T b = a;`
- When passing object **by value** to a function
- When returning an object **by value** (copy elision may apply)

---
### 4) Move constructor (C++11+)
Transfers resources from a temporary (rvalue) object to a new object.
Signature:
```c++
ClassName(ClassName&& other);
```
Used for performance when dealing with dynamic memory/resources.

---
### 5) Constructor overloading
Multiple constructors in the same class with different parameters.
```c++
class Student {
    int id;
public:
    Student() : id(0) {}
    Student(int i) : id(i) {}
};
```

---
### 6) Delegating constructors (C++11+)
One constructor calls another constructor of the same class.
```c++
class Demo {
    int x, y;
public:
    Demo() : Demo(0, 0) {}
    Demo(int a, int b) : x(a), y(b) {}
};
```

---
## Constructor initialization list
Preferred way to initialize members.
```c++
class A {
    int x;
    const int c;
    int& ref;
public:
    A(int v, int& r) : x(v), c(10), ref(r) {}
};
```
Why it matters:
- Needed for **const members** and **reference members**.
- More efficient than assigning inside the constructor body.
- Required to call a **base class constructor** or initialize members that are objects.

---
## Order of initialization (important!)
Members are initialized **in the order they are declared in the class**, not the order in the initialization list.
```c++
class T {
    int a;
    int b;
public:
    T() : b(2), a(b) {} // a is initialized first, using uninitialized b
};
```
Fix by declaring in the correct order or initializing consistently.

---
## Constructors in inheritance
### Base class constructor call
Base class constructor runs **before** derived class constructor.
```c++
class Base {
public:
    Base(int x) {}
};

class Derived : public Base {
public:
    Derived(int y) : Base(y) {}
};
```
If the base has no default constructor, the derived constructor **must** explicitly call one of the base constructors.

---
## Access specifiers and constructors
- Constructors can be `public`, `protected`, or `private`.
- `private` constructors are used in patterns like **Singleton** or **Factory**.

---
## `explicit` constructors
Prevents unwanted implicit conversions.
```c++
class Num {
    int x;
public:
    explicit Num(int v) : x(v) {}
};

// Num n = 5; // error (good)
Num n(5);     // ok
```

---
## Defaulted and deleted constructors
### Defaulted
Ask compiler to generate it.
```c++
class A {
public:
    A() = default;
};
```
### Deleted
Prevent usage.
```c++
class B {
public:
    B() = delete;
};
```

---
## Common interview / exam points
- Constructor has **same name as class** and **no return type**.
- Constructors can be **overloaded**.
- A constructor is called **automatically** on object creation.
- Use **initialization lists** for const/reference members and base class initialization.
- Copy constructor parameter should be a **const reference**.
- In inheritance, **base constructor executes first**.

---
## Mini example (default + parameterized + copy)
```c++
#include <iostream>
using namespace std;

class Time {
    int h, m;
public:
    Time() : h(0), m(0) {}                  // default
    Time(int hh, int mm) : h(hh), m(mm) {}  // parameterized
    Time(const Time& t) : h(t.h), m(t.m) {} // copy

    void show() const { cout << h << ":" << m << "\n"; }
};

int main() {
    Time t1;
    Time t2(10, 30);
    Time t3 = t2;

    t1.show();
    t2.show();
    t3.show();
}
```