import React, { useState, useEffect } from "react";
import axios from "axios";
import PostList from "../components/PostList";
import NewPostButton from "../components/NewPostButton";
import "../styles/Post.css";
import { BASE_URL } from "../config";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts`); 
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="post-page">
      <h1>My Posts</h1>
      <NewPostButton />
      <PostList posts={posts} onDelete={handleDelete} />
    </div>
  );
};

export default Post;
