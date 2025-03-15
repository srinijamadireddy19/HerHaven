import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Forum.css';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("likes");

  useEffect(() => {
    // Fetch posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on date range
  useEffect(() => {
    let filtered = [...posts];

    const now = new Date();
    if (filter === "today") {
      filtered = filtered.filter((post) => {
        const postDate = new Date(post.date);
        return postDate.toDateString() === now.toDateString();
      });
    } else if (filter === "thisWeek") {
      filtered = filtered.filter((post) => {
        const postDate = new Date(post.date);
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return postDate >= oneWeekAgo;
      });
    } else if (filter === "thisMonth") {
      filtered = filtered.filter((post) => {
        const postDate = new Date(post.date);
        return (
          postDate.getMonth() === now.getMonth() &&
          postDate.getFullYear() === now.getFullYear()
        );
      });
    }

    // Sort posts based on likes (highest to lowest)
    if (sort === "likes") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sort === "date") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredPosts(filtered);
  }, [filter, sort, posts]);

  // Handle like action
  const handleLike = async (id) => {
    const updatedPosts = filteredPosts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setFilteredPosts(updatedPosts);
    try {
      await axios.put(`http://localhost:3000/posts/${id}`, {
        likes: updatedPosts.find((post) => post.id === id).likes,
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Handle comment action (dummy action)
  const handleComment = (id) => {
    console.log(`Commenting on post ${id}`);
  };

  return (
    <div className="forum-container">
      {/* Filter and Sort Controls */}
      <div className="filter-sort-container">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="likes">Most Liked</option>
          <option value="date">Newest First</option>
        </select>
      </div>

      {/* Posts Container */}
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <span className="username">{post.username}</span>
              <span className="date">
                {new Date(post.date).toLocaleDateString()} ({getRelativeTime(post.date)})
              </span>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
            </div>
            <div className="post-actions">
              <button onClick={() => handleLike(post.id)}>
                👍 {post.likes}
              </button>
              <button onClick={() => handleComment(post.id)}>💬 Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper to format the date as "2 days ago", "1 minute ago", etc.
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

export default Forum;
