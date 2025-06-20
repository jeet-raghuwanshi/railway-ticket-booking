package com.railway.booking.console.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Booking {
    private static int counter = 0;
    private final int id;
    private final int userId;
    private final int trainId;
    private final int classId;
    private final LocalDate bookingDate;
    private final List<Passenger> passengers;
    private final double totalFare;
    private final String status;

    public Booking(int userId, int trainId, int classId, List<Passenger> passengers, double totalFare) {
        this.id = ++counter;
        this.userId = userId;
        this.trainId = trainId;
        this.classId = classId;
        this.passengers = new ArrayList<>(passengers);
        this.totalFare = totalFare;
        this.bookingDate = LocalDate.now();
        this.status = "CONFIRMED";
    }
    
    public int getId() { return id; }
    public int getUserId() { return userId; }
    public int getTrainId() { return trainId; }
    public int getClassId() { return classId; }
    public List<Passenger> getPassengers() { return passengers; }
    public int getNumberOfPassengers() { return passengers.size(); }

    @Override
    public String toString() {
        return "Booking ID: " + id + ", Date: " + bookingDate + 
               ", Passengers: " + passengers.size() + ", Total Fare: " + totalFare + ", Status: " + status;
    }
} 