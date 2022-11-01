import {  useState, useEffect } from 'react'
import finnHub from '../apis/finnHub'

export const StockList = () => {
    
    const [stock, setStock] = useState()
    // Will hold the names of the stocks that someone wants to watch and to set those stocks
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZ"])
    
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
                // Promise.all needs an array of values to be passed to it, or it own't be able to iterate over it
                // Can use a map function to take the watchList stock symbols and have them pass into the finnHub.get function
                const responses = await Promise.all(watchList.map((stock) => {
                    return finnHub.get("/quote", {
                        params: {
                            symbol: stock
                        }
                    })
                }))

                // Map through the responses and pull out the data and the symbol that we need for each stock
                const data = responses.map((response) => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                    
                })
                // This will check if the component is mounted. If it is, then we will setStock to the data, if not, then it will skip this and move on
                if (isMounted) {
                    // Will take the response.data and put it into the stock variable
                    setStock(data)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
        // This will need some sort of loading to ensure that the sock is being represented properly, or else it will have empty data in it and won't render anything and will look incomplete/unprofessional
        console.log(stock)
        return () => (isMounted = false)
    }, [])
    
    return (
        <div>
            Stock List Page
        </div>
    )
}