import './App.css';
import React, { useState, useEffect } from 'react';
import Trips from './Trips/Trips';

function App() {
  const [allTrips, setAllTrips] = useState([]);

  useEffect(() => {
    try {
      const fetchAllTrips = async () => {
        const response = await fetch('http://localhost:3001/api/v1/trips');
        const result = await response.json();
        setAllTrips(result.trips);
      }
      fetchAllTrips();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Tracker</h1>
      </header>
      <body>
        <Trips
          allTrips={allTrips}
        ></Trips>
      </body>
    </div>
  );
}

export default App;
