import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'

const StationInfo = () => {
  const [station, setStation] = useState({})
  const [loading, setLoading] = useState(true)
  const id = useParams().id

  useEffect(() => {
    axios.get(`/api/station_info/${id}`).then((res) => {
      setStation(res.data)
      setLoading(false)
    })
  }, [])

  const view = () => {
    if (loading) {
      return (
        <p>
          <Typography>Getting data from database</Typography>
        </p>
      )
    } else {
      return (
        <div>
          <Typography>
            <ul>
              <li>
                <i>Number:</i> {station.id}
              </li>
              <li>
                <i>Name:</i> {station.name_fi}
              </li>
              <li>
                <i>Address:</i> {station.address_fi}
              </li>
              <li>
                <i>X coordinate:</i> {station.x_coord}
              </li>
              <li>
                <i>Y coordinate:</i> {station.y_coord}
              </li>
              <li>
                <i>Departures:</i> {station.departures}
              </li>
              <li>
                <i>Returns:</i> {station.returns}
              </li>
            </ul>
          </Typography>
        </div>
      )
    }
  }

  return <div>{view()}</div>
}

export default StationInfo
