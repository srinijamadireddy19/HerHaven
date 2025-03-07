import React from 'react';

export const Step3 = ({ formData, handleChange }) => {
  return (
    <>
      <h2>Step 3: Community Info</h2>

      <label>Interests/Areas of Expertise:</label>
      <div className="checkbox-container">
        <div className="checkbox-group">
          <input type="checkbox" name="interests" value="Health & Wellness" onChange={handleChange} />
          <label>Health & Wellness</label>
        </div>
        <div className="checkbox-group">
          <input type="checkbox" name="interests" value="Career Development" onChange={handleChange} />
          <label>Career Development</label>
        </div>
        <div className="checkbox-group">
          <input type="checkbox" name="interests" value="Entrepreneurship" onChange={handleChange} />
          <label>Entrepreneurship</label>
        </div>
      </div>
      <br></br>
      <label>Role:</label>
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="Mentor">Mentor</option>
        <option value="Mentee">Mentee</option>
        <option value="General Member">General Member</option>
        <option value="Moderator">Moderator</option>
      </select>
    </>
  );
};

export default Step3;
