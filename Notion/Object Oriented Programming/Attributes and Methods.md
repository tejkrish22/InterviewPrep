---
notion-id: 33cd9a38-fc71-804b-bc76-d36304e92743
---
## 1) Attributes (Data Members)
**Attributes** are the **variables inside a class**.
### Key points
- Represent the **state/data** of an object.
- Each object gets its **own copy** of non-static attributes.
- Also called **data members / properties / fields**.
- Common practice: keep attributes **private** to enforce encapsulation.

---
## 2) Methods (Member Functions)
**Methods** are the **functions inside a class**.
### Key points
- Represent the **behavior** of an object.
- Usually **operate on attributes**.
- Also called **member functions**.
- Good methods validate input and keep the object in a valid state.

---
## 3) Example: BankAccount (Encapsulation + Methods)
```c++
#include <bits/stdc++.h>
using namespace std;

class BankAccount {
private:
    string name;     // account holder
    double balance;  // current balance

public:
    // Constructor: initialize attributes
    BankAccount(const string& name, double balance)
        : name(name), balance(balance) {
        if (balance < 0) this->balance = 0; // basic safety
    }

    // Getter (read-only access)
    string getName() const {
        return name;
    }

    double getBalance() const {
        return balance;
    }

    // Setter (controlled update)
    void setName(const string& name) {
        this->name = name;
    }

    // Business methods
    void deposit(double amount) {
        if (amount <= 0) return; // ignore invalid deposit
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
## 4) Important OOP points (interview-friendly)
1. **Accessing attributes**: Prefer **getters/setters** over direct access (especially for `private` members).
2. **Encapsulation**: Keep data `private`, expose a minimal `public` interface.
3. **Initialization**: In C++, uninitialized members can contain **garbage values**—initialize via **constructors / initialization lists**.
4. **Methods with parameters**: Methods take input to modify state safely (e.g., `deposit(amount)`).
5. **Validation & error handling**: Validate inputs (no negative deposit; no over-withdrawal).

---
## 5) Quick notes: `this` pointer and `const`
- `this` points to the **current object** inside a method.
- Mark read-only methods as `const` (ex: `getBalance() const`) so they can be called on const objects and they won’t accidentally modify state.