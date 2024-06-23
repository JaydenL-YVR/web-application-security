// Jayden Liwanag
// June 20, 2024
// ITSC-320-F

import React, { useState } from 'react';
import './LoginForm.css'; // Import your CSS file

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      // Send a POST request to localhost:3333/login
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      // Parse the response
      const data = await response.json();
      // Check if the response is OK and contains a UUID
      if (response.ok && data.uuid) {
        setToken(data.uuid);
        // Clear the error message
      } else {
        setError(data.message || 'Login failed');
      }
      // Catch any errors and display an error message
    } catch (error) {
      // Log the error to the console
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    // Display the login form
    //
    <div className="login-form">
      <h2>Login</h2>



      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        
        
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
