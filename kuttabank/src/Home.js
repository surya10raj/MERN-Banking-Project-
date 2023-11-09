// Home.js
import React from 'react';
import "./Home.css";
import bankImage from './banking.png'; // Adjust the path to the image accordingly

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to NexaBank</h1>
        <p>Your trustworthy online banking platform. <b>Each user can get free flex from Amman Digital after create a account @limited offer</b></p>
       

        <div className="bank-info">
          <table>
          <th>About NexaBank</th>
          <tr>NexaBank is committed to providing reliable and secure online banking services to our customers. With a focus on innovation and customer satisfaction, we strive to make your banking experience seamless and convenient.</tr>

          <th>Mission Statement</th>
          <tr>Our mission is to empower individuals and businesses by providing accessible and efficient financial solutions while maintaining the highest standards of security and integrity.</tr>
          </table></div>
      </div>
      <div className="image">
      <img src={bankImage}  alt="Bank Illustration" />
      </div>
    </div>
  );
}

export default Home;
