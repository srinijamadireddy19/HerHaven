package com.example.demo.controller;

import com.example.demo.model.Comment;
import com.example.demo.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable String postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    @PostMapping("/{postId}/{userId}")
    public ResponseEntity<Comment> addComment(@PathVariable String postId, @PathVariable String userId, @RequestBody String content) {
        return ResponseEntity.ok(commentService.addComment(postId, userId, content));
    }

    @DeleteMapping("/{commentId}/{userId}")
    public ResponseEntity<String> deleteComment(@PathVariable String commentId, @PathVariable String userId) {
        commentService.deleteComment(commentId, userId);
        return ResponseEntity.ok("Comment removed successfully");
    }
}
