import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import avatar from '../assets/avatar.png';
import '../styles/Profile.css';
import axiosInstance from "../api/axiosConfig"; // Import axiosInstance

function Profile() {
  const { state } = useAuth();
  const user = state.user;  
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log("User from AuthContext:", user); // Debugging log
    if (!user) {
      navigate("/login");
      return;
    }

    // Using axiosInstance for API call
    axiosInstance.get(`/user/${user.id}`)  // Use relative path
      .then((response) => {
        console.log("Profile Data:", response.data); // Debugging log
        setProfile(response.data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [user, navigate]);

  const handleEmergencyClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const emergencyData = {
          email: profile.email,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().toISOString(),
        };

        try {
          await axiosInstance.post('/emergency', emergencyData);
          alert("Emergency request sent successfully!");
        } catch (error) {
          console.error("Error sending emergency request:", error);
          alert("Failed to send emergency request.");
        }
      }, (error) => {
        console.error("Geolocation error:", error);
        alert("Could not get location.");
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };
  

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <h2>Profile</h2>
        <div className="profile-actions">
          <button className="edit-btn" onClick={() => navigate("/edit-profile")}>
            Edit Profile
          </button>
          <button className="emergency-btn" onClick={handleEmergencyClick}>
            🚨 Emergency Request
          </button>
        </div>
      </div>
      <div className="profile-details">
        <img src={profile.profilePicture || avatar}  className="profile-pic" />
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

    
    </div>
  );
};

export default Profile;
