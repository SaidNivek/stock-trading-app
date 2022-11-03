// Import useParams to be able to get the params from the URL, as defined in App.jsx
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import finnHub from '../apis/finnHub'

function StockDetailPage() {

  // Destructure out the symbol information from the URL, using useParams
  const {symbol} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date()
      // This will get the current time. The API needs it in seconds,not milliseconds, so the Math.floor to truncate and then the division by 1000 to go from millseconds to seconds
      const currentTime = Math.floor(date.getTime() / 1000)
      let oneDay
      // If it's Saturday, go two days earlier, since no data on Saturday
      if (date.getDay() === 6) {
        oneDay = currentTime - 2 * 24 * 60 * 60
      // If it's Sunday, go two days earlier, since no data on Saturday or Sunday
      } else if (date.getDay() === 0) {     
        oneDay = currentTime - 3 * 24 * 60 * 60
      } else {
        oneDay = currentTime - 24 * 60 * 60
      }
      const oneWeek = currentTime - 7*24*60*60
      const oneYear = currentTime - 365*24*60*60

      // This will get data for one day, with datapoints every 30 minutes (resolution)
      const responseDay = await finnHub.get("/stock/candle", {
        params: {
          symbol,
          from: oneDay, 
          to: currentTime,
          resolution: 30
        }
      })
      // This will get data for one Week, with data points every hour (resolution)
      const responseWeek = await finnHub.get("/stock/candle", {
        params: {
          symbol,
          from: oneWeek, 
          to: currentTime,
          resolution: 60
        }
      })
      // This will get data for one Year, with data points every week (resolution)
      const responseYear = await finnHub.get("/stock/candle", {
        params: {
          symbol,
          from: oneYear, 
          to: currentTime,
          resolution: "W"
        }
      })
      console.log(responseDay)
      console.log(responseWeek)
      console.log(responseYear)
    }
    fetchData()
  }, [])

  return (
    <div>This is the stock detail page {symbol}</div>
  )
}

export default StockDetailPage