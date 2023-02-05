import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  TableRow,
  TableCell,
} from '@mui/material'

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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Number of departures</TableCell>
                  <TableCell>Number of returns</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stations.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.id}</TableCell>
                    <TableCell>
                      {' '}
                      <Link to={`/stations/${s.id}`}>{s.name_fi}</Link>
                    </TableCell>
                    <TableCell>{s.address_fi}</TableCell>
                    <TableCell>{s.departures}</TableCell>
                    <TableCell>{s.returns}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )
    }
  }

  return <div>{view()}</div>
}

export default Stations
