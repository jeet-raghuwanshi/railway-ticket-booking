package com.railway.booking.console.service;

import com.railway.booking.console.model.Booking;
import com.railway.booking.console.model.Train;
import com.railway.booking.console.model.TrainClass;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class TrainService {
    private final InMemoryDatabase db;

    public TrainService(InMemoryDatabase db) {
        this.db = db;
    }

    /**
     * Finds trains with available seats for a given origin and destination.
     * Implements US_Prog_006.
     */
    public List<Train> findAvailableTrains(String origin, String destination, int requiredSeats) {
        List<Train> allTrains = db.getAllTrains();
        List<Booking> allBookings = db.getAllBookings();

        // Calculate currently booked seats for each train class
        Map<Integer, Integer> bookedSeatsByClass = allBookings.stream()
                .collect(Collectors.groupingBy(Booking::getClassId, Collectors.summingInt(Booking::getNumberOfPassengers)));

        // Filter trains by origin, destination, and seat availability
        return allTrains.stream()
                .filter(train -> train.getOrigin().equalsIgnoreCase(origin) && train.getDestination().equalsIgnoreCase(destination))
                .filter(train -> {
                    for (TrainClass tc : train.getClasses()) {
                        int bookedSeats = bookedSeatsByClass.getOrDefault(tc.getId(), 0);
                        int availableSeats = tc.getTotalSeats() - bookedSeats;
                        if (availableSeats >= requiredSeats) {
                            return true; // Train is available if at least one class has enough seats
                        }
                    }
                    return false;
                })
                .sorted(Comparator.comparing(Train::getDepartureTime)) // Implements US_Prog_005
                .collect(Collectors.toList());
    }

    /**
     * Calculates the number of available seats for a specific train class.
     */
    public int getAvailableSeats(int classId) {
        TrainClass tc = db.findTrainClassById(classId);
        if (tc == null) return 0;

        int bookedSeats = db.getAllBookings().stream()
                .filter(b -> b.getClassId() == classId)
                .mapToInt(Booking::getNumberOfPassengers)
                .sum();
        
        return tc.getTotalSeats() - bookedSeats;
    }
} 