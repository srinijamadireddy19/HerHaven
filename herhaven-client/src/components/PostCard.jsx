import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Post.css";

const PostCard = ({ post, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete(post.id);
    }
  };

  const handlePostClick = () => {
    navigate(`/post/${post.id}`);
  };

  // Helper for relative time
  const getRelativeTime = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diff = now - postDate;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days !== 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  };

  return (
    <div className="post-card">
      <div className="post-info" onClick={handlePostClick}>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)}...</p>
        <span className="date">Posted {getRelativeTime(post.date)}</span>
      </div>
      <button onClick={handleDelete} className="delete-btn">
        🗑️ Delete
      </button>
    </div>
  );
};

export default PostCard;
