package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.EmergencyRequest;
import com.example.demo.repository.EmergencyRepository;
import com.example.demo.service.EmailService;


@RestController
@RequestMapping("/emergency")
@CrossOrigin(origins = "*")
public class EmergencyController {

    @Autowired
    private EmergencyRepository emergencyRepository;

    @Autowired
    private EmailService emailService;

@PostMapping
public ResponseEntity<String> receiveEmergency(@RequestBody EmergencyRequest request) {
    emergencyRepository.save(request);

    // send emergency email
    emailService.sendEmergencyAlert(
        "madireddynija04@gmail.com", // Replace with your admin email
        request.getEmail(),
        request.getMapsLink(),
        request.getTimestamp()
    );

    return ResponseEntity.ok("Emergency request saved and email sent.");
}

}
