---
notion-id: 33cd9a38-fc71-8012-a428-e62f022a3bed
---
1. Definition
    1. OOPS is a programming paradigm using **objects and classes**
    2. Helps build **modular, reusable, maintainable** systems
2. Why OOPS?
    1. Manages **complexity**
    2. Improves **reusability**
    3. Supports **scalability & maintenance**
    4. Models **real-world systems**
3. Basic Terminology
    1. **Class** → Blueprint (e.g., `Car`)
    2. **Object** → Instance (e.g., `myCar`)
    3. **Attributes** → Properties (`color`, `speed`)
    4. **Methods** → Functions (`drive()`, `brake()`)
4. Core Principles (4 Pillars)
    1. **Encapsulation** → Data + methods together, restrict access
    2. **Abstraction** → Hide implementation details
    3. **Inheritance** → Reuse properties from another class
    4. **Polymorphism** → Same function, different behavior
5. Simple C++ Example
```c++
#include <iostream>
using namespace std;

class Car {
public:
    string color;

    void drive() {
        cout << "Car is driving" << endl;
    }
};

int main() {
    Car myCar;
    myCar.color = "Red";
    myCar.drive();
}
```
6. **OOPS Advantages**
    1. Structured design
    2. Better security (encapsulation)
    3. Reusable (inheritance)
    4. Easy to maintain
    5. Scalable
    6. Real-world mapping
    7. Flexible (polymorphism)