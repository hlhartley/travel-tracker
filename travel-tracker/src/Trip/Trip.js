import './Trip.css';

const Trip = ({ trip, deleteTrip, modifyTrip }) => {
  return(
    <div key={trip.id} className="Trip-container">
      <p>Trip Id: {trip.id}</p>
      <p>Destination Id: {trip.destinationID}</p>
      <p># Travelers: {trip.travelers}</p>
      <p>Date: {trip.date}</p>
      <div>Activities: {
        trip.suggestedActivities.map((activity) => {
          return (
            <p>{activity}</p>
          )
        })}
      </div>
      <div className="button-container">
        <button onClick={() => modifyTrip(trip)}>Modify</button>
        <button onClick={() => deleteTrip(trip)}>Delete</button>
      </div>
    </div>
  )
}

export default Trip;