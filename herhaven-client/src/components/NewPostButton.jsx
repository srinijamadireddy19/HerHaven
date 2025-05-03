import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Post.css";

const NewPostButton = () => {
  const navigate = useNavigate();

  const handleNewPost = () => {
    navigate("/new-post");
  };

  return (
    <button onClick={handleNewPost} className="new-post-btn">
      ➕ Create New Post
    </button>
  );
};

export default NewPostButton;
