package com.example.demo.repository;

import com.example.demo.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByPostId(String postId);
    Optional<Comment> findByIdAndUserId(String id, String userId);
    //void deleteByIdAndUserId(String id, String userId);
    void deleteByPostId(String postId);
}
