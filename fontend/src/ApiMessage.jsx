import React, { useState, useEffect } from 'react';

function ApiMessage() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:3001/api/hello')  // your backend API URL
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Failed to fetch message.'));
  }, []);

  return (
    <div>
      <h2>Message from API:</h2>
      <p>{message}</p>
    </div>
  );
}

export default ApiMessage;
