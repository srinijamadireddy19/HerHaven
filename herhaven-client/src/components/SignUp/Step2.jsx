import React from 'react'

export const Step2 = ({ formData, handleChange }) => {
  return (
    <>
        <h2>Step 2: Tell us About You</h2>
        <label>Photo</label>
        <input type="file" name="profilePicture"  onChange={handleChange} />
        <textarea name="bio" placeholder="Tell Us about Yourself" value={formData.bio} onChange={handleChange}></textarea>
        <input type="text" name="location" placeholder="City/Country" value={formData.location} onChange={handleChange} />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
    </>
  )
}

export default Step2;