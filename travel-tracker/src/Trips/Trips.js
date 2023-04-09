import './Trips.css';
import Trip from '../Trip/Trip';

const Trips = ({ myTrips, setNotification, setMyTrips }) => {
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
      setNotification(n => [...n, result.message]);
    } catch(error) {
      setNotification(n => [...n, error.message]);
    }
  }

  return (
    <div className="Trips-container">
      <h2>My Trips:</h2>
      { myTrips.sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
      }).map((trip) => {
        return (
          <Trip
            trip={trip}
            deleteTrip={deleteTrip}
          ></Trip>
          )
        })
      }
    </div>
  )
}

export default Trips;