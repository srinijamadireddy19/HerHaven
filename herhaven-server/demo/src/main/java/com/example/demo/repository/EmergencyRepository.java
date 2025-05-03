package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.EmergencyRequest;

public interface EmergencyRepository extends MongoRepository<EmergencyRequest, String> {
}
