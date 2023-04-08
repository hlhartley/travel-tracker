import './Trips.css';
import Trip from '../Trip/Trip';

const Trips = ({ myTrips }) => {
  const sortedTrips = myTrips.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="Trips-container">
      <h2>My Trips:</h2>
      { sortedTrips.map((trip) => {
        return (
          <Trip
            trip={trip}
          ></Trip>
          )
        })
      }
    </div>
  )
}

export default Trips;