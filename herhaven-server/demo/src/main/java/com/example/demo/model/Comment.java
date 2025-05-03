package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import java.util.Date;

@Document(collection = "comments")
@Data
public class Comment {
    @Id
    private String id;
    private String postId;  // Reference to Post
    private String userId;
    private String content;
    private Date createdAt;

    public Comment(String postId, String userId, String content) {
        this.postId = postId;
        this.userId = userId;
        this.content = content;
        this.createdAt = new Date();
    }
}
