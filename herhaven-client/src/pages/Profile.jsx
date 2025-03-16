import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import avatar from '../assets/avatar.png';
import '../styles/Profile.css'
import { BASE_URL } from "../config";

import axios from "axios";

function Profile() {
  const { state } = useAuth();
  const user = state.user;  // Correct way to access user data
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log("User from AuthContext:", user); // Debugging log
    if (!user) {
      navigate("/login");
      return;
    }

    axios.get(`${BASE_URL}/users/${user.id}`)
      .then((response) => {
        console.log("Profile Data:", response.data); // Debugging log
        setProfile(response.data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [user, navigate]);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <h2>Profile</h2>
        <button className="edit-btn" onClick={() => navigate("/edit-profile")}>
          Edit Profile
        </button>
      </div>
      <div className="profile-details">
        <img src={profile.profilePicture || avatar} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <div className="profile-col">
            <p><strong>Full Name:</strong> {profile.fullName || "Not specified"}</p>
            <p><strong>Username:</strong> {profile.username || "Not specified"}</p>
            <p><strong>Display Name:</strong> {profile.displayName || "Not specified"}</p>
            <p><strong>Email:</strong> {profile.email || "Not specified"}</p>
            <p><strong>Location:</strong> {profile.location || "Not specified"}</p>
            <p><strong>Date of Birth:</strong> {profile.dob || "Not specified"}</p>
          </div>
          <div className="profile-col">
            <p><strong>Bio:</strong> {profile.bio || "No bio provided"}</p>
            <p><strong>Interests:</strong> {profile.interests?.length > 0 ? profile.interests.join(", ") : "No interests specified"}</p>
            <p><strong>Role:</strong> {profile.role || "Not specified"}</p>
            <p><strong>Phone Number:</strong> {profile.phoneNumber || "Not specified"}</p>
            <p><strong>Terms Agreement:</strong> {profile.agreeTerms ? "Agreed" : "Not agreed"}</p>
          </div>
        </div>
      </div>

      {/* User's Posts Section *
      <div className="user-posts">
        <h3>User's Posts</h3>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="post-card">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>*/}
    </div>
  );
};


export default Profile;
