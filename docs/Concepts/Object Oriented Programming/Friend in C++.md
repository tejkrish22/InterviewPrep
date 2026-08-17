---
notion-id: 349d9a38-fc71-80e5-9994-f2b13cab3656
---
1. In C++, a class can specify another class or a function as `friend` of it, then the other function or class can access all the private and public stuff of that class

```cpp
class Employee;

class Printer {
	public:
		coid printEmp (const Employee& e);
};

class Employee{
	private:
		int id;
		string name;
		
	public:
	
		// friend as class
		friend class Printer;
		// friend as function
		friend void Printer::printEmp (const Employee &e);
		
		Employee (int i, string n): id(i), name(n) {}
};

void Printer::printEmp (const Employee& e){
	cout<<e.id<<" "<<e.name<<endl;
}

int main(){
	Printer p;
	Employee e("10","ABC");
	p.printEmp(e);
	return 0;
}
```
2. Properties of friendship
    1. Granted
    2. Not Mutual
    3. Not Transitive
    4. Not Inherited