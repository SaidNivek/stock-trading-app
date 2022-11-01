import {  useState, useEffect } from 'react'
import finnHub from '../apis/finnHub'

export const StockList = () => {
    
    const [stock, setStock] = useState([])
    // Will hold the names of the stocks that someone wants to watch and to set those stocks
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"])
    
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

        return () => (isMounted = false)
    }, [])

    return (   
        <div>
            <table className="table hover mt-5">
                <thead style={{color: "rgb(78,89,102)"}}>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Last</th>
                        <th scope="col">Chg</th>
                        <th scope="col">Chg %</th>
                        <th scope="col">High</th>
                        <th scope="col">Low</th>
                        <th scope="col">Open</th>
                        <th scope="col">Close</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.map((stockData) => {
                        return (
                            <tr className="table-row" key={stockData.symbol}>
                                <th scope="row">{stockData.symbol}</th>
                                <td>{stockData.data.c}</td>
                                <td>{stockData.data.d}</td>
                                <td>{stockData.data.dp}</td>
                                <td>{stockData.data.h}</td>
                                <td>{stockData.data.l}</td>
                                <td>{stockData.data.o}</td>
                                <td>{stockData.data.pc}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>        
    )
}