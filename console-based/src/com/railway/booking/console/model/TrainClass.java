package com.railway.booking.console.model;

public class TrainClass {
    private final int id;
    private final String name;
    private final int totalSeats;
    private final double fare;

    public TrainClass(int id, String name, int totalSeats, double fare) {
        this.id = id;
        this.name = name;
        this.totalSeats = totalSeats;
        this.fare = fare;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public int getTotalSeats() { return totalSeats; }
    public double getFare() { return fare; }

    @Override
    public String toString() {
        return String.format("Class: %s, Fare: %.2f, Total Seats: %d", name, fare, totalSeats);
    }
} 