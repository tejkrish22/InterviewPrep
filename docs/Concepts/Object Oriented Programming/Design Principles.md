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
1. Only one reason to change, a single responsibility.
2. A class must have only one responsibility.

## Open / Close Principle (OCP)
1. Open for extension, closed for modification.
2. A class should be open for extension, but we should not modify the class.
3. Because modification would affect the existing users.

## Liskov Substitution Principle (LSP)
1. Subclasses should be substitutable for the base class without affecting the correctness of the program.

## Interface Segregation Principle (ISP)
1. A class should not be forced to implement interfaces it does not use.

## Dependency Inversion Principle (DIP)
1. High level modules should not depend on low level modules. Both should depend on abstractions.

## Summary

| SRP | One responsibilty per class | Improves maintainabilty |
| --- | --- | --- |
| OCP | Extend behavior without modifying the code | Enhances scalability |
| LSP | Subclasses behave consistently | Avoids unexpceted behavior |
| ISP | Classes only implement needed methods | Reduces the implementation overhead |
| DIP | Depends on abstractions, not concretes | Decouples high and low level code |