// Register.js

import React, { useState } from 'react';
import "./Register.css";
import { useAuth } from './AuthContext'; 
import { useNavigate } from 'react-router-dom'; 

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    balance: 100,
    isActive: false 
  });

  const [notification, setNotification] = useState('');
  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.age || !formData.gender) {
      setNotification('Please fill out all fields.');
      return;
    }

    if (formData.password.length < 6) {
      setNotification('Password should be at least 6 characters.');
      return;
    }

    if (isNaN(formData.age) || formData.age < 18 || formData.age > 100) {
      setNotification('Please provide a valid age between 18 and 100.');
      return;
    }

    // Set isActive to true if the user is above 18 years old
    const isActive = formData.age >= 18;

    // Add isActive property to formData
    const userData = { ...formData, isActive };

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Network response was not ok');
      }

      const data = await response.json();
      
      if(data.error) {
        setNotification(data.error);
    } else {
        console.log('User Registered:', data.user);
        setNotification('Successfully created an account!');
        
        // Storing the registered user's data in localStorage
        localStorage.setItem('currentUser', JSON.stringify(data.user));
    
        login(); 
        navigate('/deposit'); 
    }
    
    } catch (error) {
      console.error('Error:', error.message);
      setNotification('Failed to register. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {notification && <div className="notification">{notification}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} />
        <select name="gender" value={formData.gender} onChange={handleInputChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
