---
notion-id: 34bd9a38-fc71-805d-8869-ee806215587d
---
## What are Solid Principles?
1. Set of 5 rules aimed at improving the maintainability, scalability and robustness of an object oriented system.
2. They are
    1. Single Responsibilty Principles (SRP)
    2. Open/Closed Principle (OCP)
    3. Liskov Substitution Principle (LSP)
    4. Interface Segregation Principle (ISP)
    5. Dpendency Inversion Principle (DIP)

## Single Responsibility Principle (SRP)
3. Only one reason to change, a  single responsibilty
4. A class must have only one responsibilty.
5. I

## Open / Close Principle (OCP)
6. open for extension, closed for modificaiton
7. A class should be open for extension, but we should not modify the class.
8. Because modification would affect the existing users

## Liskov Substitution Principle (LSP)
9. Subclasses should be substitutable for the base class without affecting the correctness of the program

## Interface Segregation Principle (ISP)
10. A class should not be forced to implement interfaces it does not use.

## Dependency Inversion Principle (DIP)
11. High level modules should not depend on low level modules. Both should depend on abstractions.

## Summary

| SRP | One responsibilty per class | Improves maintainabilty |
| --- | --- | --- |
| OCP | Extend behavior without modifying the code | Enhances scalability |
| LSP | Subclasses behave consistently | Avoids unexpceted behavior |
| ISP | Classes only implement needed methods | Reduces the implementation overhead |
| DIP | Depends on abstractions, not concretes | Decouples high and low level code |