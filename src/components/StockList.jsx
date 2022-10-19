import {  useState, useEffect } from 'react'

export const StockList = () => {
    // Will hold the names of the stocks that someone wants to watch and to set those stocks
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZ"])
    
    return (
        <div>
            Stock List Page
        </div>
    )
}