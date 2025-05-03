package com.example.demo.service;

import com.example.demo.model.Comment;
import com.example.demo.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getCommentsByPostId(String postId) {
        return commentRepository.findByPostId(postId);
    }

    public Comment addComment(String postId, String userId, String content) {
        Comment comment = new Comment(postId,userId,content);
        return commentRepository.save(comment);
    }
    
    public boolean deleteComment(String commentId, String userId) {
        Optional<Comment> comment = commentRepository.findByIdAndUserId(commentId, userId);
        if (comment.isPresent()) {
            commentRepository.deleteById(commentId);
            return true;
        }
        return false;
    }
    
    public void deleteCommentsByPostId(String postId) {
        commentRepository.deleteByPostId(postId);
    }
    
    
}
