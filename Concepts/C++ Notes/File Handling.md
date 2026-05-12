---
notion-id: 34bd9a38-fc71-808b-93dc-d638fc7cb36a
---
1. C++ can read files and write to files
2. The useful classes for working with files in C++ are:
    1. fstreambase
    2. ifstream - input file stream —> drived from ffstreambase
    3. ofstream - output file stream —> derived from fstreambase
3. These are bundled in `fstream` .
4. In order to work with files in C++, the file needs to be opened. It can be done 2 ways
    4. using the constructor
    5. using the member function open() of the class
5. Different operation modes

| Mode | Meaning | Applies To | Key Behavior |
| --- | --- | --- | --- |
| `ios::in` | Open for reading | `ifstream`, `fstream` | File must exist |
| `ios::out` | Open for writing | `ofstream`, `fstream` | Creates file if not exists |
| `ios::app` | Append mode | `ofstream`, `fstream` | Writes only at end |
| `ios::ate` | Start at end | All | Pointer starts at end (can move later) |
| `ios::trunc` | Truncate file | `ofstream`, `fstream` | Deletes existing content |
| `ios::binary` | Binary mode | All | No text formatting (raw bytes) |

6. C++ 17 provides filesystem library that offers robust utilities

```c++
#include <bits/stdc++.h>
#include <filesystem>
using namespace std;
namespace fs = std::filesystem;

int main() {
    fs::path p("example.txt");

    if (fs::exists(p)) {
        cout << "File Name: " << p.filename().string() << "\n";
        cout << "Absolute Path: " << fs::absolute(p).string() << "\n";
        cout << "File Size in bytes: " << fs::file_size(p) << "\n";
    } else {
        cout << "The file does not exist.\n";
    }

    return 0;
}
```
7. In C++, `ofstream` is used for writing to files. Internally, it already uses buffering, and you can also use `std::ios::sync_with_stdio(false)` for faster console I/O (not related to file buffering directly).

```c++
#include <bits/stdc++.h>
using namespace std;

int main() {
    // Opening a file for writing (overwrites if it already exists)
    ofstream writer("output.txt");

    if (!writer.is_open()) {
        cout << "Failed to open output.txt\n";
        return 0;
    }

    // Writing in the file
    writer << "Hello, world!\n";
    writer << "This is a sample file.\n";

    // Closing the file after writing
    writer.close();

    cout << "File written successfully.\n";
    return 0;
}
```
8. In C++, `ifstream` is used to read data from a file. You can read line-by-line using `getline()` which is similar to Java’s BufferedReader approach.

```c++
#include <bits/stdc++.h>
using namespace std;

int main() {
    ifstream reader("example.txt");

    // Checking if file opened successfully
    if (!reader.is_open()) {
        cout << "Failed to open example.txt\n";
        return 0;
    }

    string line;
    int i = 1;

    // Read each line until nothing is left
    while (getline(reader, line)) {
        cout << "Line " << i << ": " << line << "\n";
        i++;
    }

    // Close the file after reading
    reader.close();
    return 0;
}
```
9. C++ does not have a direct equivalent of Java’s try-with-resources. Instead, it uses RAII (Resource Acquisition Is Initialization).
10. In RAII, resources are acquired in an object’s constructor and automatically released in its destructor. File streams follow RAII: when the stream object goes out of scope, it automatically closes the file.

```c++
#include <bits/stdc++.h>
using namespace std;

int main() {
    // File stream uses RAII: it closes automatically when it goes out of scope
    ifstream reader("example.txt");

    if (!reader.is_open()) {
        cout << "Failed to open example.txt\n";
        return 0;
    }

    string line;
    while (getline(reader, line)) {
        cout << line << "\n";
    }

    // No explicit close needed (but you can still call reader.close())
    return 0;
}
```
11. Logging Application Data

```c++
#include <bits/stdc++.h>
using namespace std;

// Logger class
class Logger {
private:
    string path; // to store the path of file

public:
    // Constructor
    Logger(const string& path) {
        this->path = path;

        // Create the file if it does not exist (opening in append creates it)
        ofstream tmp(path, ios::app);
        tmp.close();
    }

    // Log the message in the file
    void log(const string& message) {
        ofstream out(path, ios::app); // append mode

        if (!out.is_open()) {
            cout << "Failed to log this message: " << message << "\n";
            return;
        }

        out << message << "\n";
        out.close();
    }
};

int main() {
    // Create a Logger instance with a specified log file path
    Logger myLogger("application.log");

    // Log some messages
    myLogger.log("Application started...");
    myLogger.log("User logged in.");
    myLogger.log("Error: Unable to connect to the database.");
    myLogger.log("Application closed.");

    cout << "Logs have been written successfully.\n";
    return 0;
}
```
