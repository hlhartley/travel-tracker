import './Trips.css';
import Trip from '../Trip/Trip';

const Trips = ({ myTrips, modifyTrip, deleteTrip }) => {
  return (
    <div className="Trips-container">
      <h2>My Trips:</h2>
      { myTrips.length > 0 && myTrips.sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
      }).map((trip) => {
        return (
          trip && <Trip
            trip={trip}
            modifyTrip={modifyTrip}
            deleteTrip={deleteTrip}
          ></Trip>
          )
        })
      }
      { myTrips.length === 0 && <p>No trips scheduled</p> }
    </div>
  )
}

export default Trips;