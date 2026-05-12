---
notion-id: 33ad9a38-fc71-805e-b1d5-e440777f9e0c
---
## Relationships between objects in OOP
In real-world design, objects rarely live alone. They **interact** with each other using relationships.
Common relationship types:
1. **Association** (general relationship)
2. **Aggregation** (weak “has-a”)
3. **Composition** (strong “has-a”, ownership)

---
## 1) Association
**Association** means one class **uses/knows about** another class.
- No ownership is implied.
- Both objects can exist independently.

### Common cardinalities
- **One-to-One**: `Student` ↔ `Passport` (a student has one passport)
- **One-to-Many**: `School` → many `Student`s
- **Many-to-Many**: `Student` ↔ `Course` (students enroll in many courses; a course has many students)

### Quick example (Association)
```c++
class Teacher {
public:
    void teach() {}
};

class Student {
public:
    void attendClass(Teacher& t) { // uses Teacher (association)
        t.teach();
    }
};
```

---
## 2) Aggregation (weak "has-a")
**Aggregation** is a special kind of association where one class **has** another class, but **does not own** its lifetime.
Meaning:
- The contained object can exist **independently**.
- If the container object is destroyed, the contained object **can still live**.

### Example (Aggregation)
A `Student` *has a* `Passport`, but the `Passport` is created/owned elsewhere and only referenced by `Student`.
```c++
#include <bits/stdc++.h>
using namespace std;

class Passport {
    string number;
public:
    Passport(const string& number) : number(number) {}
    string getNumber() const { return number; }
};

class Student {
    string name;
    Passport* passport; // non-owning pointer (aggregation)

public:
    Student(const string& name, Passport* passport)
        : name(name), passport(passport) {}

    void show() const {
        cout << name << " - " << passport->getNumber() << "\n";
    }
};

int main() {
    Passport p("AKJHEFA461732");
    Student s("Teja", &p);
    s.show();
}
```
> In aggregation, the design intent is: **Student uses Passport, but Passport’s lifetime is not controlled by Student**.

---
## 3) Composition (strong "has-a")
**Composition** is a relationship where one class **owns** another object’s lifetime.
Meaning:
- The contained object usually **cannot exist independently** (as part of that design).
- If the container is destroyed, the contained object is destroyed **automatically**.

### Example (Composition)
A `Student` *owns* a `Passport` (created inside `Student` and destroyed with it).
```c++
#include <bits/stdc++.h>
using namespace std;

class Passport {
    string number;
public:
    Passport(const string& number) : number(number) {}
    string getNumber() const { return number; }
};

class Student {
    string name;
    Passport passport; // owned member (composition)

public:
    Student(const string& name, const string& passportNumber)
        : name(name), passport(passportNumber) {}

    void show() const {
        cout << name << " - " << passport.getNumber() << "\n";
    }
};

int main() {
    Student s("Teja", "AKJHEFA461732");
    s.show();
}
```

---
## Can a class participate in multiple relationships?
✅ Yes.
- The same pair of classes can have different relationships depending on design.
- Example: `Student` ↔ `Passport` can be modeled as association, aggregation, or composition depending on **ownership and lifetime rules**.

---
## Summary table

| Feature | Association | Aggregation | Composition |
| --- | --- | --- | --- |
| Relationship | General “uses-a” | Weak “has-a” | Strong “has-a” |
| Ownership | No ownership | No ownership of lifetime | Full ownership |
| Lifetime dependency | Independent | Independent | Dependent |
| Example | Teacher–Student | Employee–Department | Car–Engine |

---
## Interview-friendly one-liners
- **Association**: “A uses B.”
- **Aggregation**: “A has B, but B can live without A.”
- **Composition**: “A owns B; if A dies, B dies too.”