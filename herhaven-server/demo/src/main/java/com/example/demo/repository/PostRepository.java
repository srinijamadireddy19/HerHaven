package com.example.demo.repository;

import com.example.demo.model.Post;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {
    List<Post> findByUserId(String userId);

}
