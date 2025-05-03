package com.example.demo.controller;

import com.example.demo.exception.ErrorResponse;
import com.example.demo.model.User;
import com.example.demo.service.EmailService;
import com.example.demo.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final EmailService emailService; // Keep it if you use it in other function
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }

    // User registration with email verification
    @PostMapping("/register")
    public ResponseEntity<Object> registerUser( // Changed to ResponseEntity<Object>
            @RequestPart("user") String userJson, // JSON Data
            @RequestParam("file") MultipartFile file // Profile Picture
    ) {
        try {
            // Parse the JSON string into a User object
            ObjectMapper objectMapper = new ObjectMapper();
            User user = objectMapper.readValue(userJson, User.class);

            // Send email for verification
            String subject = "Welcome to Our Platform!";
            String body = "Hello " + user.getFullName() + ",\n\nThank you for registering with us. "
                    + "Please verify your email using the following link:\n\n"
                    + "http://localhost:8080/user/verify?email=" + user.getEmail();
            emailService.sendEmail(user.getEmail(), subject, body);

            // Log user details
            logger.info("Received User Registration Request: ");
            logger.info("User Name: {}", user.getFullName());
            logger.info("User Email: {}", user.getEmail());
            logger.info("Uploaded File: {}", file.getOriginalFilename());

            User savedUser = userService.saveFile(user, file);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            logger.error("Error during registration: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to register user", true));
        }
    }

    // Email verification
    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam String email) {
         try{
            boolean verified = userService.verifyUser(email);
            return verified
                    ? ResponseEntity.ok("Your email has been successfully verified!")
                    : ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or already verified email!");
        } catch (Exception e) {
            logger.error("Error during registration: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during verify user.");
        }

    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        try{
            return ResponseEntity.ok(userService.getAllUsers());
        } catch (Exception e) {
            logger.error("Error during registration: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
         try{
            Optional<User> user = userService.getUserById(id);
            return user.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Error during registration: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Update user details
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            logger.error("Failed to update user: ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Failed to update user", true));
        }
    }

    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully!");
        } catch (Exception e) {
            logger.error("Failed to delete user: ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to delete user: " + e.getMessage());
        }
    }

    @PostMapping("/login") // Changed to POST
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        try {
            String username = credentials.get("username");
            String password = credentials.get("password");
            Optional<User> userOptional = userService.findByUsername(username);

            if (userOptional.isPresent()) {
                User user = userOptional.get();

                if (Objects.equals(user.getPassword(), password)) {
                    return ResponseEntity.ok(user);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body("Incorrect password");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found");
            }
        } catch (Exception e) {
            logger.error("loginUser catch block error",e);
                 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during login.");
        }
    }
    
}
