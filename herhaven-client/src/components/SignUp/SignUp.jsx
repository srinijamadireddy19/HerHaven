import React, { useState } from 'react'
import Step1 from './Step1';
import Step0 from './Step0';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [formData,setFormData] = useState({
        fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
    bio: '',
    location: '',
    dob: '',
    interests: [],
    role: '',
    phoneNumber: '',
    agreeTerms: false
    })
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox' && name === 'interests') {
          setFormData({
            ...formData,
            interests: checked
              ? [...formData.interests, value]
              : formData.interests.filter((interest) => interest !== value),
          });
        } else if (type === 'file') {
          setFormData({ ...formData, [name]: files[0] });
        } else if (type === 'checkbox') {
          setFormData({ ...formData, [name]: checked });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate("/login");
      };

    const renderStep = () => {
        switch (step) {
            case 0: return <Step0 nextStep={nextStep} />;
          case 1: return <Step1 formData={formData} handleChange={handleChange} />;
          case 2: return <Step2 formData={formData} handleChange={handleChange} />;
          case 3: return <Step3 formData={formData} handleChange={handleChange} />;
          case 4: return <Step4 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />;
          default: return null;
        }
      };
    

  return (
    <>
    <div className="signup-container">
      <div className="progress-bar">
        <div style={{ width: `${(step / 4) * 100}%` }} className="progress"></div>
      </div>
      {renderStep()}
      <div className="navigation-buttons">
        {step > 0 && <button onClick={prevStep}>Back</button>}
        {step < 4 && <button onClick={nextStep}>Next</button>}
      </div>
    </div>
    
    </>
  )
}

export default SignUp