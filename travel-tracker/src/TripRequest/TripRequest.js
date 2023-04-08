import './TripRequest.css';
import React, { useState, useEffect } from 'react';

const TripRequest = ({ setTripRequest, userInfo }) => {
  const [requestedTrip, setRequestedTrip] = useState({ userID: userInfo.userID, status: 'pending', suggestedActivities: ['Hiking', 'Skiing']});
  // required: id (number), userID (number), destinationID (number), travelers (number), date (string: 'YYYY/MM/DD'), duration (number), status (string), suggestedActivities (Array<strings>)

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger
    addTripRequest();
  }

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = [date.getFullYear(), date.getMonth()+1, date.getDate()]
      .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
    setRequestedTrip({...requestedTrip, date: formattedDate});
  }

  const addTripRequest = async () => {
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
      console.log('Status', response.status);
      const result = await response.json();
      setTripRequest(t => [...t, result.newTrip]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Trip Request:</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Trip Id:
          <input
            type="number"
            onBlur={(e) => setRequestedTrip({...requestedTrip, id: parseInt(e.target.value)})}
          ></input>
        </label>
        <label>
          Destination Id:
          <input
            type="number"
            onBlur={(e) => setRequestedTrip({...requestedTrip, destinationID: parseInt(e.target.value)})}
          ></input>
        </label>
        <label>
          # Travelers:
          <input
            type="number"
            onBlur={(e) => setRequestedTrip({...requestedTrip, travelers: parseInt(e.target.value)})}
          ></input>
        </label>
        <label>
          Date:
          <input
            type="date"
            onBlur={(e) => handleDateChange(e)}
          ></input>
        </label>
        <label>
          Duration (days):
          <input
            type="number"
            onBlur={(e) => setRequestedTrip({...requestedTrip, duration: parseInt(e.target.value)})}
          ></input>
        </label>
        <input type="Submit" value="Submit"></input>
      </form>
    </div>
  )
}

export default TripRequest;