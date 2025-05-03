package com.example.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "likes")
@Data
public class Like {
    @Id
    private String id;
    private String postId;  // Reference to Post
    private String userId;  // User who liked the post
    private Date createdAt;

    public Like(String postId, String userId) {
        this.postId = postId;
        this.userId = userId;
        this.createdAt = new Date();
    }
}
