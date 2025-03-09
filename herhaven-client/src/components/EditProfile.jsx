import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const { state, setUser } = useAuth();
  const user = state.user;
  const [formData, setFormData] = useState(user || {});
  const navigate = useNavigate();

  // 🔹 Ensure user is logged in before showing the page
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/users/${user.id}`, formData);
      setUser(formData);
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) return null; // Prevent rendering if user is null

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSave}>
        <label>Username</label>
        <input type="text" name="username" value={formData.username || ""} onChange={handleChange} required />

        <label>Display Name</label>
        <input type="text" name="displayName" value={formData.displayName || ""} onChange={handleChange} required />

        <label>Bio</label>
        <textarea name="bio" value={formData.bio || ""} onChange={handleChange}></textarea>

        <label>Location</label>
        <input type="text" name="location" value={formData.location || ""} onChange={handleChange} />

        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
