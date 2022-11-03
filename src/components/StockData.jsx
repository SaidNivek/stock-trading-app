import finnHub from "../apis/finnHub"
import { useState, useEffect } from 'react'

export const StockData = ({symbol}) => {

    // This useEffect will be to fecth the data about a specific stock
    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const response = await finnHub.get("/stock/profile2", {
                    params: {
                        symbol
                    }
                })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [symbol])

    return (
        <h2>Stock Data</h2>
    )
}