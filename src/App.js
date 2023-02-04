import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Stations from './components/Stations'
import StationInfo from './components/StationInfo'
import Journeys from './components/Journeys'

const Home = () => {
  const [databaseInfo, setDatabaseInfo] = useState({})

  useEffect(() => {
    axios.get('/api/database_info').then((res) => {
      setDatabaseInfo(res.data)
    })
  }, [])

  return (
    <div>
      <p>
        Database contains {databaseInfo.station_count} stations and{' '}
        {databaseInfo.journey_count} journeys
      </p>
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <h1>City Bike App</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/stations">Stations</Link>
        <Link to="/journeys">Journeys</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/stations/:id" element={<StationInfo />} />
        <Route path="/journeys" element={<Journeys />} />
      </Routes>
    </Router>
  )
}

export default App
