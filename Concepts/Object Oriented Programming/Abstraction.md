---
notion-id: 33cd9a38-fc71-80c6-ac4e-ec9effc0b96c
---
## Abstraction (in C++ OOP)
**Abstraction** means showing only the **essential features** of something and hiding the **implementation details**.
In C++, abstraction is commonly achieved using:
- **Abstract classes**
- **Interfaces (interface-like classes)**
- **Virtual functions** and **pure virtual functions**

---
## 1) Virtual methods (Virtual functions)
A **virtual function** is a member function in the base class that you expect derived classes to **override**, enabling **runtime polymorphism**.
### Key points
- Declared using the keyword `virtual` in the base class.
- When you call a virtual function through a **base class pointer/reference**, the **derived version** runs (late binding).
- A base class that will be used polymorphically should have a **virtual destructor**.

### Example (virtual method)
```c++
#include <bits/stdc++.h>
using namespace std;

class Animal {
public:
    virtual void speak() { // virtual
        cout << "Animal sound\n";
    }

    virtual ~Animal() = default; // important
};

class Dog : public Animal {
public:
    void speak() override {
        cout << "Bark\n";
    }
};

int main() {
    Animal* a = new Dog();
    a->speak(); // Bark (runtime polymorphism)
    delete a;
}
```

---
## 2) Pure virtual methods
A **pure virtual function** is a virtual function with **no base implementation requirement**, written as:
```c++
virtual void func() = 0;
```
### Key points
- Makes the class **abstract** (cannot create objects of that class).
- Forces derived classes to implement/override it (otherwise derived class also becomes abstract).
- Used to define a **contract**: “every derived class must provide this behavior.”

> Note: A pure virtual function *can still* have a definition in the base class, but it’s still pure (`= 0`). This is used sometimes for shared helper behavior.

---
## 3) Abstract class
An **abstract class** is a class that contains **at least one pure virtual function**.
### Key points
- You **cannot instantiate** an abstract class.
    - `Shape s;` ❌ not allowed
- You *can* create **pointers/references** to an abstract class:
    - `Shape* s = new Circle();` ✅
- Used when you want a common base type + shared code, but still want to enforce that derived classes implement some operations.

### Example (abstract class)
```c++
#include <bits/stdc++.h>
using namespace std;

class Shape {
public:
    virtual double area() const = 0;  // pure virtual
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() const override {
        return 3.14159 * r * r;
    }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double w, double h) : w(w), h(h) {}
    double area() const override {
        return w * h;
    }
};

int main() {
    Shape* s1 = new Circle(2);
    Shape* s2 = new Rectangle(3, 4);

    cout << s1->area() << "\n";
    cout << s2->area() << "\n";

    delete s1;
    delete s2;
}
```

---
## 4) Interface class (C++ style)
C++ does not have a separate `interface` keyword like Java. Instead, we create an **interface-like class**:
### Interface-like class rules (common convention)
- Contains **only pure virtual functions**
- Has a **virtual destructor**
- Has **no data members** (or at least no state)

### Example (interface-like class)
```c++
#include <bits/stdc++.h>
using namespace std;

class Printable {
public:
    virtual void print() const = 0; // pure virtual
    virtual ~Printable() = default;
};

class Report : public Printable {
public:
    void print() const override {
        cout << "Printing report\n";
    }
};

int main() {
    Printable* p = new Report();
    p->print();
    delete p;
}
```

---
## Abstract class vs Interface class (quick comparison)

| Feature | Abstract class | Interface-like class |
| --- | --- | --- |
| Can have non-pure (implemented) functions | ✅ Yes | Usually ❌ No |
| Can have data members/state | ✅ Yes | Usually ❌ No |
| Purpose | Share code + enforce some functions | Define a strict contract |
| How it’s made in C++ | At least one `= 0` function | Mostly all functions are `= 0` |

---
## Interview points (must remember)
- `virtual` enables **runtime polymorphism**.
- `= 0` makes a function **pure virtual**.
- A class with at least one pure virtual function is an **abstract class**.
- Abstract classes cannot be instantiated, but pointers/references to them are allowed.
- Always use a **virtual destructor** for base classes used polymorphically.
- `override` helps catch signature mistakes at compile time.