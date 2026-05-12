---
notion-id: 33cd9a38-fc71-8057-8978-cfb29f50dd6d
---
## Object Cloning (Copying objects in C++)
**Object cloning** means creating a new object that is a **copy** of an existing object.
In C++, copying can happen via:
- **Copy constructor** (copy while creating a new object)
- **Copy assignment operator** (copy into an existing object)

If a class manages resources (like `new` memory, file handles, sockets), you must think about:
- **Shallow copy** vs **Deep copy**
- (Rule of 3/5) implementing copy/move properly

---
## 1) Copy constructor
Used when a **new object** is created from an existing object.
**Signature:**
```c++
ClassName(const ClassName& other);
```
### When is it called?
- `T b = a;` (copy initialization)
- `T b(a);` (direct initialization)
- Passing an object **by value** to a function
- Returning an object **by value** (copy elision may optimize this)

---
## 2) Copy assignment operator
Used when an **existing object** is assigned the value of another existing object.
**Signature:**
```c++
ClassName& operator=(const ClassName& other);
```
### When is it called?
```c++
T a;
T b;

b = a; // copy assignment
```

---
## 3) Shallow copy vs Deep copy
### Shallow copy
- Copies member-by-member **as-is**.
- If the class has a **pointer**, only the pointer address is copied.
- Both objects now point to the **same heap memory**.

Problems:
- **Double free** (both destructors try to `delete` the same pointer)
- Unexpected side effects (changing data through one object affects the other)

### Deep copy
- Creates a **new separate copy** of dynamically allocated memory.
- Each object owns its **own** resource.

---
## 4) Why default copy is dangerous for pointers
If you don’t write a custom copy constructor/assignment, C++ generates a default one that typically does a **shallow copy**.

---
## 5) Example: Shallow copy problem (raw pointer)
```c++
#include <bits/stdc++.h>
using namespace std;

class Shallow {
public:
    int* p;

    Shallow(int x) {
        p = new int(x);
    }

    // compiler-generated copy constructor does shallow copy
    // compiler-generated assignment operator does shallow copy

    ~Shallow() {
        delete p; // ❌ double delete if two objects share same p
    }
};

int main() {
    Shallow a(10);
    Shallow b = a; // shallow copy: b.p == a.p

    // when program ends: both destructors run -> double delete
}
```

---
## 6) Deep copy using copy constructor + copy assignment (elaborated)
```c++
#include <bits/stdc++.h>
using namespace std;

class Deep {
private:
    int* p; // resource on heap (we OWN it)

public:
    // Normal constructor: allocate resource
    Deep(int x = 0) {
        p = new int(x);
    }

    // Copy constructor (deep copy)
    // Called when creating a NEW object from an existing object:
    //   Deep b = a;   or   Deep b(a);
    // Important: take `const Deep&` to avoid extra copy and allow copying const objects.
    Deep(const Deep& other) {
        p = new int(*other.p); // allocate NEW memory and copy VALUE
    }

    // Copy assignment operator (deep copy)
    // Called when assigning into an EXISTING object:
    //   c = a;
    // Must return reference to allow chaining: (a = b = c)
    Deep& operator=(const Deep& other) {
        if (this == &other) {
            return *this; // self-assignment: do nothing
        }

        // Free current resource (to avoid memory leak)
        delete p;

        // Allocate new resource and copy value
        p = new int(*other.p);

        return *this;
    }

    // Destructor: free owned resource
    ~Deep() {
        delete p;
    }

    void set(int x) { *p = x; }
    int get() const { return *p; }
};

int main() {
    Deep a(10);

    Deep b = a; // ✅ copy constructor

    Deep c;
    c = a;      // ✅ copy assignment operator

    b.set(99);
    cout << a.get() << " " << b.get() << "\n"; // 10 99 (independent)
}
```

---
## 7) Rule of 3 (must remember)
If your class defines any one of these, you usually need all three:
1. Destructor
2. Copy constructor
3. Copy assignment operator

Reason: owning raw resources requires correct copy + cleanup behavior.

---
## 8) Interview-friendly summary
- **Copy constructor**: called when creating a new object from another object.
- **Copy assignment**: called when assigning into an existing object.
- **Shallow copy**: copies pointer address → shared memory → bugs.
- **Deep copy**: copies the actual pointed data → separate ownership.
- If using raw pointers, follow **Rule of 3** (or better: use `std::vector`, `std::string`, smart pointers).

```javascript
// Book class supports cloning
class Book {
public:
    string title;
    string author;

    // Constructor to initialize book details
    Book(string title, string author) {
        this->title = title;
        this->author = author;
    }

    // clone method
    Book* clone() const {
        // default shallow copy (safe since string is deep copied internally)
        return new Book(title, author);
    }
};

// Library class supports shallow and deep cloning
class Library {
public:
    string name;
    vector<Book*> books;

    // flag to decide ownership (important for destructor)
    bool ownsBooks;

    // Initialize library with empty book list
    Library(string name, bool ownsBooks = true) {
        this->name = name;
        this->ownsBooks = ownsBooks;
    }

    // Destructor
    ~Library() {
        // delete only if this object owns the books
        if (ownsBooks) {
            for (Book* book : books) {
                delete book;
            }
        }
    }

    // Add a book to the library
    void addBook(Book* book) {
        books.push_back(book);
    }

    // Shallow clone → shares same books list reference
    Library* shallowClone() {
        // list reference copied, not duplicated
        Library* cloned = new Library(name, false); // does NOT own books
        cloned->books = books;
        return cloned;
    }

    // Deep clone → creates new list + new Book objects
    Library* deepClone() {
        // copy primitive + references first
        Library* cloned = new Library(name, true);

        for (Book* book : books) {
            cloned->books.push_back(book->clone()); // clone each book separately
        }

        return cloned;
    }

    // Display library details
    void display() {
        cout << "Library : " << name << endl;
        for (Book* book : books) {
            cout << "Book : " << book->title
                 << ", Author : " << book->author << endl;
        }
    }
};
```