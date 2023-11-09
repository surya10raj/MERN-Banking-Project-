// About.js
import React from 'react';
import "./About.css"; // Import the CSS file for styling

function About() {
  return (
    <div className="about-container">
      <h2>About NexaBank</h2>
      
      <p>
      NexaBank is a leading financial institution committed to providing innovative and secure
        online banking solutions. With a focus on customer satisfaction and cutting-edge technology,
        we aim to make banking convenient and accessible for everyone.
      </p>
    
      <h2>Our Services</h2>
        <ul>
          <li>Online Account Management</li>
          <li>Mobile Banking</li>
          <li>Secure Transactions</li>
          <li>Personal Loans</li>
          <li>Mortgage Services</li>
          <li>Investment Advisory</li>
          <li>Credit Card Services</li>
        
        </ul>
    </div>
  );
}

export default About;
