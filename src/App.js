import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Stations from './components/Stations'
import StationInfo from './components/StationInfo'
import Journeys from './components/Journeys'

import {
  AppBar,
  Container,
  IconButton,
  Button,
  Toolbar,
  Typography,
} from '@mui/material'

const Home = () => {
  const [databaseInfo, setDatabaseInfo] = useState({
    station_count: '-',
    journey_count: '-',
  })

  useEffect(() => {
    axios.get('/api/database_info').then((res) => {
      setDatabaseInfo(res.data)
    })
  }, [])

  return (
    <div>
      <p>
        <Typography>
          Database contains {databaseInfo.station_count} stations and{' '}
          {databaseInfo.journey_count} journeys
        </Typography>
      </p>
    </div>
  )
}

const App = () => {
  return (
    <Container>
      <Router>
        <Typography variant="h3" component="h1">
          City Bike App
        </Typography>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
            ></IconButton>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/stations">
              Stations
            </Button>
            <Button color="inherit" component={Link} to="/journeys">
              Journeys
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/stations/:id" element={<StationInfo />} />
          <Route path="/journeys" element={<Journeys />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App
