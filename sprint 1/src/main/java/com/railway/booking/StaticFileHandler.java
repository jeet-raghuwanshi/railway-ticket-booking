package com.railway.booking;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class StaticFileHandler implements HttpHandler {

    private final String webappDirectory;

    public StaticFileHandler(String webappDirectory) {
        this.webappDirectory = webappDirectory;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String requestPath = exchange.getRequestURI().getPath();
        if (requestPath.equals("/") || requestPath.isEmpty()) {
            requestPath = "/index.html";
        }

        // Prevent directory traversal attacks
        if (requestPath.contains("..")) {
            sendError(exchange, 400, "Bad Request");
            return;
        }

        Path filePath = Paths.get(webappDirectory, requestPath).toAbsolutePath();
        File file = filePath.toFile();

        if (file.exists() && !file.isDirectory()) {
            exchange.sendResponseHeaders(200, file.length());
            try (OutputStream os = exchange.getResponseBody()) {
                Files.copy(filePath, os);
            }
        } else {
            sendError(exchange, 404, "Not Found");
        }
    }

    private String getMimeType(String filePath) {
        if (filePath.endsWith(".html")) return "text/html";
        if (filePath.endsWith(".css")) return "text/css";
        if (filePath.endsWith(".js")) return "application/javascript";
        return "application/octet-stream";
    }

    private void sendError(HttpExchange exchange, int statusCode, String message) throws IOException {
        exchange.sendResponseHeaders(statusCode, message.length());
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(message.getBytes());
        }
    }
} 