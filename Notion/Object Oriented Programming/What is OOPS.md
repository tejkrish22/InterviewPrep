---
notion-id: 33cd9a38-fc71-8012-a428-e62f022a3bed
---
1. Definition
    1. OOPS is a programming paradigm using **objects and classes**
    2. Helps build **modular, reusable, maintainable** systems
2. Why OOPS?
    3. Manages **complexity**
    4. Improves **reusability**
    5. Supports **scalability & maintenance**
    6. Models **real-world systems**
3. Basic Terminology
    7. **Class** → Blueprint (e.g., `Car`)
    8. **Object** → Instance (e.g., `myCar`)
    9. **Attributes** → Properties (`color`, `speed`)
    10. **Methods** → Functions (`drive()`, `brake()`)
4. Core Principles (4 Pillars)
    11. **Encapsulation** → Data + methods together, restrict access
    12. **Abstraction** → Hide implementation details
    13. **Inheritance** → Reuse properties from another class
    14. **Polymorphism** → Same function, different behavior
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
    15. Structured design
    16. Better security (encapsulation)
    17. Reusable (inheritance)
    18. Easy to maintain
    19. Scalable
    20. Real-world mapping
    21. Flexible (polymorphism)