package com.example.demo.model;

import lombok.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Document(collection = "posts")
@Data
public class Post {
    @Id
    private String id;
    private String userId;
    private String username;
    private String content;
    private List<String> tags;
    
    @CreatedDate
    private Date createdAt;
}

