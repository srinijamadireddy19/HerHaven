import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [activeTab, setActiveTab] = useState("comments");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await axiosInstance.get(`/posts/${id}`);
        setPost(postRes.data);

        const commentRes = await axiosInstance.get(`/posts/${id}/comments`);
        setComments(commentRes.data);

        const likeRes = await axiosInstance.get(`/posts/${id}/likes`);
        setLikes(likeRes.data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  // Default username if none exists
  const username = post.username || "Anonymous";

  return (
    <div className="post-detail-container">
      <div className="post-header">
        <h2>Post</h2> {/* Display the username here */}
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="tab-buttons">
        <button
          className={activeTab === "comments" ? "active" : ""}
          onClick={() => setActiveTab("comments")}
        >
          Comments
        </button>
        <button
          className={activeTab === "likes" ? "active" : ""}
          onClick={() => setActiveTab("likes")}
        >
          Likes
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "comments" && (
          <ul className="comments-list">
            {comments.length ? (
              comments.map((comment) => (
                <li key={comment.id}>{comment.content}</li>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </ul>
        )}
        {activeTab === "likes" && (
          <ul className="likes-list">
            {likes.length ? (
              likes.map((like) => (
                <li key={like.id}>{like.userId} liked this post</li>
              ))
            ) : (
              <p>No likes yet.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
