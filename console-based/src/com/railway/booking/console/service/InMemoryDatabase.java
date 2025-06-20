package com.railway.booking.console.service;

import com.railway.booking.console.model.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class InMemoryDatabase {
    private final List<User> users = new ArrayList<>();
    private final List<Train> trains = new ArrayList<>();
    private final List<Booking> bookings = new ArrayList<>();

    public void initialize() {
        // Create Users
        User alice = new User(1, "Alice", "alice@example.com");
        User bob = new User(2, "Bob", "bob@example.com");
        users.add(alice);
        users.add(bob);

        // Create Trains and TrainClasses
        Train train1 = new Train(1, "1202", "Capital Express", "New Delhi", "Mumbai",
                LocalDateTime.of(2024, 8, 1, 9, 0),
                LocalDateTime.of(2024, 8, 2, 11, 0));
        train1.addTrainClass(new TrainClass(1, "Sleeper", 200, 1500.00));
        train1.addTrainClass(new TrainClass(2, "AC", 100, 2500.00));
        trains.add(train1);

        Train train2 = new Train(2, "1305", "Deccan Queen", "Mumbai", "Pune",
                LocalDateTime.of(2024, 8, 1, 17, 10),
                LocalDateTime.of(2024, 8, 1, 20, 25));
        train2.addTrainClass(new TrainClass(3, "Chair Car", 150, 500.00));
        train2.addTrainClass(new TrainClass(4, "First Class", 50, 1000.00));
        trains.add(train2);
        
        Train train3 = new Train(3, "1610", "Pune-Delhi Express", "Pune", "New Delhi",
                LocalDateTime.of(2024, 8, 3, 6, 0),
                LocalDateTime.of(2024, 8, 4, 9, 0));
        train3.addTrainClass(new TrainClass(5, "Sleeper", 200, 1600.00));
        train3.addTrainClass(new TrainClass(6, "AC", 100, 2600.00));
        trains.add(train3);

        // Create sample Bookings
        List<Passenger> alicePassengers = new ArrayList<>();
        alicePassengers.add(new Passenger("Alice", 30));
        alicePassengers.add(new Passenger("Charlie", 32));
        Booking booking1 = new Booking(alice.getId(), train1.getId(), 2, alicePassengers, 5000.00);
        bookings.add(booking1);

        List<Passenger> bobPassengers = new ArrayList<>();
        bobPassengers.add(new Passenger("Bob", 45));
        Booking booking2 = new Booking(bob.getId(), train2.getId(), 3, bobPassengers, 500.00);
        bookings.add(booking2);
        
        System.out.println("In-memory database initialized with sample data.");
    }

    // --- Data Access Methods ---

    public List<Train> getAllTrains() {
        return new ArrayList<>(trains);
    }
    
    public List<Booking> getAllBookings() {
        return new ArrayList<>(bookings);
    }

    public Train findTrainById(int id) {
        return trains.stream().filter(t -> t.getId() == id).findFirst().orElse(null);
    }

    public TrainClass findTrainClassById(int classId) {
        for (Train train : trains) {
            for (TrainClass tc : train.getClasses()) {
                if (tc.getId() == classId) {
                    return tc;
                }
            }
        }
        return null;
    }
    
    public User findUserById(int id) {
        return users.stream().filter(u -> u.getId() == id).findFirst().orElse(null);
    }
    
    public List<Booking> findBookingsByUserId(int userId) {
        return bookings.stream()
                .filter(b -> b.getUserId() == userId)
                .collect(Collectors.toList());
    }

    public void addBooking(Booking booking) {
        this.bookings.add(booking);
    }
} 