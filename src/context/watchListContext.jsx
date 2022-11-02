import { createContext } from 'react'

export const WatchListContext = createContext()

export const WatchListContextProvider = (props) => {

    // Will hold the names of the stocks that someone wants to watch and to set those stocks
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"])

    return <WatchListContext.Provider value={{watchList}}>

    </WatchListContext.Provider>

}