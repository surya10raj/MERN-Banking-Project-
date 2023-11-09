// Deposit.js

import React, { useState } from 'react';
import "./Styles.css";

function Deposit() {
  const [amount, setAmount] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || {});
  const [notification, setNotification] = useState('');
  const token = localStorage.getItem('token');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount <= 0 || amount % 50 !== 0) {
      setNotification('Please enter an amount in multiples of 50.');

      return;
    }
    

    try {
      const response = await fetch('http://localhost:5000/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: user.email, amount: parseFloat(amount) })
      });

      if (response.ok) {
        const data = await response.json();
        const updatedUser = data.user;
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setNotification(`Successfully deposited $${amount}`);
        setAmount(0);
      } else {
        setNotification('Deposit failed. Please try again.');

      }
    } catch (err) {
      setNotification('Error during deposit. Please try again.');


    }
  };

  return (
    <div>
      <h2>Deposit</h2>
      <p align="center">Current Balance: ${user.balance}</p>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Amount" value={amount} onChange={handleAmountChange} />
        <button type="submit">Deposit</button>
      </form>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}

export default Deposit;
