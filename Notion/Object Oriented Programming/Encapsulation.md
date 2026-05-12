---
notion-id: 33cd9a38-fc71-80e1-8b48-c42dd29401b5
---
## What is Encapsulation?
**Encapsulation** is the OOP principle of **bundling data (attributes) and methods (functions) together** inside a class *and* **restricting direct access** to that data.
In C++, encapsulation is mainly achieved using **access specifiers**:
- `private`: accessible only inside the class (best for data members)
- `public`: accessible from outside (best for the interface)
- `protected`: accessible in class + derived classes

### Access comparison table

| Access specifier | Inside same class | In derived class (subclass) | Outside the class |
| --- | --- | --- | --- |
| `public` | ✅ Yes | ✅ Yes | ✅ Yes |
| `protected` | ✅ Yes | ✅ Yes | ❌ No |
| `private` | ✅ Yes | ❌ No | ❌ No |

---
## Why Encapsulation is important
- **Data protection / integrity**: prevents invalid values from being set directly.
- **Controlled access**: you decide *how* the data can be read/changed.
- **Maintainability**: internal implementation can change without breaking user code.
- **Abstraction**: users of the class focus on *what it does*, not *how it stores data*.

---
## Getters and Setters (Core of Encapsulation)
When attributes are `private`, we expose controlled access via:
### Getter (Accessor)
- A function that **returns the value** of a private attribute.
- Should usually be marked `const`.

Example:
```c++
double getBalance() const {
    return balance;
}
```
### Setter (Mutator)
- A function that **updates the value** of a private attribute.
- Should **validate input** before modifying the state.

Example:
```c++
void setBalance(double b) {
    if (b < 0) return;      // validation
    balance = b;
}
```

---
## Example: Encapsulation with proper getters/setters
```c++
#include <bits/stdc++.h>
using namespace std;

class BankAccount {
private:
    string name;
    double balance;

public:
    BankAccount(const string& name, double balance)
        : name(name), balance(0) {
        setBalance(balance); // reuse validation
    }

    // GETTERS (read-only)
    string getName() const { return name; }
    double getBalance() const { return balance; }

    // SETTERS (controlled write)
    void setName(const string& n) {
        if (n.empty()) return;
        name = n;
    }

    void setBalance(double b) {
        if (b < 0) return;
        balance = b;
    }

    // Domain methods (prefer these over raw setters)
    void deposit(double amount) {
        if (amount <= 0) return;
        balance += amount;
    }

    bool withdraw(double amount) {
        if (amount <= 0) return false;
        if (amount > balance) return false;
        balance -= amount;
        return true;
    }
};
```

---
## Best practices (Interview-friendly)
1. **Keep data members **`**private**` by default.
2. Use **getters** for reading and mark them `const`.
3. Use **setters** only when needed, and always **validate** input.
4. Prefer **meaningful domain methods** instead of exposing too many setters:
    - Better: `deposit(amount)`, `withdraw(amount)`
    - Worse: `setBalance(anything)` (can break invariants)
5. Avoid exposing raw pointers/references to internal data unless necessary.

---
## Common pitfalls
- Public attributes → no control, hard to enforce rules.
- Setters without validation → object can enter an invalid state.
- Getters returning non-const references → external code can modify private data indirectly.