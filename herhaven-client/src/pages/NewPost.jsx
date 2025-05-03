import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig"; // Centralized Axios instance
import "../styles/Post.css";

const NewPost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({ content: "", tags: "" });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!post.content.trim()) {
      alert("Post content cannot be empty!");
      return;
    }

    const newPost = {
      content: post.content.trim(),
      tags: post.tags ? post.tags.split(",").map((tag) => tag.trim()) : [],
      date: new Date().toISOString(),
      likes: 0, // Initialize likes to 0
    };

    try {
      await axiosInstance.post("/posts", newPost);
      alert("Post saved successfully!");
      navigate("/forum"); // Redirect to forum after saving
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post. Please try again.");
    }
  };

  return (
    <div className="new-post-container">
      <h2>Create New Post</h2>
      <textarea
        name="content"
        placeholder="Write your post..."
        value={post.content}
        onChange={handleChange}
        required
        aria-label="Post content"
      ></textarea>

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma-separated)"
        value={post.tags}
        onChange={handleChange}
        aria-label="Post tags"
      />

      <div className="button-group">
        <button onClick={handleSave}>Save</button>
        <button onClick={() => navigate("/forum")}>Cancel</button>
      </div>
    </div>
  );
};

export default NewPost;
