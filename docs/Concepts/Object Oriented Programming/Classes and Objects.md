---
notion-id: 33cd9a38-fc71-80f1-a65a-f2cf5e2599bd
---
## 1) Class
A **class** is a user-defined data type that acts as a **blueprint/template** for creating objects.
### Key points
- Groups **data members (attributes)** and **member functions (methods)** together.
- Describes *what an object will have and do*.
- A class definition **does not allocate memory for its non-static data members** until an object is created.

### Example (Class)
```c++
#include <bits/stdc++.h>
using namespace std;

class Employee {
private:
    int salary; // encapsulated (hidden)

public:
    string employeeName;

    void setName(const string& s) {
        employeeName = s;
    }

    void setSalary(int val) {
        salary = val;
    }

    int getSalary() const {
        return salary;
    }
};
```

---
## 2) Object
An **object** is an **instance of a class**.
### Key points
- Represents a **real-world entity** (ex: employee, car, bank account).
- **Occupies memory** when created.
- Accesses class members using `.` (dot operator) for normal objects and `->` for pointers.

### Example (Objects)
```c++
#include <bits/stdc++.h>
using namespace std;

class Employee {
private:
    int salary;

public:
    string employeeName;

    void setName(const string& s) { employeeName = s; }
    void setSalary(int val) { salary = val; }
    int getSalary() const { return salary; }
};

int main() {
    Employee obj1;
    obj1.setName("Raj");
    obj1.setSalary(10000);

    Employee obj2;
    obj2.setName("Rahul");
    obj2.setSalary(15000);

    cout << "Salary of " << obj1.employeeName << " is " << obj1.getSalary() << "\n";
    cout << "Salary of " << obj2.employeeName << " is " << obj2.getSalary() << "\n";
}
```

---
## 3) Class vs Object (Differences)

| Class | Object |
| --- | --- |
| Blueprint / template | Real instance created from the class |
| Logical entity | Physical entity (occupies memory) |
| Describes properties + behavior | Actually stores values and performs operations |
| Memory not allocated for non-static members until object creation | Memory allocated at creation |

---
## 4) Creating objects: Stack vs Heap
Objects can be created in two common ways:
### A) Stack allocation (automatic storage)
```c++
Employee e1; // stack object
```
- Memory is managed automatically.
- Object is destroyed automatically when it goes out of scope.

### B) Heap allocation (dynamic storage)
```c++
Employee* e2 = new Employee(); // heap object
```
- Memory is allocated at runtime.
- Must be released manually using `delete` (or use smart pointers).

---
## 5) Object lifetime and deletion
### Stack object destruction (automatic)
```c++
void func() {
    Employee e1; // destroyed automatically when func() ends
}
```
### Heap object destruction (manual)
```c++
void func() {
    Employee* e2 = new Employee();
    delete e2;        // required to avoid memory leak
    e2 = nullptr;     // good practice (avoids dangling pointer)
}
```

---
## 6) Stack vs Heap (Quick notes)
- **Stack**: used for local variables and stack-created objects; fast allocation; automatic cleanup.
- **Heap**: used for objects created with `new`; flexible lifetime; needs manual cleanup with `delete` (or use smart pointers like `std::unique_ptr`).

### Common mistake
If you forget `delete` for heap objects, it can cause a **memory leak**.