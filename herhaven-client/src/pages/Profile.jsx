import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


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

    axios.get(`http://localhost:3000/users/${user.id}`)
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
    <div className="profile-container">
      <h2>Profile</h2>
      <img src={profile.profilePicture || "default-avatar.png"} alt="Profile" className="profile-pic" />
      <p><strong>Full Name:</strong> {profile.fullName}</p>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Bio:</strong> {profile.bio || "No bio provided"}</p>
      <p><strong>Location:</strong> {profile.location || "Not specified"}</p>
      <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
    </div>
  );
}

export default Profile;
