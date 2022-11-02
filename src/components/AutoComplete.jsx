import { useState, useEffect } from 'react'
import finnHub from "../apis/finnHub"

export const AutoComplete = () => {
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await finnHub.get("/search", {
                    params: {
                        q: search
                    }
                })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        fecthData()
    }, [])

    return (
        <div className="w-50 p-5 rounded mx-auto">
            <div className="form-floating dropdown">
                <input style={{backgroundColor: "rgba(145,158,171, 0.04)"}} type="text" id="search"
                className="form-control" placeholder="Search" autoComplete="off" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <label htmlFor="search">Search</label>
                <ul className="dropdown-menu">
                    <li>stock 1</li>
                    <li>stock 2</li>
                    <li>stock 3</li>
                </ul>
            </div>
        </div>
    )
}