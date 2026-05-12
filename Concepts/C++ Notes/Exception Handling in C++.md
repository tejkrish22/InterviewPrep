---
notion-id: 349d9a38-fc71-8057-9bdd-c75fa3431442
---
1. Consider the following function

```c++
int average (int arr[], int n){
	int sum = 0;
	for (int i=0; i<n; i++){
		sum += arr[i];
	}
	int res = sum/n;
	return res;
}
```
2. If user provides n=0, then we will get runtime error caused by division by 0 error.
3. So we should handle this some how.
4. Some of the unusual conditions are
    1. Divide by 0
    2. No heap memory available during dynamic memory allocation
    3. Accessing array elements outside the size
    4. Pop from and empty stack
5. C++ provides 3 keywords for exception handling
    5. try - the code block that may throw exception
    6. throw - used to throw an exception
    7. catch - one or more catch blocks are used to handle the exception
6. Code
```c++
int main () {
	int x,y;
	cin>>x>>>y;
	
	try{
		if (y==0) throw 0;
		cout<<x/y;
	}
	catch (int x){
		cout<<"Divisor is zero"
	}
}
```
7. Multiple throws and catch

```c++
int main()
{
    double x,y;
    cin>>x>>y;
    
    try{
        if (x==0.0) throw 0;
        if (y==0.0) throw string("y is zero");
        if (x+y<0.0) throw (x+y);
    }
    catch (int e1) {
        cout<<e1;
    }
    catch (string &e2){
        cout<<e2;
    }
    // (...) is used to catch any kind of throw - catch all
    catch (...){
        cout<<"x+y is less than 0";
    }
    cout<<"Bye";
    
    return 0;
}
```
8. User Defined Exceptions
```c++
#include <iostream>
#include <exception>
using namespace std;

class ArraySizeZeroException : public exception {
public:
    const char* what() const noexcept override {
        return "Array size is zero";
    }
};

class ArraySizeNegativeException : public exception {
public:
    const char* what() const noexcept override {
        return "Array size is negative";
    }
};

int average(int arr[], int n) {
    if (n == 0) throw ArraySizeZeroException();
    if (n < 0) throw ArraySizeNegativeException();

    int sum = 0;
    for (int i = 0; i < n; i++) sum += arr[i];

    return sum / n;
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = 5;

    try {
        int res = average(arr, n);
        cout << res;
    }
    catch (exception &e) {
        cout << e.what();
    }
}
```

