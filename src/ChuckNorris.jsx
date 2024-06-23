// Jayden Liwanag
// June 20, 2024
// ITSC-320-F

import React, { useState, useEffect } from 'react';
import './ChuckNorris.css'; 

const ChuckNorris = ({ token }) => {
  const [fact, setFact] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChuckNorrisFact = async () => {
      try {
        // Fetch a random? Chuck Norris fact
        const response = await fetch('http://localhost:3333/fact', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFact(data.fact);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch Chuck Norris fact');
        }
      } catch (error) {
        setError('An error occurred. Please try again later.');
      }
    };

    fetchChuckNorrisFact();
  }, [token]);

  return (
    // Display Chuck Norris fact from localhost:3333/fact
    <div className="chuck-norris-fact">
      <h2>Chuck Norris Fact</h2>
      {fact && <p>{fact}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ChuckNorris;
