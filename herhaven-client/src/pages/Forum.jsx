import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";
import "../styles/Forum.css";
import { useNavigate } from "react-router-dom";

const Forum = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("likes");

  const [loadingPostIds, setLoadingPostIds] = useState([]); // For disabling button
  const userId = "123"; // Replace with actual logged-in user ID

  useEffect(() => {
    const fetchPostsWithLikes = async () => {
      try {
        const postRes = await axiosInstance.get("/posts");
        const postsWithLikes = await Promise.all(
          postRes.data.map(async (post) => {
            const likeRes = await axiosInstance.get(`/posts/${post.id}/likes`);
            const liked = likeRes.data.some((like) => like.userId === userId);
            return {
              ...post,
              likes: likeRes.data.length,
              likedByUser: liked,
            };
          })
        );
        setPosts(postsWithLikes);
        setFilteredPosts(postsWithLikes);
      } catch (error) {
        console.error("Error fetching posts/likes:", error);
      }
    };

    fetchPostsWithLikes();
  }, []);

  useEffect(() => {
    let filtered = [...posts];
    const now = new Date();

    if (filter === "today") {
      filtered = filtered.filter((post) => new Date(post.date).toDateString() === now.toDateString());
    } else if (filter === "thisWeek") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      filtered = filtered.filter((post) => new Date(post.date) >= oneWeekAgo);
    } else if (filter === "thisMonth") {
      filtered = filtered.filter(
        (post) =>
          new Date(post.date).getMonth() === now.getMonth() &&
          new Date(post.date).getFullYear() === now.getFullYear()
      );
    }

    if (sort === "likes") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sort === "date") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredPosts(filtered);
  }, [filter, sort, posts]);

  const handleLikeToggle = async (postId) => {
    setLoadingPostIds((prev) => [...prev, postId]);

    const post = posts.find((p) => p.id === postId);
    const alreadyLiked = post.likedByUser;

    try {
      if (alreadyLiked) {
        // Unlike
        await axiosInstance.delete(`/posts/${postId}/likes/${userId}`);
      } else {
        // Like
        await axiosInstance.post(`/posts/${postId}/likes/${userId}`);
      }

      // Refetch like count and liked status
      const likeRes = await axiosInstance.get(`/posts/${postId}/likes`);
      const updatedLikes = likeRes.data.length;
      const liked = likeRes.data.some((like) => like.userId === userId);

      const updatedPosts = posts.map((p) =>
        p.id === postId ? { ...p, likes: updatedLikes, likedByUser: liked } : p
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setLoadingPostIds((prev) => prev.filter((id) => id !== postId));
    }
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
          <div
          key={post.id}
          className="post-card"
          onClick={() => navigate(`/post/${post.id}`)}
        >
            <div className="post-header">
              <span className="username">{post.username}</span>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
            </div>
            <div className="post-actions">
              <button
                onClick={() => handleLikeToggle(post.id)}
                disabled={loadingPostIds.includes(post.id)}
              >
                {post.likedByUser ? "👎 Unlike" : "👍 "} {post.likes}
              </button>
              <button>💬 Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
