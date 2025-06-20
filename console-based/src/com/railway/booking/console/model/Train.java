package com.railway.booking.console.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Train {
    private final int id;
    private final String number;
    private final String name;
    private final String origin;
    private final String destination;
    private final LocalDateTime departureTime;
    private final LocalDateTime arrivalTime;
    private final List<TrainClass> classes;

    public Train(int id, String number, String name, String origin, String destination, LocalDateTime departureTime, LocalDateTime arrivalTime) {
        this.id = id;
        this.number = number;
        this.name = name;
        this.origin = origin;
        this.destination = destination;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.classes = new ArrayList<>();
    }

    public int getId() { return id; }
    public String getNumber() { return number; }
    public String getName() { return name; }
    public String getOrigin() { return origin; }
    public String getDestination() { return destination; }
    public LocalDateTime getDepartureTime() { return departureTime; }
    public List<TrainClass> getClasses() { return classes; }

    public void addTrainClass(TrainClass trainClass) {
        this.classes.add(trainClass);
    }
    
    public int getTotalCapacity() {
        return classes.stream().mapToInt(TrainClass::getTotalSeats).sum();
    }

    @Override
    public String toString() {
        return String.format("Train #%s: %s (%s -> %s, Departs: %s)",
                number, name, origin, destination, departureTime);
    }
} 