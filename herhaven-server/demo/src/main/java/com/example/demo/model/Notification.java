package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import java.util.Date;

@Data
@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;
    private String userId;
    private String message;
    private boolean isRead;
    private Date createdAt;


    public Notification(String userId, String message) {
        this.userId = userId;
        this.message = message;
        this.isRead = false;
        this.createdAt = new Date();
    }

    
}
