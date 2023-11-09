  // CustomerData.js

  import React, { useState, useEffect } from 'react';
  import "./customer.css";
  import { useAuth } from './AuthContext';

  function CustomerData() {
    const [userData, setUserData] = useState([]); // Initialize with an empty array
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:5000/admin/users', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
          }

          const users = await response.json();
          const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Check if currentUser exists before filtering user data
const currentUserData = currentUser ? users.filter(user => user.email === currentUser.email) : [];

setUserData(isAuthenticated ? currentUserData : []);

        } catch (error) {
          console.error("Error fetching user data from API:", error.message);
        }
      };

      fetchUserData();
    }, [isAuthenticated]);

    return (
      <div className="data-container">
        <h2>Customer Data</h2>
        {isAuthenticated ? (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                  <td>${user.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Unauthorized access. Redirecting to login.</p>
        )}
      </div>
    );
  }

  export default CustomerData;
