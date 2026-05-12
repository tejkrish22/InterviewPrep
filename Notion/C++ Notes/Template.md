---
notion-id: 34bd9a38-fc71-8034-81d4-c65815285f32
---
1. Consider the following example

```c++
class Vector {
	int *arr;
	int size;
public:
	-----
	-----
	-----
}
```
2. The above vector class is for `int` datatype, so for each datatype we need create separate classes; which violates the DRY priciple.
3. So `Templates` can be used to parameterize the classes.
4. Generic Programming
5. Templates are compile time code generators.
6. When you call:
```c++
add(2, 3);        // T = int
add(2.5, 3.1);    // T = double
```
the compiler generates separate functions like
```c++
int add(int, int);
double add(double, double);
// Template instantiation
```
7. Function Templates

```c++
template <typename T>
T maxVal(T a, T b) {
    return (a > b) ? a : b;
}
```
8. class Templates

```c++
template <typename T>
class Box {
public:
    T value;

    Box(T v) : value(v) {}

    void show() {
        cout << value << endl;
    }
};

Box<int> b1(10);
Box<string> b2("hello");
```
9. Multiple Template Parameters

```c++
template <typename T>
class Printer {
public:
    void print(T val) {
        cout << val << endl;
    }
};

// Specialization for char*
template <>
class Printer<char*> {
public:
    void print(char* val) {
        cout << "String: " << val << endl;
    }
};
```
10. Standard template library uses templates.