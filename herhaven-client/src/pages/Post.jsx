import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";// Make sure to import axiosInstance
import PostList from "../components/PostList";
import "../styles/Post.css";
import NewPostModal from "../components/NewPostModal";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem("user")); // adjust if using context or Redux
      const response = await axiosInstance.get("/posts", {
        params: { userId: loggedInUser.id }
      });
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
      await axiosInstance.delete(`/posts/${postId}`); // Using axiosInstance
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]); // Add new post to the top of the list
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="post-page">
      <h1>My Posts</h1>
      <button className="create-post-btn" onClick={() => setIsModalOpen(true)}>
        Create New Post
      </button>
      <PostList posts={posts} onDelete={handleDelete} />

      {/* New Post Modal */}
      <NewPostModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        addNewPost={addNewPost} 
      />
    </div>
  );
};

export default Post;
