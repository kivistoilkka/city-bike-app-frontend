import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const StationInfo = () => {
  const [station, setStation] = useState({})
  const id = useParams().id

  useEffect(() => {
    axios.get(`/api/station_info/${id}`).then((res) => {
      setStation(res.data)
    })
  }, [])

  return (
    <div>
      <ul>
        <li>Number: {station.id}</li>
        <li>Name: {station.name_fi}</li>
        <li>Address: {station.address_fi}</li>
        <li>X coordinate: {station.x_coord}</li>
        <li>Y coordinate: {station.y_coord}</li>
        <li>Departures: {station.departures}</li>
        <li>Returns: {station.returns}</li>
      </ul>
    </div>
  )
}

export default StationInfo
