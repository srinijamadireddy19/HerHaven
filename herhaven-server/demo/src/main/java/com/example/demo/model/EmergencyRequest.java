package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "emergencies")
@Data
public class EmergencyRequest {
    @Id
    private String id;
    private String username;
    private String email;
    private double latitude;
    private double longitude;
    private String timestamp;
    
    public String getMapsLink() {
        if (latitude != 0 && longitude != 0) {
            return "https://www.google.com/maps?q=" + latitude + "," + longitude;
        }
        return "Not provided";
    }
}
