## Overview of Execution Models

| Aspect            | Multiprogramming                                  | Multitasking                                   | Multiprocessing                                               | Multithreading                                                |
| ----------------- | ------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |

| What it is        | Many programs stay in memory together.            | Many tasks share CPU using time slices.        | Many CPUs or cores run work at the same time.                 | Many threads exist inside one process.                        |
| Problem it solves | CPU becomes idle when one program waits for I/O.  | Users need many tasks to feel active together. | One CPU or core cannot do many things at the exact same time. | One application needs many activities to happen concurrently. |
| Unit involved     | Programs or processes are the main unit.          | Tasks, processes, or threads are time-shared.  | Threads or processes run on different CPUs or cores.          | Threads run inside the same process.                          |
| Main goal         | Maximize CPU utilization.                         | Maximize responsiveness and fairness.          | Maximize parallel throughput.                                 | Maximize concurrent application work.                         |
| Key idea          | Keep the CPU busy by having other programs ready. | Fast switching makes many tasks feel active.   | Hardware runs multiple execution paths together.              | Many execution paths exist within one process.                |
| Main question     | What runs when one program waits?                 | How do many tasks feel active?                 | How can hardware run work at the same time?                   | How can one process do many activities?                       |
