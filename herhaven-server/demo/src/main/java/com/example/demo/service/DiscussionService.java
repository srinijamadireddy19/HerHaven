package com.example.demo.service;

import com.example.demo.model.Discussion;
import com.example.demo.repository.DiscussionRepository;
import com.example.demo.repository.PostRepository;
import com.example.demo.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DiscussionService {

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private PostRepository postRepository;

    // Create a new discussion
    public Discussion createDiscussion(String userId, String topic) {
        Discussion discussion = new Discussion();
        discussion.setUserId(userId);
        discussion.setTopic(topic);
        discussion.setPostIds(new ArrayList<>());
        discussion.setCreatedAt(new Date());

        return discussionRepository.save(discussion);
    }

    // Get all discussions created by a user
    public List<Discussion> getDiscussionsByUserId(String userId) {
        return discussionRepository.findByUserId(userId);
    }

    // Get discussions by topic
    public List<Discussion> getDiscussionsByTopic(String topic) {
        return discussionRepository.findByTopicIgnoreCase(topic);
    }

    // Get a specific discussion by ID
    public Optional<Discussion> getDiscussionById(String id) {
        return discussionRepository.findById(id);
    }

    // Delete a discussion
    public void deleteDiscussion(String id) {
        discussionRepository.deleteById(id);
    }

    @Autowired
private NotificationService notificationService;

public Discussion addPostToDiscussion(String discussionId, String postId) {
    Optional<Discussion> discussionOptional = discussionRepository.findById(discussionId);
    Optional<Post> postOptional = postRepository.findById(postId);

    if (discussionOptional.isPresent() && postOptional.isPresent()) {
        Discussion discussion = discussionOptional.get();
        if (!discussion.getPostIds().contains(postId)) {
            discussion.getPostIds().add(postId);
            discussionRepository.save(discussion);

            // Send notification to the discussion owner
            String message = "New post added to your discussion: '" + discussion.getTopic() + "'";
            notificationService.createNotification(discussion.getUserId(), message);
        }

        return discussion;
    }
    return null;
}
}
