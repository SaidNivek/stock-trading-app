import { useState, useEffect } from 'react'
import finnHub from "../apis/finnHub"

export const AutoComplete = () => {
    // This state is used to set the search bar to the value of the search, and update it using setSearch right from the input field (below)
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])

    const renderDropdown = () => {
        // This will check the search variable, if it has something, then it will return true, otherwise it will return false
        // If it's true, return the class "show" to show the dropdown, otherwise return null
        const dropDownClass = search ? "show" : null
        return (
            <ul style={{
                height: "500px",
                overflowY: "scroll",
                overflowX: "hidden",
                cursor: "pointer"
            }} className={`dropdown-menu ${dropDownClass}`}>
                {results.map((result) => {
                    return (
                        <li key={result.symbol} className="dropdown-item">{result.description} ({result.symbol})</li>
                    )
                })}
            </ul>
        )
    }

    // This effect will request from the API data that is being searched for, auto-completing the search input
    useEffect(() => {
        let isMounted = true
        const fecthData = async () => {
            try {
                const response = await finnHub.get("/search", {
                    params: {
                        q: search
                    }
                })
                if (isMounted) {

                    setResults(response.data.result)
                }

            } catch (error) {
                console.log(error)
            }
        }
        // If the user has put in at least one letter, then we call fetchData
        if(search.length > 0) {
            fecthData()
        // If the user deletes down to 0 characters, setResults to an empty array
        } else {
            setResults([])
        }

        return () => (isMounted = false)

    }, [search])

    return (
        <div className="w-50 p-5 rounded mx-auto">
            <div className="form-floating dropdown">
                <input style={{backgroundColor: "rgba(145,158,171, 0.04)"}} type="text" id="search"
                className="form-control" placeholder="Search" autoComplete="off" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <label htmlFor="search">Search</label>
                {renderDropdown()}
            </div>
        </div>
    )
}