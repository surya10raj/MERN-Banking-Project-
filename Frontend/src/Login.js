// Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Styles.css";
import { useAuth } from './AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setNotification('Please fill out all fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setNotification('Successfully logged in!');
        login();
        localStorage.setItem('token', data.token); // Save JWT token to localStorage
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        if (data.user.isActive) {
          navigate('/deposit');
        } else {
          navigate('/');
        }
      } else {
        setNotification(data.error);
        setLoading(false);
      }
    } catch (err) {
      setNotification('Error during login. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {notification && <div className="notification">{notification}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        <button type="submit" disabled={loading}>Login</button>
      </form>
    </div>
  );
}

export default Login;
