import './App.css';
import React, { useState, useEffect } from 'react';
import Trips from './Trips/Trips';
import TripRequest from './TripRequest/TripRequest';

function App() {
  const [userInfo, setUserInfo] = useState({ userID: 45 })
  const [myTrips, setMyTrips] = useState([]);
  const [tripRequests, setTripRequest] = useState([]);

  useEffect(() => {
    try {
      const fetchAllTrips = async () => {
        const response = await fetch('http://localhost:3001/api/v1/trips');
        const result = await response.json();
        const myTrips = result.trips.filter((trip) => trip.userID === userInfo.userID);
        setMyTrips(myTrips);
      }
      fetchAllTrips();
    } catch (error) {
      console.log(error);
    }
  }, [userInfo.userID]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Tracker</h1>
      </header>
      <div>
        {tripRequests.map((trip) => {
          return(trip.status)
        })}
      </div>
      <TripRequest
        userInfo={userInfo}
        setTripRequest={setTripRequest}
      ></TripRequest>
      <Trips
        myTrips={myTrips}
      ></Trips>
    </div>
  );
}

export default App;