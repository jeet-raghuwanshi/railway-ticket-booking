# Railway Ticket Booking System

This is a full-stack web application for a railway ticket booking system, built to fulfill the user stories from Sprint 1.

## Tech Stack

- **UI (Frontend):** HTML, CSS, Vanilla JavaScript
- **Backend:** Vanilla Java with a built-in HTTP server
- **Database:** In-memory H2 Database
- **Build Tool:** Apache Maven

## Features Implemented (Sprint 1)

- **Train Search (US_UI_001, US_Prog_005, US_Prog_006):** Search for trains between an origin and destination. Results are sorted by departure time and only show trains with available seats.
- **Ticket Booking (US_UI_002, US_Prog_007):** A seamless booking process where users can select a train, enter passenger details, and confirm their booking. The system performs a simplified dynamic seat allocation.
- **Booking History (US_UI_003, US_Prog_004):** View a history of past bookings for a specific user.
- **SQL Queries (US_SQL_008, US_SQL_009, US_SQL_010):** All required SQL queries for retrieving booking details, generating reports, and listing available trains have been created and are used by the backend.

## How to Build and Run

### Prerequisites

- Java JDK 11 or higher
- Apache Maven

### Steps

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Build the project using Maven:**
    This command will compile the Java source code and package it into a single executable JAR file.
    ```bash
    mvn clean package
    ```

3.  **Run the application:**
    The JAR file will be created in the `target/` directory.
    ```bash
    java -jar target/railway-ticket-booking-1.0-SNAPSHOT.jar
    ```

4.  **Access the application:**
    Once the server is running, open your web browser and navigate to:
    [http://localhost:8080](http://localhost:8080)

## Project Structure

- `pom.xml`: Maven project configuration, including dependencies for H2 and JSON.
- `db/`: Contains database-related files.
  - `schema.sql`: DDL and DML for creating tables and inserting sample data.
  - `queries.sql`: A collection of the required SQL queries from the user stories.
- `ui/`: Contains all frontend files.
  - `*.html`: The main pages for the application.
  - `style.css`: All CSS styles.
  - `script.js`: Client-side JavaScript for handling user interactions and API calls.
- `src/main/java/com/railway/booking/`: Contains the Java backend source code.
  - `Main.java`: The main application class that starts the database and HTTP server.
  - `StaticFileHandler.java`: An HTTP handler for serving the static UI files.
  - `Database.java`: A utility class for managing database connections.
  - `TrainSearchHandler.java`: API handler for `/api/trains/search`.
  - `BookingHandler.java`: API handler for `/api/booking/*` endpoints.

## API Endpoints

- `GET /api/trains/search?origin=<origin>&destination=<destination>`: Searches for available trains.
- `POST /api/booking`: Creates a new ticket booking.
- `GET /api/booking/history/{userId}`: Retrieves the booking history for a given user. 