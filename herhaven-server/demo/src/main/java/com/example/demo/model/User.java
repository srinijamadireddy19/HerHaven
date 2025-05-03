package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mongodb.lang.Nullable;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String fullName;
    
    @Indexed(unique = true)
    private String username;
    
    private String email;
    private String password;
    private String confirmPassword;
    private String bio;
    private String location;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dob;

    private List<String> interests;
    private String role;
    private String phoneNumber;
    private boolean agreeTerms;
    private boolean verified;

    private String profilePicture;

    
}