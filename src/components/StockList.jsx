import {  useState, useEffect } from 'react'
import finnHub from '../apis/finnHub'

export const StockList = () => {
    
    // Will hold the names of the stocks that someone wants to watch and to set those stocks
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZ"])
    
    // Import the key from the .env folder to be used more easily
    const API_KEY = process.env.REACT_APP_FINNHUB_KEY

    useEffect(() => {
        // Must be an async function so it can work properly with the await
        const fetchData = async () => {
            try {
                // Uses the finnHub axios import to start with the base URL route to make it easier to read/use
                // Add the API_KEY from the .env folder
                const response = await finnHub.get("/quote?symbol=MSFT&token=" + API_KEY)
                console.log(response)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    
    return (
        <div>
            Stock List Page
        </div>
    )
}