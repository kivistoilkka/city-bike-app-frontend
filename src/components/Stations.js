import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Stations = () => {
  const [stations, setStations] = useState([])

  useEffect(() => {
    axios.get('/api/all_stations_id_decreasing/').then((res) => {
      setStations(res.data)
    })
  }, [])

  return (
    <div>
      <ul>
        {stations.map((s) => (
          <li key={s.id}>
            <Link to={`/stations/${s.id}`}>
              {s.id}: {s.name_fi}, {s.address_fi}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Stations
