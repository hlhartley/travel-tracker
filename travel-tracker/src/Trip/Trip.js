import './Trip.css';

const Trip = ({ trip, deleteTrip }) => {
  const removeTrip = () => {
    deleteTrip(trip)
  }
  return(
    <div key={trip.id} className="Trip-container">
      <p>Trip Id: {trip.id}</p>
      <p>Destination Id: {trip.destinationID}</p>
      <p># Travelers: {trip.travelers}</p>
      <p>Date: {trip.date}</p>
      <button onClick={removeTrip}>Delete</button>
    </div>
  )
}

export default Trip;