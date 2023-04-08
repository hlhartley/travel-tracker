import './Trips.css';
import Trip from '../Trip/Trip';

const Trips = ({ allTrips }) => {
  const sortedTrips = allTrips.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });

  return sortedTrips.map((trip) => {
    return (
      <div className="Trips-container">
        <Trip
          trip={trip}
        ></Trip>
      </div>
    )
  })
}

export default Trips;