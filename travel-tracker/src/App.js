import './App.css';
import React, { useState, useEffect } from 'react';
import Trips from './Trips/Trips';
import TripRequest from './TripRequest/TripRequest';
import Notifications from './Notifications/Notifications';
import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';

function App() {
  const [userInfo, setUserInfo] = useState({ userID: 45 })
  const [myTrips, setMyTrips] = useState([]);
  const [tripRequests, setTripRequest] = useState([]);
  const [notifications, setNotification] = useState([]);

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
      setNotification(n => [...n, error.message]);
    }
  }, [userInfo.userID]);

  return (
    <div className="App">
      <div className="background-image"></div>
      <header className="App-header">
        <h1>TRAVEL TRACKER</h1>
        <TripRequest
          userInfo={userInfo}
          setTripRequest={setTripRequest}
          setMyTrips={setMyTrips}
          setNotification={setNotification}
        ></TripRequest>
      </header>
      <Notifications
        notifications={notifications}
      ></Notifications>
      <Trips
        myTrips={myTrips}
        setMyTrips={setMyTrips}
        setNotification={setNotification}
      ></Trips>
    </div>
  );
}

export default App;