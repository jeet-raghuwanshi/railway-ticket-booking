package com.railway.booking;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class BookingHandler implements HttpHandler {

    // Pattern to match /api/booking/history/{userId}
    private static final Pattern historyPattern = Pattern.compile("/api/booking/history/(\\d+)");

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String requestMethod = exchange.getRequestMethod();
        String path = exchange.getRequestURI().getPath();

        Matcher historyMatcher = historyPattern.matcher(path);

        if ("POST".equals(requestMethod) && path.equals("/api/booking")) {
            handleCreateBooking(exchange);
        } else if ("GET".equals(requestMethod) && historyMatcher.matches()) {
            int userId = Integer.parseInt(historyMatcher.group(1));
            handleGetHistory(exchange, userId);
        } else {
            sendError(exchange, 404, "{\"message\": \"Endpoint not found\"}");
        }
    }

    private void handleCreateBooking(HttpExchange exchange) throws IOException {
        String requestBody;
        JSONObject bookingRequest;
        
        try {
            requestBody = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            bookingRequest = new JSONObject(requestBody);
            // Validate required fields
            if (!bookingRequest.has("userId") || !bookingRequest.has("trainId") || !bookingRequest.has("classId") || !bookingRequest.has("passengers")) {
                 sendError(exchange, 400, "{\"message\": \"Bad Request: Missing required fields\"}");
                 return;
            }
        } catch (Exception e) {
            sendError(exchange, 400, "{\"message\": \"Bad Request: Invalid JSON format\"}");
            return;
        }
        
        int userId = bookingRequest.getInt("userId");
        int trainId = bookingRequest.getInt("trainId");
        int classId = bookingRequest.getInt("classId");
        JSONArray passengers = bookingRequest.getJSONArray("passengers");

        Connection conn = null;
        try {
            conn = Database.getConnection();
            conn.setAutoCommit(false); // Start transaction

            if (!isSeatAvailable(conn, classId, passengers.length())) {
                conn.rollback();
                sendError(exchange, 409, "{\"message\": \"Not enough seats available\"}");
                return;
            }
            
            java.math.BigDecimal totalFare = calculateTotalFare(conn, classId, passengers.length());

            String bookingSql = "INSERT INTO Bookings (user_id, train_id, class_id, booking_date, number_of_passengers, total_fare, status) VALUES (?, ?, ?, CURDATE(), ?, ?, 'CONFIRMED')";
            int bookingId;
            try (PreparedStatement stmt = conn.prepareStatement(bookingSql, Statement.RETURN_GENERATED_KEYS)) {
                stmt.setInt(1, userId);
                stmt.setInt(2, trainId);
                stmt.setInt(3, classId);
                stmt.setInt(4, passengers.length());
                stmt.setBigDecimal(5, totalFare);
                
                stmt.executeUpdate();
                try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        bookingId = generatedKeys.getInt(1);
                    } else {
                        throw new SQLException("Creating booking failed, no ID obtained.");
                    }
                }
            }

            allocateSeatsAndInsertPassengers(conn, bookingId, passengers);
            conn.commit();
            
            String response = "{\"message\": \"Booking successful!\", \"bookingId\": " + bookingId + "}";
            sendResponse(exchange, 201, response);

        } catch (Exception e) {
            e.printStackTrace();
            if (conn != null) try { conn.rollback(); } catch (SQLException ex) { ex.printStackTrace(); }
            sendError(exchange, 500, "{\"message\": \"Internal Server Error during booking process\"}");
        } finally {
            if (conn != null) try { conn.close(); } catch (SQLException e) { e.printStackTrace(); }
        }
    }
    
    private boolean isSeatAvailable(Connection conn, int classId, int numPassengers) throws SQLException {
        String sql = "SELECT (tc.total_seats - COALESCE(SUM(b.number_of_passengers), 0)) AS available_seats " +
                     "FROM TrainClasses tc " +
                     "LEFT JOIN Bookings b ON tc.class_id = b.class_id AND b.status = 'CONFIRMED' " +
                     "WHERE tc.class_id = ? GROUP BY tc.class_id";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, classId);
            ResultSet rs = stmt.executeQuery();
            return rs.next() && rs.getInt("available_seats") >= numPassengers;
        }
    }

    private java.math.BigDecimal calculateTotalFare(Connection conn, int classId, int numPassengers) throws SQLException {
        String sql = "SELECT fare FROM TrainClasses WHERE class_id = ?";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, classId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getBigDecimal("fare").multiply(new java.math.BigDecimal(numPassengers));
            }
            throw new SQLException("Could not determine fare for class ID: " + classId);
        }
    }
    
    private void allocateSeatsAndInsertPassengers(Connection conn, int bookingId, JSONArray passengers) throws SQLException {
        String sql = "INSERT INTO Passengers (booking_id, passenger_name, age, seat_number) VALUES (?, ?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            for (int i = 0; i < passengers.length(); i++) {
                JSONObject passenger = passengers.getJSONObject(i);
                stmt.setInt(1, bookingId);
                stmt.setString(2, passenger.getString("name"));
                stmt.setInt(3, passenger.optInt("age"));
                stmt.setString(4, "B" + bookingId + "-" + (i + 1)); 
                stmt.addBatch();
            }
            stmt.executeBatch();
        }
    }

    private void handleGetHistory(HttpExchange exchange, int userId) throws IOException {
        String sql = "SELECT b.booking_id, b.booking_date, t.train_name, t.train_number, tc.class_name, b.status, b.total_fare, " +
                     "(SELECT GROUP_CONCAT(p.passenger_name SEPARATOR ', ') FROM Passengers p WHERE p.booking_id = b.booking_id) as passengers " +
                     "FROM Bookings b " +
                     "JOIN Trains t ON b.train_id = t.train_id " +
                     "JOIN TrainClasses tc ON b.class_id = tc.class_id " +
                     "WHERE b.user_id = ? ORDER BY b.booking_date DESC";

        try (Connection conn = Database.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();
            JSONArray history = new JSONArray();
            while (rs.next()) {
                JSONObject b = new JSONObject();
                b.put("bookingId", rs.getInt("booking_id"));
                b.put("bookingDate", rs.getDate("booking_date").toString());
                b.put("trainName", rs.getString("train_name"));
                b.put("trainNumber", rs.getString("train_number"));
                b.put("className", rs.getString("class_name"));
                b.put("status", rs.getString("status"));
                b.put("totalFare", rs.getBigDecimal("total_fare"));
                b.put("passengers", rs.getString("passengers"));
                history.put(b);
            }
            sendResponse(exchange, 200, history.toString());
        } catch (Exception e) {
            e.printStackTrace();
            sendError(exchange, 500, "{\"message\": \"Internal Server Error fetching history\"}");
        }
    }

    private void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, response.getBytes(StandardCharsets.UTF_8).length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes(StandardCharsets.UTF_8));
        }
    }

    private void sendError(HttpExchange exchange, int statusCode, String message) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, message.getBytes(StandardCharsets.UTF_8).length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(message.getBytes(StandardCharsets.UTF_8));
        }
    }
} 