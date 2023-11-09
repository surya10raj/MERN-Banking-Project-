// src/App.js

import React, { useState } from 'react';
import emailjs from 'emailjs-com';


function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Data to be sent
    const templateParams = {
      from_name: name,
      from_email: email,
      feedback: feedback
    };

    emailjs.send('service_7wry3bj', 'template_namleha', templateParams, 'piQ8IeUKEhz3_dXL3')
      .then((response) => {
        console.log('Email successfully sent!', response);
        setStatus("Thanks for your feedback!");
        setName("");
        setEmail("");
        setFeedback(""); // Clear fields after successful submission
      })
      .catch((err) => {
        console.error('Email sending failed:', err);
        setStatus("Oops! There was an error submitting your form.");
      });
  };

  return (
    <div className="App">
      <h1>Online Banking Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Feedback:</label>
          <textarea 
            value={feedback} 
            onChange={e => setFeedback(e.target.value)} 
            required
          ></textarea>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {status && <div>{status}</div>}
    </div>
  );
}

export default App;
