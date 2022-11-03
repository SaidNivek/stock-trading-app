// Import useParams to be able to get the params from the URL, as defined in App.jsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import finnHub from '../apis/finnHub'
import { StockChart } from '../components/StockChart'

const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      // need to return the 'el' (which is t) * 1000, because the chart uses milliseconds and the API uses seconds
      x: el * 1000,
      // We need the same index from the c portion of the data, so we use the same index, but iterate on the c list
      y: data.c[index]
    }
  })
}

function StockDetailPage() {

  const[chartData, setChartData] = useState()
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

      try {
        const responses = await Promise.all([
          // This will get data for one day, with datapoints every 30 minutes (resolution)
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDay, 
              to: currentTime,
              resolution: 30
            }
        }),
        // This will get data for one Week, with data points every hour (resolution)
        finnHub.get("/stock/candle", {
          params: {
            symbol,
            from: oneWeek, 
            to: currentTime,
            resolution: 60
          }
        }),
        // This will get data for one Year, with data points every week (resolution)
        finnHub.get("/stock/candle", {
          params: {
            symbol,
            from: oneYear, 
            to: currentTime,
            resolution: "W"
          }
        })
      ])

      console.log(responses)

      // Use the function defined above to set the data for day, week, and year
      setChartData({
        day: formatData(responses[0].data),
        week: formatData(responses[1].data),
        year: formatData(responses[2].data)
      })

    } catch (error) {
      console.log(error)
    }
      
    } // end fetchData code block definition
    fetchData()
  }, [symbol])

  return (
    // If there is data in chartData, then it will render, using the if statement and the && check
    <div>{chartData && (
      <div>
        <StockChart 
          chartData = {chartData}
          symbol = {symbol}
        />
      </div>
    )}</div>
  )
}

export default StockDetailPage