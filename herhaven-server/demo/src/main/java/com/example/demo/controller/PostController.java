package com.example.demo.controller;

import com.example.demo.model.Post;
import com.example.demo.model.Comment;
import com.example.demo.model.Like;
import com.example.demo.service.PostService;
import com.example.demo.service.CommentService;
import com.example.demo.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private LikeService likeService;

    // Create a new post
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        Post createdPost = postService.createPost(post);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }



    // Get a post by ID
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable String id) {
        Optional<Post> post = postService.getPostById(id);
        return post.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
public ResponseEntity<Void> deletePost(@PathVariable String id) {
    // Delete all comments associated with the post
    commentService.deleteCommentsByPostId(id);

    // Delete all likes associated with the post
    likeService.deleteLikesByPostId(id);

    // Delete the post itself
    postService.deletePostById(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
}

@PostMapping("/{postId}/comments/{userId}")
public ResponseEntity<Comment> addComment(@PathVariable String postId, @PathVariable String userId, @RequestBody Comment comment) {
    Comment createdComment = commentService.addComment(postId, userId, comment.getContent());
    return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
}


    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable String postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    // ✅ Like a post (Avoid duplicate likes)
    @PostMapping("/{postId}/likes/{userId}")
    public ResponseEntity<?> likePost(@PathVariable String postId, @PathVariable String userId) {
        if (likeService.hasUserLikedPost(postId, userId)) {
            return new ResponseEntity<>("User has already liked this post", HttpStatus.BAD_REQUEST);
        }
        Like like = new Like(postId, userId);
        like.setPostId(postId);
        like.setUserId(userId);
        Like createdLike = likeService.addLike(postId,userId);
        return new ResponseEntity<>(createdLike, HttpStatus.CREATED);
    }

    // Get likes for a post
    @GetMapping("/{postId}/likes")
    public ResponseEntity<List<Like>> getLikesByPostId(@PathVariable String postId) {
        List<Like> likes = likeService.getLikesByPostId(postId);
        return new ResponseEntity<>(likes, HttpStatus.OK);
    }

    // ✅ Remove Like from a Post
    @DeleteMapping("/{postId}/likes/{userId}")
    public ResponseEntity<?> unlikePost(@PathVariable String postId, @PathVariable String userId) {
        if (!likeService.hasUserLikedPost(postId, userId)) {
            return new ResponseEntity<>("User has not liked this post", HttpStatus.BAD_REQUEST);
        }
        likeService.deleteLike(postId, userId);
        return new ResponseEntity<>("Like removed successfully", HttpStatus.OK);
    }

    // ✅ Delete a comment
    @DeleteMapping("/{postId}/comments/{commentId}/{userId}")
    public ResponseEntity<?> deleteComment(@PathVariable String postId, @PathVariable String commentId, @PathVariable String userId) {
        boolean deleted = commentService.deleteComment(commentId, userId);
        if (!deleted) {
            return new ResponseEntity<>("Comment not found or user not authorized", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Comment removed successfully", HttpStatus.OK);
    }

@GetMapping
public ResponseEntity<List<Post>> getPostsByUser(@RequestParam(required = false) String userId) {
    try {
        if (userId != null) {
            return ResponseEntity.ok(postService.getPostsByUserId(userId));
        } else {
            return ResponseEntity.ok(postService.getAllPosts());
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}



}

