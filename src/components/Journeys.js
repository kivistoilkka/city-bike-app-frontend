import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Journeys = (props) => {
  const [journeys, setJourneys] = useState([])
  const [sorting, setSorting] = useState('departure_newest')

  useEffect(() => {
    if (props.sorting === 'distance') {
      axios.get('api/journeys_distance/0_100').then((res) => {
        setJourneys(res.data)
      })
    } else if (props.sorting === 'duration') {
      axios.get('api/journeys_duration/0_100').then((res) => {
        setJourneys(res.data)
      })
    } else if (props.sorting === 'oldest') {
      axios.get('api/journeys_time_increasing/0_100').then((res) => {
        setJourneys(res.data)
      })
    } else {
      axios.get('api/journeys_time_decreasing/0_100').then((res) => {
        setJourneys(res.data)
      })
    }
  }, [])

  const explanation = () => {
    if (sorting === 'distance') {
      return 'Viewing 100 longest journeys by distance'
    } else if (sorting === 'duration') {
      return 'Viewing 100 longest journeys by duration'
    } else {
      return 'Viewing 100 most recent journeys'
    }
  }

  const sortByDepartureTime = () => {
    axios.get('api/journeys_time_decreasing/0_100').then((res) => {
      setJourneys(res.data)
    })
    setSorting('departure_newest')
  }
  const sortByDistance = () => {
    axios.get('api/journeys_distance/0_100').then((res) => {
      setJourneys(res.data)
    })
    setSorting('distance')
  }

  const sortByDuration = () => {
    axios.get('api/journeys_duration/0_100').then((res) => {
      setJourneys(res.data)
    })
    setSorting('duration')
  }

  return (
    <div>
      <p>{explanation()}</p>
      <table>
        <thead>
          <tr>
            <th>
              <a onClick={sortByDepartureTime}>Departure time</a>
            </th>
            <th>Departure station</th>
            <th>Return station</th>
            <th>Return time</th>
            <th>
              <a onClick={sortByDistance}>Distance (meters)</a>
            </th>
            <th>
              <a onClick={sortByDuration}>Duration (minutes)</a>
            </th>
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
