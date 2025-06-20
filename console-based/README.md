# Railway Ticket Booking System - Console Edition

This is a console-based version of the railway ticket booking system, built with vanilla Java and no external dependencies.

## Features

- Search for available trains between an origin and destination.
- Book tickets for a specific train and class.
- View booking history for a user.
- All data is stored in-memory and is reset every time the application starts.

## How to Compile and Run

This project does not require any build tools like Maven or Gradle. You can compile and run it using only the Java Development Kit (JDK).

### Prerequisites

- Java JDK 11 or higher

### Step 1: Compile the Code

Open a terminal or command prompt and navigate to the `console-based` directory. Run the following `javac` command to compile all the source files into the `bin` directory.

On Windows (using PowerShell or CMD):
```powershell
javac -d bin src/com/railway/booking/console/model/*.java src/com/railway/booking/console/service/*.java src/com/railway/booking/console/*.java
```

On macOS or Linux:
```bash
javac -d bin src/com/railway/booking/console/model/*.java src/com/railway/booking/console/service/*.java src/com/railway/booking/console/*.java
```

### Step 2: Run the Application

Once the code is compiled, run the application from the `bin` directory using the `java` command.

On Windows:
```powershell
java -cp bin com.railway.booking.console.Main
```

On macOS or Linux:
```bash
java -cp bin com.railway.booking.console.Main
```

The application will start, and you can interact with it through the menu presented in your console. 