import React, { useState } from "react";
import axiosInstance from "../api/axiosConfig"; // Import axios instance
import "../styles/NewPostModal.css";

const NewPostModal = ({ isOpen, onClose, addNewPost }) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  if (!isOpen) return null; // Don't render the modal if it's not open

  const handleSave = async () => {
    if (!content.trim()) {
      alert("Post content cannot be empty!");
      return;
    }

    try {
      const response = await axiosInstance.post("/posts", {
        content,
        tags: tags.split(",").map(tag => tag.trim()), 
      });

      addNewPost(response.data); // Add new post to the list
      onClose(); // Close modal after saving
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Post</h2>
        <textarea
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="button-group">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;
