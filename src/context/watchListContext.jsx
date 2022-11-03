import { createContext, useState, useEffect } from 'react'

export const WatchListContext = createContext()

export const WatchListContextProvider = (props) => {

    // Will hold the names of the stocks that someone wants to watch and to set those stocks
    const [watchList, setWatchList] = useState(
        localStorage.getItem("watchList")?.split(",") || ["GOOGL", "MSFT", "AMZN"]
    )

    useEffect(() => {
        localStorage.setItem("watchList", watchList)
    }, [watchList])

    // This function will add a stock to the watchList of stocks, if it is not in the list already
    const addStock = (stock) => {
        // If the stock that is selected is not currently in the list, add it in
        // indexOf returns -1 if the queried item is NOT in the array
        if(watchList.indexOf(stock) === -1) {
            setWatchList([...watchList, stock])
        }
    }

    // This function will remove a stock from the watchList of stocks, if it is in the list, otherwise it does nothing
    const deleteStock = (stock) => {
        // Filter will go through and return all the elements that DO NOT equal the selected stock
        // If it does match, it will not be returned back to the array, which is reset using setWatchList
        setWatchList(watchList.filter((el) => {
            return el !== stock
        }))
    }

    return <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
        {props.children}
    </WatchListContext.Provider>
}