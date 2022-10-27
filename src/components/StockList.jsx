import {  useState, useEffect } from 'react'
import finnHub from '../apis/finnHub'
import API_KEY from '../.gitignore'

export const StockList = () => {
    // Will hold the names of the stocks that someone wants to watch and to set those stocks
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZ"])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await finnHub.get("/quote?symbol=MSFT&token=cd5mla2ad3i5nc8o2vagcd5mla2ad3i5nc8o2vb0")
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