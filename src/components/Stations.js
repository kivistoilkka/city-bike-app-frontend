import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Stations = () => {
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/all_stations_id_decreasing/').then((res) => {
      setStations(res.data)
      setLoading(false)
    })
  }, [])

  const view = () => {
    if (loading) {
      return <p>Getting data from database</p>
    } else {
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Address</th>
                <th>Number of departures</th>
              </tr>
            </thead>
            <tbody>
              {stations.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>
                    {' '}
                    <Link to={`/stations/${s.id}`}>{s.name_fi}</Link>
                  </td>
                  <td>{s.address_fi}</td>
                  <td>{s.departures}</td>
                  <td>{s.returns}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }

  return <div>{view()}</div>
}

export default Stations
