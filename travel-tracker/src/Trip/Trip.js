import './Trip.css';

const Trip = ({ trip }) => {
  return(
    <div key={trip.id} className="Trip-container">
      <p>Trip Id: {trip.id}</p>
      <p>Destination Id: {trip.destinationID}</p>
      <p># Travelers: {trip.travelers}</p>
      <p>Date: {trip.date}</p>
    </div>
  )
}

export default Trip;