import './TripRequest.css';
import React, { useState, useEffect } from 'react';

const TripRequest = ({ userInfo, setTripRequest, setMyTrips, setNotification }) => {
  const [requestedTrip, setRequestedTrip] = useState({ id: '', userID: userInfo.userID, destinationID: '', travelers: '', date: '', duration: '', status: 'active', suggestedActivities: ['Hiking', 'Skiing']});
  // required: id (number), userID (number), destinationID (number), travelers (number), date (string: 'YYYY/MM/DD'), duration (number), status (string), suggestedActivities (Array<strings>)

  const handleSubmit = (e) => {
    e.preventDefault();
    addTrip();
    clearRequestedTrip();
  }

  const handleDateChange = (e) => {
    const formattedDate = convertDate(e, 'slash');
    setRequestedTrip({...requestedTrip, date: formattedDate});
  }

  const convertDate = (date, format) => {
    if (date.length > 0) {
      const newDate = new Date(date);
      let formattedDate;
      switch (format) {
        case 'slash':
          formattedDate = [newDate.getFullYear(), newDate.getMonth()+1, newDate.getDate()]
            .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
          break;
        case 'dash':
        default:
          formattedDate = [newDate.getFullYear(), newDate.getMonth()+1, newDate.getDate()]
            .map(n => n < 10 ? `0${n}` : `${n}`).join('-');
          break;
      }
      return formattedDate;
    }
  }

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

  const clearRequestedTrip = () => {
    setRequestedTrip(
      {
        id: '',
        userID: userInfo.userID,
        destinationID: '',
        travelers: '',
        date: '',
        duration: '',
        status: 'active',
        suggestedActivities: ['Hiking', 'Skiing']
      }
    );
  }

  return (
    <div>
      <h2>Trip Request:</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Trip Id:
          <input
            type="number"
            value={requestedTrip.id}
            onChange={(e) => setRequestedTrip({...requestedTrip, id: parseInt(e.target.value)})}
          ></input>
        </label>
        <label>
          Destination Id:
          <input
            type="number"
            value={requestedTrip.destinationID}
            onChange={(e) => setRequestedTrip({...requestedTrip, destinationID: parseInt(e.target.value)})}
          ></input>
        </label>
        <label>
          # Travelers:
          <input
            type="number"
            value={requestedTrip.travelers}
            onChange={(e) => setRequestedTrip({...requestedTrip, travelers: parseInt(e.target.value)})}
          ></input>
        </label>
        <label>
          Date:
          <input
            type="date"
            value={requestedTrip.date}
            onChange={(e) => handleDateChange(e.target.value)}
          ></input>
        </label>
        <label>
          Duration (days):
          <input
            type="number"
            value={requestedTrip.duration}
            onChange={(e) => setRequestedTrip({...requestedTrip, duration: parseInt(e.target.value)})}
          ></input>
        </label>
        <input type="Submit" value="Submit"></input>
      </form>
    </div>
  )
}

export default TripRequest;