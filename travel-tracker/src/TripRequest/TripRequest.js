import './TripRequest.css';

const TripRequest = ({ userInfo, requestedTrip, addTrip, setRequestedTrip }) => {
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
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <label>
            Duration:
            <input
              type="number"
              value={requestedTrip.duration}
              onChange={(e) => setRequestedTrip({...requestedTrip, duration: parseInt(e.target.value)})}
            ></input>
          </label>
        <input type="Submit" value="Submit"></input>
        </div>
      </form>
    </div>
  )
}

export default TripRequest;