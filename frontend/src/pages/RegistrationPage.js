import React, { useState } from 'react';
import dasLogo from '../dasLogo.png';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        alert('Successfully registered!');
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        alert('Registration failed. Check console for details.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Something went wrong.');
    }
  };
  

  return (
    
    <div className="registration-container">
        <img src={dasLogo} className="logo"></img>
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Sign Up for Dastarkhan!</h2>
        <input 
          type="text" 
          name="username" 
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p><a href="/login">Log in</a></p>
    </div>
  );
};

export default RegistrationPage;
