package com.railway.booking;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

public class TrainSearchHandler implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (!"GET".equals(exchange.getRequestMethod())) {
            sendError(exchange, 405, "Method Not Allowed");
            return;
        }

        Map<String, String> params = queryToMap(exchange.getRequestURI());
        String origin = params.get("origin");
        String destination = params.get("destination");
        // String date = params.get("date"); // The query uses departure_time, so we might need to adjust logic based on a full date.

        if (origin == null || destination == null) {
            sendError(exchange, 400, "Bad Request: Missing origin or destination");
            return;
        }

        try (Connection conn = Database.getConnection()) {
            // Adapted from US_SQL_010
            String sql = "SELECT t.train_id, t.train_number, t.train_name, t.origin, t.destination, t.departure_time, " +
                         "tc.class_id, tc.class_name, tc.fare, " +
                         "(tc.total_seats - COALESCE(SUM(b.number_of_passengers), 0)) AS available_seats " +
                         "FROM Trains t " +
                         "JOIN TrainClasses tc ON t.train_id = tc.train_id " +
                         "LEFT JOIN Bookings b ON tc.class_id = b.class_id AND b.status = 'CONFIRMED' " +
                         "WHERE t.origin = ? AND t.destination = ? " +
                         "GROUP BY t.train_id, tc.class_id " +
                         "HAVING available_seats > 0 " +
                         "ORDER BY t.departure_time, tc.fare";

            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, origin);
                stmt.setString(2, destination);

                ResultSet rs = stmt.executeQuery();

                // Group results by train
                Map<Integer, JSONObject> trains = new HashMap<>();
                while (rs.next()) {
                    int trainId = rs.getInt("train_id");
                    JSONObject trainJson = trains.computeIfAbsent(trainId, id -> {
                        JSONObject t = new JSONObject();
                        t.put("id", trainId);
                        t.put("number", rs.getString("train_number"));
                        t.put("name", rs.getString("train_name"));
                        t.put("origin", rs.getString("origin"));
                        t.put("destination", rs.getString("destination"));
                        t.put("departure", rs.getTimestamp("departure_time").toLocalDateTime().toString());
                        t.put("classes", new JSONArray());
                        return t;
                    });

                    JSONObject classJson = new JSONObject();
                    classJson.put("id", rs.getInt("class_id"));
                    classJson.put("name", rs.getString("class_name"));
                    classJson.put("fare", rs.getBigDecimal("fare"));
                    classJson.put("available", rs.getInt("available_seats"));
                    
                    trainJson.getJSONArray("classes").put(classJson);
                }

                String response = new JSONArray(trains.values()).toString();
                sendResponse(exchange, 200, response);
            }
        } catch (Exception e) {
            e.printStackTrace();
            sendError(exchange, 500, "Internal Server Error");
        }
    }

    private void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, response.getBytes().length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }

    private void sendError(HttpExchange exchange, int statusCode, String message) throws IOException {
        exchange.sendResponseHeaders(statusCode, message.length());
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(message.getBytes());
        }
    }

    private Map<String, String> queryToMap(URI uri) {
        Map<String, String> result = new HashMap<>();
        String query = uri.getQuery();
        if (query == null) {
            return result;
        }
        for (String param : query.split("&")) {
            String[] entry = param.split("=");
            if (entry.length > 1) {
                result.put(entry[0], entry[1]);
            } else {
                result.put(entry[0], "");
            }
        }
        return result;
    }
} 