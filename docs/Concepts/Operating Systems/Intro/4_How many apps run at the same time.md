## Intro

1. Many *apps* can be open at the same time.
2. Many *processes* can exist at the same time.
3. Many *threads* can be in ready or waiting.
4. Only *limited threads execute* at the **exact same instant**.

## Single Core Multi-tasking

1. On one core CPU, only one thread runs at given time
2. OS switches rapidly between applications' threads.
3. This is time sharing
4. It feels like many apps run together because switching is fast.

## Multi Core Execution

1. Multiple threads can truly execute at the same time
2. 8 cores -> 8 hardware execution slots
3. But more apps can be in open than cores available.
4. Cores decide physical parallel execution, OS decides who gets the cores.

> There is no fixed number for how many apps can run at the same time, it depends on many factors.

## Concurrency vs Parallelism

1. **Concurrency:** Multiple tasks are in progress during the same time period.
2. **Parallelism:** Multiple tasks execute at the exact same instant
3. In single core: concurrency happens through switching
4. In multi core: concurrency plus possible parallelism happens
