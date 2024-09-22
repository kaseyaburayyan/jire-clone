import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  // State to store the API response
  const [message, setMessage] = useState('');

  // Function to handle button click and fetch data
  const fetchHelloMessage = async () => {
    try {
      const response = await fetch(`http://localhost:8080/hello`);
      const data = await response.text(); 
      setMessage(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Failed to fetch message');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello COMP 495!
          <br></br>
        </a>
        <button onClick={fetchHelloMessage}>
          Fetch Hello Message
        </button>
        <p>{message}</p> {/* Display the fetched message here */}
      </header>
    </div>
  );
}

export default App;
