package com.railway.booking.console.service;

import com.railway.booking.console.model.*;

import java.util.List;

public class BookingService {
    private final InMemoryDatabase db;
    private final TrainService trainService;

    public BookingService(InMemoryDatabase db, TrainService trainService) {
        this.db = db;
        this.trainService = trainService;
    }

    /**
     * Creates a new booking if seats are available.
     * Implements parts of US_Prog_007.
     * @return The created Booking object, or null if booking failed.
     */
    public Booking createBooking(int userId, int trainId, int classId, List<Passenger> passengers) {
        if (db.findUserById(userId) == null) {
            System.err.println("Error: User with ID " + userId + " not found.");
            return null;
        }

        int availableSeats = trainService.getAvailableSeats(classId);
        if (availableSeats < passengers.size()) {
            System.err.println("Error: Not enough seats available. Required: " + passengers.size() + ", Available: " + availableSeats);
            return null;
        }
        
        TrainClass tc = db.findTrainClassById(classId);
        if (tc == null) {
             System.err.println("Error: Invalid class ID: " + classId);
             return null;
        }

        // Allocate seat numbers (simplified)
        for (int i = 0; i < passengers.size(); i++) {
            passengers.get(i).setSeatNumber("B" + (i + 1)); // e.g., B1, B2
        }

        double totalFare = tc.getFare() * passengers.size();
        Booking newBooking = new Booking(userId, trainId, classId, passengers, totalFare);
        db.addBooking(newBooking);
        
        return newBooking;
    }

    /**
     * Retrieves the booking history for a given user.
     * Implements US_Prog_004.
     */
    public List<Booking> getBookingHistory(int userId) {
        if (db.findUserById(userId) == null) {
            System.err.println("Error: User with ID " + userId + " not found.");
            return List.of(); // Return empty list
        }
        return db.findBookingsByUserId(userId);
    }
} 