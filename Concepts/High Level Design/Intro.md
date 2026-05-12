---
notion-id: 352d9a38-fc71-80a9-9028-df1de7b76bff
---
Consider the case of starting a Pizza shop with one chef

| # | Analogy (Pizza Shop) | What’s Happening | System Design Term |
| --- | --- | --- | --- |
| 1 | Upgrade the chef’s oven, tools, and kitchen so the same chef can cook faster | Increase capacity of a single machine | Vertical Scaling |
| 2 | Prepare pizza bases and sauces before rush hours so orders are faster later | Do work in advance / scheduled processing | Preprocessing & CRON Jobs |
| 3 | Keep recipe books and order records saved safely to recover if lost | Store data for recovery | Backups |
| 4 | Hire more chefs of same skill to handle more orders | Add more machines/resources | Horizontal Scaling |
| 5 | Separate teams: one for pizza, one for garlic bread, one for billing | Split system by business capabilities | Microservices |
| 6 | Open multiple shops in different cities that coordinate via phone/orders | Systems distributed across locations communicating over network | Distributed Systems |
| 7 | A dispatcher decides which shop should handle each order based on load and distance | Route requests intelligently | Load Balancer |
| 8 | Delivery team only cares when order is ready, not how pizza is made | Reduce dependency between components | Decoupling |
| 9 | Maintain records of every order, delays, and failures to analyze performance | Track events and system health | Logging & Metrics |
| 10 | Add new menu items (like thick shakes) without changing existing kitchen workflow | Easily support new features without breaking system | Extensibility |
| 11 | Keep popular pizzas pre-made or partially ready for instant delivery | Store frequently used data for fast access | Caching |
| 12 | Maintain a central system to track all orders, customers, and inventory | Persistent data storage | Database |
| 13 | Orders wait in a queue before chefs pick them up | Handle asynchronous workloads | Queue |
| 14 | Limit number of orders per minute to avoid overwhelming kitchen | Control incoming traffic | Rate Limiting |
| 15 | Ensure all shops show same menu or allow slight differences depending on sync | Data consistency across system | Consistency Models |