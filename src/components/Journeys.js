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
  TableSortLabel,
  Typography,
} from '@mui/material'

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
      <p>
        <Typography>{explanation()}</Typography>
      </p>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  onClick={sortByDepartureTime}
                  direction={'desc'}
                >
                  Departure time
                </TableSortLabel>
              </TableCell>
              <TableCell>Departure station</TableCell>
              <TableCell>Return station</TableCell>
              <TableCell>Return time</TableCell>
              <TableCell>
                <TableSortLabel onClick={sortByDistance} direction={'desc'}>
                  Distance (kilometers)
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel onClick={sortByDuration} direction={'desc'}>
                  Duration (minutes)
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journeys.map((journey) => (
              <TableRow key={journey.id}>
                <TableCell>{journey.departure_time}</TableCell>
                <TableCell>
                  {' '}
                  <Link to={`/stations/${journey.departure_station}`}>
                    {journey.departure_station}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={`/stations/${journey.return_station}`}>
                    {journey.return_station}
                  </Link>
                </TableCell>
                <TableCell>{journey.return_time}</TableCell>
                <TableCell>{(journey.distance / 1000).toFixed(2)}</TableCell>
                <TableCell>{(journey.duration / 60).toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Journeys
