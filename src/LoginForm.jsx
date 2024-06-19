import React, { useState } from 'react';

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    // Assuming backend URL is 'http://localhost:5000/login', adjust as necessary
    const url = 'http://localhost:5000/login';  // Replace with your backend URL

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // Assuming the backend returns a token on successful login
      if (response.ok) {
        setToken(data.token); // Assuming you have a function in the parent component to set the token
      } else {
        setError(data.message || 'Login failed'); // Display backend error message if available
      }
    } catch (error) {
      setError('An error occurred. Please try again later.'); // Handle fetch errors
    }
  };

  return (
    <div>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
