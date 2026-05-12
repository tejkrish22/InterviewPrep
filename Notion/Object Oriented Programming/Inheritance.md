---
notion-id: 33cd9a38-fc71-8042-97d1-ef06def15b5d
---
## What is Inheritance?
**Inheritance** is an OOP feature where a **new class (Derived / Child)** is created from an **existing class (Base / Parent)**.
The derived class:
- **Reuses** base class members (code reusability)
- Can **add new features** (extend)
- Can **modify behavior** (override in polymorphism)

**Syntax:**
```c++
class Derived : access-specifier Base {
    // ...
};
```

---
## Why Inheritance is used (Advantages)
- **Code reusability**: avoid rewriting common code.
- **Extensibility**: add features on top of an existing class.
- **Maintainability**: changes in base can benefit derived classes.
- Foundation for **polymorphism** (runtime overriding using `virtual`).

---
## Key terms
- **Base class / Parent class**: class being inherited from.
- **Derived class / Child class**: class that inherits.
- **"is-a" relationship**: inheritance models an *is-a* relation.
    - Example: `Car` is-a `Vehicle`.

---
## Access specifiers in inheritance (public/protected/private)
Inheritance access specifier controls how base members are treated in the derived class.
> Note: Base class `private` members are **not accessible directly** in a derived class (you cannot write `derivedObj.privateMember`).

> But they are still **part of the derived object’s memory layout** (because the base subobject is inside the derived object). You can access/update them **indirectly** using the base class’s `public`/`protected` member functions.

Example:
```c++
class Base {
private:
    int x;
public:
    Base(int v) : x(v) {}
    int getX() const { return x; }
protected:
    void setX(int v) { x = v; }
};

class Derived : public Base {
public:
    Derived(int v) : Base(v) {}
    void update(int v) {
        // x = v;      // ❌ not allowed (private)
        setX(v);       // ✅ allowed (protected function of Base)
    }
};
```

| Inheritance type | Base `public` becomes | Base `protected` becomes | Base `private` |
| --- | --- | --- | --- |
| `public` inheritance | `public` | `protected` | not accessible |
| `protected` inheritance | `protected` | `protected` | not accessible |
| `private` inheritance | `private` | `private` | not accessible |

---
## Types of inheritance (based on structure)
### 1) Single inheritance
One derived class inherits from one base class.
```c++
class Vehicle {
public:
    void start() { cout << "Vehicle started\n"; }
};

class Car : public Vehicle {
public:
    void playMusic() { cout << "Music on\n"; }
};

int main() {
    Car c;
    c.start();      // inherited
    c.playMusic();  // own
}
```

---
### 2) Multilevel inheritance
A class is derived from another derived class.
```c++
class A {
public:
    void f() { cout << "A\n"; }
};

class B : public A {
public:
    void g() { cout << "B\n"; }
};

class C : public B {
public:
    void h() { cout << "C\n"; }
};

int main() {
    C obj;
    obj.f(); // from A
    obj.g(); // from B
    obj.h(); // from C
}
```

---
### 3) Hierarchical inheritance
Multiple derived classes inherit from a single base class.
```c++
class Shape {
public:
    void info() { cout << "I am a shape\n"; }
};

class Circle : public Shape {
public:
    void draw() { cout << "Draw circle\n"; }
};

class Rectangle : public Shape {
public:
    void draw() { cout << "Draw rectangle\n"; }
};
```

---
### 4) Multiple inheritance
One derived class inherits from multiple base classes.
```c++
class Camera {
public:
    void click() { cout << "Photo\n"; }
};

class Phone {
public:
    void call() { cout << "Calling\n"; }
};

class SmartPhone : public Phone, public Camera {
public:
    void browse() { cout << "Browsing\n"; }
};

int main() {
    SmartPhone sp;
    sp.call();
    sp.click();
    sp.browse();
}
```

---
### 5) Hybrid inheritance
Combination of two or more types (e.g., multiple + multilevel). In C++ this is possible.

---
## Diamond problem (Multiple inheritance issue)
When two classes inherit from the same base, and a further class inherits from both, ambiguity can happen.
### Why it is called “diamond”
The inheritance diagram looks like a diamond:
```javascript
  A
 / \
B   C
 \ /
  D
```
`D` inherits from both `B` and `C`, and **both** `B` and `C` inherit from `A`.
### What exactly goes wrong?
Without special handling, class `D` ends up containing **two separate copies of **`**A**`:
- one `A` subobject via `B`
- another `A` subobject via `C`

That causes two main problems:
1. **Ambiguity**: which `A` member are you referring to?
2. **Duplication**: `A`’s data exists twice inside `D` (wasted memory + inconsistent state possible).

### Ambiguity example
```c++
class A {
public:
    int x = 10;
};

class B : public A {};
class C : public A {};
class D : public B, public C {};

int main() {
    D d;
    // cout << d.x; // ❌ ambiguous: comes from B::A or C::A?
    cout << d.B::x; // ✅ explicitly choose the path
    cout << d.C::x; // ✅ explicitly choose the other path
}
```
### Duplication / inconsistent state example
```c++
int main() {
    D d;
    d.B::x = 5;
    d.C::x = 99;
    // Now D has TWO different x values (two different A subobjects)
}
```
### How virtual inheritance fixes it
If `B` and `C` inherit from `A` as **virtual**, C++ ensures that `D` contains **only one shared **`**A**` subobject.
Key idea:
- `virtual` inheritance says: “If this base appears multiple times through different paths, keep only one copy.”

```c++
class A { public: int x = 10; };
class B : public A {};
class C : public A {};
class D : public B, public C {}; // D has two copies of A

// D d; d.x; // ambiguous
```
### Solution: Virtual inheritance
```c++
class A { public: int x = 10; };
class B : virtual public A {};
class C : virtual public A {};
class D : public B, public C {};

int main() {
    D d;
    cout << d.x; // only one A now
}
```

---
## Important interview points
- Inheritance models an **is-a relationship**.
- Base class constructor runs **before** derived class constructor.
- Base class destructor runs **after** derived class destructor.
- Base `private` members are **not accessible directly** in derived classes.
- Use `virtual` inheritance to solve the **diamond problem**.
- Inheritance + `virtual` functions enables **runtime polymorphism** (covered in polymorphism topic).