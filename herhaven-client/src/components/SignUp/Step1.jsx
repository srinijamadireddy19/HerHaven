import React from 'react'

const Step1 = ({ formData, handleChange }) => {
  return (
    <>
        <div>
            <h2>Basic Information</h2>
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
        </div>
    </>
  )
}

export default Step1