-- Drop tables if they exist to start with a clean slate
DROP TABLE IF EXISTS Passengers;
DROP TABLE IF EXISTS Bookings;
DROP TABLE IF EXISTS TrainClasses;
DROP TABLE IF EXISTS Trains;
DROP TABLE IF EXISTS Users;

-- Table for Users
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL -- In a real app, this should be hashed
);

-- Table for Trains
CREATE TABLE Trains (
    train_id INT PRIMARY KEY AUTO_INCREMENT,
    train_number VARCHAR(255) NOT NULL,
    train_name VARCHAR(255) NOT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    departure_time TIMESTAMP NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    total_capacity INT NOT NULL
);

-- Table for different classes in a train
CREATE TABLE TrainClasses (
    class_id INT PRIMARY KEY AUTO_INCREMENT,
    train_id INT,
    class_name VARCHAR(50) NOT NULL, -- e.g., 'AC', 'Sleeper', 'First Class'
    total_seats INT NOT NULL,
    fare DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (train_id) REFERENCES Trains(train_id)
);

-- Table for Bookings
CREATE TABLE Bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    train_id INT,
    class_id INT,
    booking_date DATE NOT NULL,
    number_of_passengers INT NOT NULL,
    total_fare DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL, -- e.g., 'CONFIRMED', 'CANCELLED'
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (train_id) REFERENCES Trains(train_id),
    FOREIGN KEY (class_id) REFERENCES TrainClasses(class_id)
);

-- Table for Passengers on a booking
CREATE TABLE Passengers (
    passenger_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    passenger_name VARCHAR(255) NOT NULL,
    age INT,
    seat_number VARCHAR(10),
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);


-- --- SAMPLE DATA ---

-- Users
INSERT INTO Users (name, email, password) VALUES 
('Alice', 'alice@example.com', 'password123'),
('Bob', 'bob@example.com', 'password123');

-- Trains
INSERT INTO Trains (train_number, train_name, origin, destination, departure_time, arrival_time, total_capacity) VALUES
('1202', 'Capital Express', 'New Delhi', 'Mumbai', '2024-08-01 09:00:00', '2024-08-02 11:00:00', 300),
('1305', 'Deccan Queen', 'Mumbai', 'Pune', '2024-08-01 17:10:00', '2024-08-01 20:25:00', 200),
('1610', 'Pune-Delhi Express', 'Pune', 'New Delhi', '2024-08-03 06:00:00', '2024-08-04 09:00:00', 300);

-- Train Classes
-- Capital Express
INSERT INTO TrainClasses (train_id, class_name, total_seats, fare) VALUES
(1, 'Sleeper', 200, 1500.00),
(1, 'AC', 100, 2500.00);
-- Deccan Queen
INSERT INTO TrainClasses (train_id, class_name, total_seats, fare) VALUES
(2, 'Chair Car', 150, 500.00),
(2, 'First Class', 50, 1000.00);
-- Pune-Delhi Express
INSERT INTO TrainClasses (train_id, class_name, total_seats, fare) VALUES
(3, 'Sleeper', 200, 1600.00),
(3, 'AC', 100, 2600.00);


-- Bookings and Passengers (Example)
-- Alice books 2 tickets on Capital Express
INSERT INTO Bookings (user_id, train_id, class_id, booking_date, number_of_passengers, total_fare, status) VALUES
(1, 1, 2, '2024-07-15', 2, 5000.00, 'CONFIRMED');

INSERT INTO Passengers (booking_id, passenger_name, age, seat_number) VALUES
(1, 'Alice', 30, 'A1-21'),
(1, 'Charlie', 32, 'A1-22');

-- Bob books 1 ticket on Deccan Queen
INSERT INTO Bookings (user_id, train_id, class_id, booking_date, number_of_passengers, total_fare, status) VALUES
(2, 2, 1, '2024-07-20', 1, 500.00, 'CONFIRMED');

INSERT INTO Passengers (booking_id, passenger_name, age, seat_number) VALUES
(2, 'Bob', 45, 'C2-10'); 