package com.example.demo.controller;

import com.example.demo.model.Like;
import com.example.demo.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @GetMapping("/{postId}")
    public ResponseEntity<List<Like>> getLikesByPost(@PathVariable String postId) {
        return ResponseEntity.ok(likeService.getLikesByPostId(postId));
    }

    @PostMapping("/{postId}/{userId}")
    public ResponseEntity<Like> addLike(@PathVariable String postId, @PathVariable String userId) {
        return ResponseEntity.ok(likeService.addLike(postId, userId));
    }

    @DeleteMapping("/{postId}/{userId}")
    public ResponseEntity<String> removeLike(@PathVariable String postId, @PathVariable String userId) {
        likeService.deleteLike(postId, userId);
        return ResponseEntity.ok("Like removed successfully");
    }
}
