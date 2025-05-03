package com.example.demo.repository;

import com.example.demo.model.Like;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends MongoRepository<Like, String> {
    List<Like> findByPostId(String postId);
    Optional<Like> findByPostIdAndUserId(String postId, String userId);
    void deleteByPostId(String postId, String userId);
	void deleteLikesByPostId(String postId);
}
