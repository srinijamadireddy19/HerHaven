package com.example.demo.repository;

import com.example.demo.model.Discussion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscussionRepository extends MongoRepository<Discussion, String> {

    // Find discussions by userId
    List<Discussion> findByUserId(String userId);

    // Find discussions by topic (case-insensitive)
    List<Discussion> findByTopicIgnoreCase(String topic);
}
