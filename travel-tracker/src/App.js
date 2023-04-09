import './App.css';
import React, { useState, useEffect } from 'react';
import Trips from './Trips/Trips';
import TripRequest from './TripRequest/TripRequest';
import Notifications from './Notifications/Notifications';

function App() {
  const [userInfo, setUserInfo] = useState({ userID: 45 })
  const [myTrips, setMyTrips] = useState([]);
  const [tripRequests, setTripRequest] = useState([]);
  const [notifications, setNotification] = useState([]);
  const [requestedTrip, setRequestedTrip] = useState({ id: '', userID: userInfo.userID, destinationID: '', travelers: '', date: '', duration: '', status: 'active', suggestedActivities: ['Hiking', 'Skiing']}); // mockData
  // required: id (number), userID (number), destinationID (number), travelers (number), date (string: 'YYYY/MM/DD'), duration (number), status (string), suggestedActivities (Array<strings>)

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

  const addTrip = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/trips',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestedTrip)
        }
      )
      const result = await response.json();
      setTripRequest(t => [...t, result.newTrip]);
      setMyTrips(t => [...t, result.newTrip]);
      setNotification([result.message]);
    } catch (error) {
      setNotification([error.message]);
    }
  }

  const deleteTrip = async (trip) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/trips/${trip.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
      const result = await response.json();
      const tripIndex = myTrips.indexOf(trip);
      myTrips.splice(tripIndex, 1);
      setMyTrips(myTrips);
      setNotification([result.message]);
    } catch(error) {
      setNotification([error.message]);
    }
  }

  const modifyTrip = async (trip) => {
    trip.suggestedActivities.push('Fishing'); // mockData
    trip.status = 'approved'; // mockData
    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/updateTrip',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trip),
        }
      )
      const result = await response.json();
      const tripIndex = myTrips.indexOf(trip);
      myTrips.splice(tripIndex, 1);
      myTrips.push(trip);
      setMyTrips(myTrips);
      setNotification([result.message]);
    } catch (error) {
      setNotification([error.message]);
    }
  }

  return (
    <div className="App">
      <div className="background-image"></div>
      <header className="App-header">
        <h1>TRAVEL TRACKER</h1>
        <TripRequest
          userInfo={userInfo}
          requestedTrip={requestedTrip}
          addTrip={addTrip}
          setRequestedTrip={setRequestedTrip}
        ></TripRequest>
      </header>
      <Notifications
        notifications={notifications}
      ></Notifications>
      <Trips
        myTrips={myTrips}
        modifyTrip={modifyTrip}
        deleteTrip={deleteTrip}
      ></Trips>
    </div>
  );
}

export default App;