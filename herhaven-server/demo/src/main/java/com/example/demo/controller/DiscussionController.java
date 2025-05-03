package com.example.demo.controller;

import com.example.demo.model.Discussion;
import com.example.demo.service.DiscussionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/discussions")
public class DiscussionController {

    @Autowired
    private DiscussionService discussionService;

    // Create a new discussion
    @PostMapping
    public ResponseEntity<Discussion> createDiscussion(@RequestParam String userId, @RequestParam String topic) {
        Discussion discussion = discussionService.createDiscussion(userId, topic);
        return new ResponseEntity<>(discussion, HttpStatus.CREATED);
    }

    // Add a post to a discussion
    @PutMapping("/{discussionId}/addPost/{postId}")
    public ResponseEntity<Discussion> addPostToDiscussion(
            @PathVariable String discussionId, @PathVariable String postId) {
        Discussion updatedDiscussion = discussionService.addPostToDiscussion(discussionId, postId);
        if (updatedDiscussion != null) {
            return new ResponseEntity<>(updatedDiscussion, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Get all discussions by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Discussion>> getDiscussionsByUserId(@PathVariable String userId) {
        List<Discussion> discussions = discussionService.getDiscussionsByUserId(userId);
        return new ResponseEntity<>(discussions, HttpStatus.OK);
    }

    // Get discussions by topic
    @GetMapping("/topic/{topic}")
    public ResponseEntity<List<Discussion>> getDiscussionsByTopic(@PathVariable String topic) {
        List<Discussion> discussions = discussionService.getDiscussionsByTopic(topic);
        return new ResponseEntity<>(discussions, HttpStatus.OK);
    }

    // Get a specific discussion by ID
    @GetMapping("/{id}")
    public ResponseEntity<Discussion> getDiscussionById(@PathVariable String id) {
        Optional<Discussion> discussion = discussionService.getDiscussionById(id);
        return discussion.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Delete a discussion
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiscussion(@PathVariable String id) {
        discussionService.deleteDiscussion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
