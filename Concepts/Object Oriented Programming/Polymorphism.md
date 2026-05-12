---
notion-id: 33cd9a38-fc71-8036-8a55-ec31ea677746
---
## What is Polymorphism?
**Polymorphism** means **“many forms”**. In OOP, it allows the **same interface (function name / call)** to behave **differently** depending on the object.
In C++, polymorphism is mainly of two types:
1. **Compile-time (Static) polymorphism** → decided at compile time
    - **Function (method) overloading**
    - **Operator overloading**
2. **Run-time (Dynamic) polymorphism** → decided at run time
    - **Method overriding** using `virtual` functions

---
## 1) Compile-time Polymorphism (Static)
### A) Method / Function Overloading
**Overloading** means defining **multiple functions with the same name** but **different parameter lists** (different number/type/order of parameters).
✅ Resolved at **compile time**.
Rules / Notes:
- Return type alone **cannot** differentiate overloads.
- Overloading can happen in the same class (common).

```c++
#include <bits/stdc++.h>
using namespace std;

class Math {
public:
    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }

    double add(double a, double b) {
        return a + b;
    }
};

int main() {
    Math m;
    cout << m.add(2, 3) << "\n";       // calls add(int,int)
    cout << m.add(2, 3, 4) << "\n";    // calls add(int,int,int)
    cout << m.add(2.5, 3.5) << "\n";  // calls add(double,double)
}
```

---
### B) Operator Overloading (brief)
C++ allows giving special meaning to operators for user-defined types.
Example (idea): `Complex c3 = c1 + c2;` where `+` is overloaded.
```c++
#include <iostream>
using namespace std;

class Complex {
private:
    int real, imag;

public:
    // Constructor
    Complex(int r = 0, int i = 0) : real(r), imag(i) {}

    // Overload + operator
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imag + other.imag);
    }

    // Overload - operator
    Complex operator-(const Complex& other) const {
        return Complex(real - other.real, imag - other.imag);
    }

    // Overload * operator
    Complex operator*(const Complex& other) const {
        int r = real * other.real - imag * other.imag;
        int i = real * other.imag + imag * other.real;
        return Complex(r, i);
    }

    // Friend function to overload << (output)
    friend ostream& operator<<(ostream& out, const Complex& c);
};

// Definition of <<
ostream& operator<<(ostream& out, const Complex& c) {
    out << c.real << " + " << c.imag << "i";
    return out;
}

int main() {
    Complex c1(2, 3), c2(4, 5);

    Complex sum = c1 + c2;
    Complex diff = c1 - c2;
    Complex prod = c1 * c2;

    cout << "Sum: " << sum << endl;
    cout << "Difference: " << diff << endl;
    cout << "Product: " << prod << endl;

    return 0;
}
```

---
## 2) Run-time Polymorphism (Dynamic)
### Method Overriding (Virtual Functions)
**Overriding** means a derived class provides its **own implementation** of a base class method with the **same signature**.
✅ Resolved at **run time** using:
- `virtual` keyword in base class
- base class pointer/reference calling derived object

```c++
#include <bits/stdc++.h>
using namespace std;

class Animal {
public:
    virtual void speak() {
        cout << "Animal sound\n";
    }

    virtual ~Animal() = default; // good practice for base class
};

class Dog : public Animal {
public:
    void speak() override {
        cout << "Bark\n";
    }
};

class Cat : public Animal {
public:
    void speak() override {
        cout << "Meow\n";
    }
};

int main() {
    Animal* a1 = new Dog();
    Animal* a2 = new Cat();

    a1->speak(); // Bark (decided at runtime)
    a2->speak(); // Meow

    delete a1;
    delete a2;
}
```

---
## Overloading vs Overriding (Very important)

| Feature | Overloading | Overriding |
| --- | --- | --- |
| Happens in | Same class (usually) | Base + derived classes |
| Signature | Different parameters | Same signature |
| Binding | Compile-time (static) | Run-time (dynamic) |
| Keywords | none required | `virtual` (base), `override` (derived) |
| Purpose | Multiple ways to call a function | Change behavior in derived class |

---
## Virtual function notes (Interview points)
- If a function is **not virtual**, calling it through a base pointer will use **base version** (early binding).
- Use `override` in derived class to catch mistakes (signature mismatch).
- Always prefer a **virtual destructor** in a polymorphic base class.

---
## Quick example: Without `virtual` (what goes wrong)
```c++
class Base {
public:
    void show() { cout << "Base\n"; }
};

class Derived : public Base {
public:
    void show() { cout << "Derived\n"; }
};

int main() {
    Base* b = new Derived();
    b->show(); // prints Base (because show() is not virtual)
    delete b;
}
```

---
## Summary
- **Polymorphism** = one interface, many forms.
- **Overloading** → compile-time polymorphism.
- **Overriding (virtual)** → run-time polymorphism.
- Use `virtual`, `override`, and a virtual destructor for clean, safe runtime polymorphism.