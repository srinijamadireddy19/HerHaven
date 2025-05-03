import React from "react";
import PostCard from "./PostCard";
import "../styles/Post.css";

const PostList = ({ posts, onDelete }) => {
  return (
    <div className="posts-list">
      {posts.length === 0 ? (
        <h3>No posts yet. Start by creating one!</h3>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default PostList;
