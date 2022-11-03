import finnHub from "../apis/finnHub"
import { useState, useEffect } from 'react'

export const StockData = ({symbol}) => {
    const [stockData, setStockData] = useState()

    // This useEffect will be to fetch the data about a specific stock
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
                if (isMounted) {
                    setStockData(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        return () => (isMounted = false)
    }, [symbol])

    return (
        <div>
            {/* Will only render if/when stockData gets set, or else it won't render the following things */}
            {stockData && (
                <div className="row border bg-white rounded shadow-sm p-4 mt-5">
                    <div className="col">
                        <div>
                            <span className="fw-bold">Name: {stockData.name}</span>
                        </div>
                        <div>
                            <span className="fw-bold">Country: {stockData.country}</span>
                        </div>
                        <div>
                            <span className="fw-bold">Ticker: {stockData.ticker}</span>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <span className="fw-bold">Exchange: {stockData.exchange}</span>
                        </div>
                        <div>
                            <span className="fw-bold">Industry: {stockData.finnhubIndustry}</span>
                        </div>
                        <div>
                            <span className="fw-bold">IPO: {stockData.ipo}</span>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <span className="fw-bold">Market Cap: {stockData.marketCapitalization}</span>
                        </div>
                        <div>
                            <span className="fw-bold">Shares Outstanding: {stockData.shareOutstanding}</span>
                        </div>
                        <div>
                            <span className="fw-bold">URL: <a href={stockData.weburl} target="_blank" rel="noreferrer">{stockData.weburl}</a></span>
                        </div>
                    </div>                    
                </div>

            )}
        </div>
    )
}