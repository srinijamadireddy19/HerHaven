import React from 'react'

export const Step4 = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div>
        <h2>Step 4: Security & Privacy</h2>
      <input type="tel" name="phoneNumber" placeholder="Phone Number (optional)" value={formData.phoneNumber} onChange={handleChange} />
      <label className='checkbox-group'>
        <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
        I agree to the Terms & Conditions
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Step4;
