import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Journeys = () => {
  const [journeys, setJourneys] = useState([])

  useEffect(() => {
    axios.get('api/journeys_distance/0_100').then((res) => {
      setJourneys(res.data)
    })
  }, [])

  return (
    <div>
      <p>Viewing 100 longest journeys by distance</p>
      <table>
        <thead>
          <tr>
            <th>Departure time</th>
            <th>Departure station</th>
            <th>Return station</th>
            <th>Return time</th>
            <th>Distance (meters)</th>
            <th>Duration (minutes)</th>
          </tr>
        </thead>
        <tbody>
          {journeys.map((journey) => (
            <tr key={journey.id}>
              <td>{journey.departure_time}</td>
              <td>
                {' '}
                <Link to={`/stations/${journey.departure_station}`}>
                  {journey.departure_station}
                </Link>
              </td>
              <td>
                <Link to={`/stations/${journey.return_station}`}>
                  {journey.return_station}
                </Link>
              </td>
              <td>{journey.return_time}</td>
              <td>{journey.distance}</td>
              <td>{(journey.duration / 60).toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Journeys
