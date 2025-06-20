package com.railway.booking.console.model;

public class Passenger {
    private final String name;
    private final int age;
    private String seatNumber;

    public Passenger(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }

    @Override
    public String toString() {
        return "Passenger: " + name + " (Age: " + age + "), Seat: " + seatNumber;
    }
} 