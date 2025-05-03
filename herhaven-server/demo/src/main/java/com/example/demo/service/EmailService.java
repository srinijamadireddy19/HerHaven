package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String username) {
        String body = String.format(
            "Hello %s,\n\nThank you for registering with HerHaven.\n\nWe’re excited to have you on board!\n\nBest regards,\nHerHaven Team",
            username
        );

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    public void sendEmergencyAlert(String toEmail, String username, String mapsLink, String timestamp) {
        String subject = "🚨 Emergency Alert!";
        String body = String.format(
            "An emergency request has been triggered by user: %s\n\n" +
            " Location: %s\n Time: %s\n\n" +
            "Please take immediate action.\n\n- HerHaven Emergency System",
            username, mapsLink, timestamp
        );
    
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
    
}

