import React from "react";
import PostCard from "./PostCard";
import "../styles/Post.css";

const PostList = ({ posts, onDelete }) => {
  return (
    <div className="posts-list">
      {posts.length === 0 ? (
        <p>No posts yet. Start by creating one!</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default PostList;
