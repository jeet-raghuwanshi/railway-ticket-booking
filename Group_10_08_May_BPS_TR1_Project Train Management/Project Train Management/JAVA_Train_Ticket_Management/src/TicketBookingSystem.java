import java.util.*;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

// Class to represent a Train with seats
class Train {
    int trainNumber;
    String origin;
    String destination;
    LocalTime departureTime;
    int totalSeats;
    List<Integer> availableSeats;

    public Train(int trainNumber, String origin, String destination, String departureTime, int totalSeats) {
        this.trainNumber = trainNumber;
        this.origin = origin;
        this.destination = destination;
        
        this.departureTime = LocalTime.parse(departureTime, DateTimeFormatter.ofPattern("H:mm"));
        this.totalSeats = totalSeats;
        this.availableSeats = new ArrayList<>();
        for (int i = 1; i <= totalSeats; i++) {
            availableSeats.add(i);
        }
    }

    // Returns the number of seats currently available
    public int seatsAvailable() {
        return availableSeats.size();
    }

    // Book the next available seat, or return -1 if none
    public int bookSeat() {
        if (!availableSeats.isEmpty()) {
            return availableSeats.remove(0);
        } else {
            return -1;
        }
    }

    // Cancel a seat (add it back into the pool)
    public void cancelSeat(int seatNumber) {
        availableSeats.add(seatNumber);
        Collections.sort(availableSeats);
    }
}

// Class to represent a User
class User {
    String name;
    String email;
    String password;

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

// Class to represent a Booking
class Booking {
    static int nextId = 1;
    int bookingId;
    String userEmail;
    int trainNumber;
    int seatNumber;

    public Booking(String userEmail, int trainNumber, int seatNumber) {
        this.bookingId = nextId++;
        this.userEmail = userEmail;
        this.trainNumber = trainNumber;
        this.seatNumber = seatNumber;
    }

    // Print booking details
    public void displayInfo() {
        System.out.println("Booking ID: " + bookingId + ", Train: " + trainNumber +
                           ", Seat: " + seatNumber);
    }
}

// Main application class
public class TicketBookingSystem {
    static Scanner scanner = new Scanner(System.in);
    static List<Train> trains = new ArrayList<>();        // List of all trains
    static Map<String, User> users = new HashMap<>();     // Map email->User for login
    static List<Booking> bookings = new ArrayList<>();    // List of all bookings

    public static void main(String[] args) {
        // Initialize some sample trains
        trains.add(new Train(101, "CityA", "CityB", "9:30", 5));
        trains.add(new Train(102, "CityA", "CityC", "12:15", 5));
        trains.add(new Train(103, "CityB", "CityC", "15:45", 5));
        trains.add(new Train(104, "CityC", "CityA", "7:20", 5));
        trains.add(new Train(105, "CityB", "CityA", "18:00", 5));

        System.out.println("=== Welcome to the Train Ticket Booking System ===");
        User currentUser = null;
        while (true) {
            // Main menu
            System.out.println("\nMain Menu:");
            System.out.println("1. Register");
            System.out.println("2. Login");
            System.out.println("3. Exit");
            System.out.print("Enter choice: ");
            String choice = scanner.nextLine();

            if (choice.equals("1")) {
                register();
            } else if (choice.equals("2")) {
                // Attempt login
                currentUser = login();
                if (currentUser != null) {
                    // User is logged in; show user menu
                    while (true) {
                        System.out.println("\n== User Menu ==");
                        System.out.println("1. View Trains by Origin/Destination");
                        System.out.println("2. Book Ticket");
                        System.out.println("3. Cancel Ticket");
                        System.out.println("4. View Booking History");
                        System.out.println("5. Find Trains with Available Seats");
                        System.out.println("6. Logout");
                        System.out.print("Enter choice: ");
                        String userChoice = scanner.nextLine();

                        if (userChoice.equals("1")) {
                            viewTrainsByRoute();
                        } else if (userChoice.equals("2")) {
                            bookTicket(currentUser);
                        } else if (userChoice.equals("3")) {
                            cancelTicket(currentUser);
                        } else if (userChoice.equals("4")) {
                            viewBookingHistory(currentUser);
                        } else if (userChoice.equals("5")) {
                            viewAvailableTrains();
                        } else if (userChoice.equals("6")) {
                            System.out.println("Logging out...");
                            break;
                        } else {
                            System.out.println("Invalid option. Please try again.");
                        }
                    }
                }
            } else if (choice.equals("3")) {
                System.out.println("Exiting system. Goodbye!");
                break;
            } else {
                System.out.println("Invalid input. Please try again.");
            }
        }
    }

    // Registration functionality
    static void register() {
        System.out.println("\n-- Register --");
        System.out.print("Enter name: ");
        String name = scanner.nextLine();
        System.out.print("Enter email: ");
        String email = scanner.nextLine();
        if (users.containsKey(email)) {
            System.out.println("Email already registered. Please login or use another email.");
            return;
        }
        System.out.print("Enter password: ");
        String password = scanner.nextLine();
        users.put(email, new User(name, email, password));
        System.out.println("Registration successful. You can now login.");
    }

    // Login functionality
    static User login() {
        System.out.println("\n-- Login --");
        System.out.print("Enter email: ");
        String email = scanner.nextLine();
        System.out.print("Enter password: ");
        String password = scanner.nextLine();
        if (users.containsKey(email)) {
            User user = users.get(email);
            if (user.password.equals(password)) {
                System.out.println("Login successful. Welcome, " + user.name + "!");
                return user;
            } else {
                System.out.println("Incorrect password.");
                return null;
            }
        } else {
            System.out.println("No user found with that email.");
            return null;
        }
    }

    // View trains filtered by route and sorted by departure time
    static void viewTrainsByRoute() {
        System.out.println("\n-- View Trains (Filter by route) --");
        System.out.print("Enter origin: ");
        String origin = scanner.nextLine();
        System.out.print("Enter destination: ");
        String destination = scanner.nextLine();

        // Filter trains by origin/destination
        List<Train> filtered = new ArrayList<>();
        for (Train t : trains) {
            if (t.origin.equalsIgnoreCase(origin) && t.destination.equalsIgnoreCase(destination)) {
                filtered.add(t);
            }
        }
        if (filtered.isEmpty()) {
            System.out.println("No trains found for the given route.");
            return;
        }
        // Sort by departure time using Collections.sort with a comparator
        Collections.sort(filtered, new Comparator<Train>() {
            public int compare(Train t1, Train t2) {
                return t1.departureTime.compareTo(t2.departureTime);
            }
        });
        System.out.println("Trains from " + origin + " to " + destination + " (sorted by departure time):");
        System.out.printf("%-5s %-15s %-15s %-10s %-5s%n", "No.", "Origin", "Destination", "Departure", "Seats");
        for (Train t : filtered) {
            System.out.printf("%-5d %-15s %-15s %-10s %-5d%n", 
                              t.trainNumber, t.origin, t.destination, t.departureTime.toString(), t.seatsAvailable());
        }
    }

    // Book a ticket for a train
    static void bookTicket(User user) {
        System.out.println("\n-- Book Ticket --");
        System.out.print("Enter train number: ");
        String tnumStr = scanner.nextLine();
        int tnum;
        try {
            tnum = Integer.parseInt(tnumStr);
        } catch (NumberFormatException e) {
            System.out.println("Invalid train number.");
            return;
        }
        Train train = null;
        for (Train t : trains) {
            if (t.trainNumber == tnum) {
                train = t;
                break;
            }
        }
        if (train == null) {
            System.out.println("Train not found.");
            return;
        }
        if (train.seatsAvailable() > 0) {
            int seat = train.bookSeat();
            Booking booking = new Booking(user.email, train.trainNumber, seat);
            bookings.add(booking);
            System.out.println("Booking successful! Details:");
            booking.displayInfo();
        } else {
            System.out.println("Sorry, no seats available on this train.");
        }
    }

    // Cancel a booking
    static void cancelTicket(User user) {
        System.out.println("\n-- Cancel Ticket --");
        // List user's bookings
        List<Booking> userBookings = new ArrayList<>();
        for (Booking b : bookings) {
            if (b.userEmail.equals(user.email)) {
                userBookings.add(b);
            }
        }
        if (userBookings.isEmpty()) {
            System.out.println("You have no bookings.");
            return;
        }
        System.out.println("Your bookings:");
        for (Booking b : userBookings) {
            System.out.println("Booking ID: " + b.bookingId + ", Train: " + b.trainNumber + ", Seat: " + b.seatNumber);
        }
        System.out.print("Enter booking ID to cancel: ");
        String bidStr = scanner.nextLine();
        int bid;
        try {
            bid = Integer.parseInt(bidStr);
        } catch (NumberFormatException e) {
            System.out.println("Invalid booking ID.");
            return;
        }
        Booking toCancel = null;
        for (Booking b : userBookings) {
            if (b.bookingId == bid) {
                toCancel = b;
                break;
            }
        }
        if (toCancel == null) {
            System.out.println("Booking ID not found in your bookings.");
            return;
        }
        // Perform cancellation
        bookings.remove(toCancel);
        // Return the seat to the train
        for (Train t : trains) {
            if (t.trainNumber == toCancel.trainNumber) {
                t.cancelSeat(toCancel.seatNumber);
                break;
            }
        }
        System.out.println("Booking cancelled successfully.");
    }

    // View booking history for the user
    static void viewBookingHistory(User user) {
        System.out.println("\n-- Booking History --");
        boolean hasBooking = false;
        for (Booking b : bookings) {
            if (b.userEmail.equals(user.email)) {
                System.out.println("Booking ID: " + b.bookingId +
                                   ", Train: " + b.trainNumber +
                                   ", Seat: " + b.seatNumber);
                hasBooking = true;
            }
        }
        if (!hasBooking) {
            System.out.println("No bookings found.");
        }
    }

    // List all trains with at least one available seat
    static void viewAvailableTrains() {
        System.out.println("\n-- Trains with Available Seats --");
        boolean any = false;
        for (Train t : trains) {
            if (t.seatsAvailable() > 0) {
                System.out.println("Train " + t.trainNumber + 
                                   " (" + t.origin + "->" + t.destination + 
                                   "), Departs " + t.departureTime.toString() + 
                                   ", Seats Available: " + t.seatsAvailable());
                any = true;
            }
        }
        if (!any) {
            System.out.println("No trains have available seats at the moment.");
            
        }
    }
}
