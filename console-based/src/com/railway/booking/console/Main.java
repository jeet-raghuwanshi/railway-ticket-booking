package com.railway.booking.console;

import com.railway.booking.console.model.*;
import com.railway.booking.console.service.BookingService;
import com.railway.booking.console.service.InMemoryDatabase;
import com.railway.booking.console.service.TrainService;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    private static final InMemoryDatabase db = new InMemoryDatabase();
    private static final TrainService trainService = new TrainService(db);
    private static final BookingService bookingService = new BookingService(db, trainService);

    public static void main(String[] args) {
        db.initialize();
        Scanner scanner = new Scanner(System.in);
        System.out.println("Welcome to the Railway Ticket Booking Console Application!");

        while (true) {
            printMenu();
            int choice = getIntInput(scanner, "Enter your choice: ");
            scanner.nextLine(); // consume newline

            switch (choice) {
                case 1:
                    searchForTrains(scanner);
                    break;
                case 2:
                    bookTicket(scanner);
                    break;
                case 3:
                    viewBookingHistory(scanner);
                    break;
                case 4:
                    System.out.println("Thank you for using the application. Goodbye!");
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    private static void printMenu() {
        System.out.println("\n--- Main Menu ---");
        System.out.println("1. Search for Trains and Check Availability");
        System.out.println("2. Book a Ticket");
        System.out.println("3. View My Booking History");
        System.out.println("4. Exit");
    }

    private static void searchForTrains(Scanner scanner) {
        System.out.print("Enter Origin: ");
        String origin = scanner.nextLine();
        System.out.print("Enter Destination: ");
        String destination = scanner.nextLine();

        List<Train> availableTrains = trainService.findAvailableTrains(origin, destination, 1); // Check for at least 1 seat

        if (availableTrains.isEmpty()) {
            System.out.println("No trains found for the given route.");
        } else {
            System.out.println("\n--- Available Trains ---");
            for (Train train : availableTrains) {
                System.out.println(train);
                for (TrainClass tc : train.getClasses()) {
                    int availableSeats = trainService.getAvailableSeats(tc.getId());
                    System.out.printf("  - Class: %s, Fare: %.2f, Available Seats: %d\n", tc.getName(), tc.getFare(), availableSeats);
                }
            }
        }
    }

    private static void bookTicket(Scanner scanner) {
        int userId = getIntInput(scanner, "Enter your User ID: ");
        int trainId = getIntInput(scanner, "Enter the Train ID to book: ");
        int classId = getIntInput(scanner, "Enter the Class ID to book: ");
        int numPassengers = getIntInput(scanner, "How many passengers?: ");
        scanner.nextLine(); // consume newline
        
        List<Passenger> passengers = new ArrayList<>();
        for (int i = 0; i < numPassengers; i++) {
            System.out.printf("Enter name for passenger %d: ", i + 1);
            String name = scanner.nextLine();
            int age = getIntInput(scanner, String.format("Enter age for passenger %d: ", i + 1));
            scanner.nextLine(); // consume newline
            passengers.add(new Passenger(name, age));
        }

        Booking newBooking = bookingService.createBooking(userId, trainId, classId, passengers);

        if (newBooking != null) {
            System.out.println("\n--- Booking Successful! ---");
            System.out.println(newBooking);
            System.out.println("Passengers:");
            for (Passenger p : newBooking.getPassengers()) {
                System.out.println("  - " + p);
            }
        } else {
            System.out.println("\n--- Booking Failed ---");
            System.out.println("Please check the details and try again.");
        }
    }

    private static void viewBookingHistory(Scanner scanner) {
        int userId = getIntInput(scanner, "Enter your User ID to view history: ");
        List<Booking> userBookings = bookingService.getBookingHistory(userId);

        if (userBookings.isEmpty()) {
            System.out.println("No booking history found for User ID " + userId);
        } else {
            System.out.println("\n--- Booking History for User ID " + userId + " ---");
            for (Booking booking : userBookings) {
                Train train = db.findTrainById(booking.getTrainId());
                TrainClass tc = db.findTrainClassById(booking.getClassId());
                String passengerNames = booking.getPassengers().stream()
                                               .map(Passenger::getName)
                                               .collect(Collectors.joining(", "));

                System.out.println("--------------------");
                System.out.println("Booking ID: " + booking.getId());
                System.out.println("Train: " + train.getName() + " (" + train.getNumber() + ")");
                System.out.println("Class: " + tc.getName());
                System.out.println("Passengers: " + passengerNames);
                System.out.println(booking);
            }
        }
    }

    private static int getIntInput(Scanner scanner, String prompt) {
        System.out.print(prompt);
        while (!scanner.hasNextInt()) {
            System.out.print("Invalid input. Please enter a number: ");
            scanner.next();
        }
        return scanner.nextInt();
    }
} 