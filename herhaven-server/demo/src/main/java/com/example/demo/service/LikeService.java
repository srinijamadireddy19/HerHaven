package com.example.demo.service;

import com.example.demo.model.Like;
import com.example.demo.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    public List<Like> getLikesByPostId(String postId) {
        return likeRepository.findByPostId(postId);
    }

    public Like addLike(String postId, String userId) {
        Optional<Like> existingLike = likeRepository.findByPostIdAndUserId(postId, userId);
        if (existingLike.isPresent()) {
            throw new RuntimeException("User has already liked this post");
        }
        Like like = new Like(postId, userId);
        return likeRepository.save(like);
    }

    public boolean hasUserLikedPost(String postId, String userId) {
        return likeRepository.findByPostIdAndUserId(postId, userId).isPresent();
    }

    public void deleteLike(String postId, String userId) {
        likeRepository.deleteByPostId(postId, userId);
    }
    public void deleteLikesByPostId(String postId) {
        likeRepository.deleteLikesByPostId(postId);
    }
}
