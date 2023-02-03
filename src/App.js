import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {
  const [databaseInfo, setDatabaseInfo] = useState({})

  useEffect(() => {
    axios.get('/api/database_info').then((response) => {
      setDatabaseInfo(response.data)
    })
  }, [])

  return (
    <div className="App">
      <h1>City Bike App</h1>
      <p>
        Database contains {databaseInfo.station_count} stations and{' '}
        {databaseInfo.journey_count} journeys
      </p>
    </div>
  )
}

export default App
