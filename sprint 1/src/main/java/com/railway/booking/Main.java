package com.railway.booking;

import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.concurrent.Executors;

public class Main {

    private static final String DB_URL = "jdbc:h2:mem:railway;DB_CLOSE_DELAY=-1";
    private static final String DB_USER = "sa";
    private static final String DB_PASSWORD = "";

    public static void main(String[] args) throws Exception {
        // 1. Initialize Database
        setupDatabase();

        // 2. Start HTTP Server
        startServer();
    }

    private static void setupDatabase() {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
             Statement stmt = conn.createStatement()) {
            
            System.out.println("Connected to in-memory H2 database.");
            
            // Read and execute the schema.sql file
            String schemaSql = new String(Files.readAllBytes(Paths.get("db/schema.sql")));
            
            // Split statements by semicolon, but be careful of semicolons inside strings
            // For this simple case, we assume no complex SQL with semicolons in strings.
            for (String sql : schemaSql.split(";(?=(?:[^\'"]*[\'"][^\'"]*[\'"])*[^\'"]*$)")) {
                if (!sql.trim().isEmpty()) {
                    stmt.execute(sql);
                }
            }
            
            System.out.println("Database schema and data initialized successfully.");
            
        } catch (Exception e) {
            System.err.println("Database initialization failed.");
            e.printStackTrace();
            // Exit if DB setup fails
            System.exit(1);
        }
    }

    private static void startServer() throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        System.out.println("Server started on port 8080.");

        // --- Context for API handlers ---
        server.createContext("/api/trains/search", new TrainSearchHandler());
        server.createContext("/api/booking/", new BookingHandler());
        
        // --- Context for static file serving ---
        server.createContext("/", new StaticFileHandler("ui"));
        
        server.setExecutor(Executors.newCachedThreadPool());
        server.start();
    }
} 