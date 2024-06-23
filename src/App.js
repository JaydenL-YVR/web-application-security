// Jayden Liwanag
// June 20, 2024
// ITSC-320-F

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import ChuckNorris from './ChuckNorris';
import './App.css'; 

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogout = async () => {
    try {
      // Logout by sending a POST request to localhost:3333/logout
      await fetch('http://localhost:3333/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }

    setToken(null);
  };

  return (
    // Display login form and Chuck Norris fact
    <div className="App">
      <h1>My App</h1>
      {!token ? (
        <LoginForm setToken={setToken} />
      ) : (
        <div>
          <p>You are logged in with token: {token}</p>
          <button onClick={handleLogout}>Logout</button>
          <ChuckNorris token={token} />
        </div>
      )}
    </div>
  );
};

export default App;
