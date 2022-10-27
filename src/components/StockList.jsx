import {  useState, useEffect } from 'react'
import finnHub from '../apis/finnHub'

export const StockList = () => {
    
    // Will hold the names of the stocks that someone wants to watch and to set those stocks
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZ"])
    
    const API_KEY = process.env.REACT_APP_FINNHUB_KEY

    console.log(API_KEY)

    useEffect(() => {
        const fetchData = async () => {
            try {
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