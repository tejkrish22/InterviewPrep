---
notion-id: 34cd9a38-fc71-802e-9c84-e9f92dbb2157
---
## Problem with normal pointers
1. If we allocate the memory dynamically, and then we should explicitly deallocate memory.
2. The below program will not throw error and keep running, until it finally crashes.

```c++
void fun(){
	int* ptr = new int[10];
}

int main (){
	while (true){
		fun();
	}
}
```
## Custom Smart pointer example
3. Smart pointers try to solve this memory leak problem by wrapping the pointer in a class.

```c++
class SP {
    int *ptr;
public:
    SP(int* p=nullptr) {ptr=p;}
    ~SP () {
	    cout<<"heyaa!"<<endl;
	    delete ptr;
	   }
    int& operator *() {
        return *ptr;
    }
};

int main()
{
		// this will be automatically created as this is created in stack memory
    SP sp(new int());
    *sp = 20;
    cout<<*sp; 
    // in this case the destructor is not called becoz its dynamically allocated
    SP* sp2 = new SP(new int()); }
```
4. In the above program, the `sp` object automatically de-allocated the memory as destructor is called as program ends.

## Library implementation of Smart Pointers
5. There are three smart pointers in `memory` library
    1. unique_ptr
    2. shared_ptr
    3. weak_ptr

## unique_ptr
```c++
class Test {
private:
    int x;
public:
    Test(int a=0){
        x=a;
        cout<<"Constructor called"<<endl;
    }
    ~Test(){
        cout<<"Destructor called"<<endl;
    }
    void fun() {
        cout<<"Hello world!"<<endl;
    }
};
int main()
{
    cout<<"Main starts\n";
    {   
        unique_ptr<Test> ptr1 = make_unique<Test>(10); // supported from c++ 14
        // unique_ptr<Test> ptr2(new Test(10)); // supported prior to 14
        ptr1->fun();
        
        unique_ptr<Test> ptr2 = ptr1; // throw error
    }
    cout<<"Main ends\n";
}
```
6. A unique pointer is only pointed to one object and copy is not allowed.
7. Instead transfer of ownership can be done.
```c++
 unique_ptr<Test> ptr1 = make_unique<Test>(10);
 unique_ptr<Test> ptr2 = move(ptr1);
```
8. This wont allow memory leaks.
9. Automatically de-allocates the memory.
10. unique_ptr does not have any overhead.

## shared_ptr
```c++
shared_ptr<Test> ptr1 = make_shared<Test>(10);
shared_ptr<Test> ptr2 = ptr1;

cout<<ptr1.use_count()<<endl;  // output:2
cout<<ptr2.use_count()<<endl;  // output:2
```
11. Internally shared_ptr maintains the reference count on how many objects co-share the same memory.
12. If all shared objects go out of scope then the memory is deleted automatically, that is in other words when reference count becomes 0. 
13. Its better to use the unique_ptr than shared_ptr to avoid overhead.

## weak_ptr
```c++
weak_ptr<Test> p1;
{
	shared_ptr<Test> p2 = make_shared<Test>(10);
	p1=p2;
}
cout<<p1.expired(); // if the oject is not pointing to a memory

// to conver a weak ptr to shared ptr to make sure weak ptr's memory is not dealocated
shared_ptr<Test> p3 = lock(p1);
```
14. weark_ptr is always used alongside of shared_ptr.
15. weak_ptr will not get any ownership, so the reference count also wont increase for the shared_ptr.
16. A cyclic reference occurs when two or more objects reference each other directly or indirectly, forming a loop. This is especially dangerous with std::shared_ptr because it uses reference counting, and cycles keep the count above zero forever, causing a memory leak.

![[image.png]]
```c++
#include <bits/stdc++.h>
using namespace std;

struct Node {
    shared_ptr<Node> next;
};

int main() {
    shared_ptr<Node> a = make_shared<Node>();
    shared_ptr<Node> b = make_shared<Node>();

    a->next = b;
    b->next = a; // Cyclic reference formed (leak)

    return 0; // Memory is NOT freed due to cycle
}
```
17. In above, we can’t delete any object without deleting the other because the reference count stays 2, so if we use weak_ptr then refernce count stays 1 and can be deleted.