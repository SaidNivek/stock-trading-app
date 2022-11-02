import {  useState, useEffect } from 'react'
import finnHub from '../apis/finnHub'
import  { BsFillCaretDownFill } from "react-icons/bs"
import  { BsFillCaretUpFill } from "react-icons/bs"
import { useGlobalContext } from '../context/watchListContext'

export const StockList = () => {
    const {watchList} = useGlobalContext()
    const [stock, setStock] = useState([])    

    // This function will take in the change of the stock and return success or danger, which will complete the className, turning the text green or red when displayed on the page
    const changeColor = (change) => {
        return change > 0 ? "success" : "danger"
    }

    // This function will take in the change of the stock and return an up or down arrow, depending on if the stock is positive or negative for that specific value
    const renderIcon = (change) => {
        return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
    }
    
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
                                <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d} {renderIcon(stockData.data.d)}</td>
                                <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp} {renderIcon(stockData.data.dp)}</td>
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