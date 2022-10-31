import {  useState, useEffect } from 'react'
import finnHub from '../apis/finnHub'

export const StockList = () => {
    
    const [stock, setStock] = useState()
    // Will hold the names of the stocks that someone wants to watch and to set those stocks
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZ"])
    
    // Import the key from the .env folder to be used more easily
    const API_KEY = process.env.REACT_APP_FINNHUB_KEY

    useEffect(() => {
        let isMounted = true
        // Must be an async function so it can work properly with the await
        const fetchData = async () => {
            const responses = []
            try {
                // Uses the finnHub axios import to start with the base URL route to make it easier to read/use
                // The token after the symbol isn't needed, since we passed it as a aparm in the finnHub axios instance (see apis/finnHub.js)
                // After the /quote, the object that is passed in has params, which are needed by the fetch request to allow it to match the API docs                
                // Promise.all accepts a list of promises that it will then send out all at once, to be handled simultaneously
                const responses = Promise.all([finnHub.get("/quote?", {
                    params: {
                        symbol: "GOOGL"
                    }
                }), finnHub.get("/quote?", {
                    params: {
                        symbol: "AMZN"
                    }
                }), finnHub.get("/quote?", {
                    params: {
                        symbol: "MSFT"
                    }
                })])

                console.log(responses)
                // This will check if the component is mounted. If it is, then we will setStock to the data, if not, then it will skip this and move on
                if (isMounted) {
                    // Will take the response.data and put it into the stock variable
                    setStock(responses)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
        return () => (isMounted = false)
    }, [])
    
    return (
        <div>
            Stock List Page
        </div>
    )
}