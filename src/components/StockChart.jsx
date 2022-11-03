import Chart from "react-apexcharts";
import { useState } from 'react'

// Call in the props that are passed into chart data and destructure them instead of using props
export const StockChart = ({chartData, symbol}) => {
    // Set the intitial state for the chart, which is at 24 hours
    const [dateFormat, setDateFormat] = useState("24h")
    // Deconstruct the chart data that is passed into the component 
    const { day, week, year } = chartData
    const options = {
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px"
            }            
        },
        chart: {
            id: "stock data",
            speed: 1300
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: "MMM dd HH:MM"
            }
        }
    }

    const chooseTimeFormat = () => {
        switch(dateFormat) {
            case "24h":
                return day
            case "7d":
                return week
            case "1y":
                return year
            default:
                return day
        }
    }

    const series = [{
        name: symbol,
        data: chooseTimeFormat()
    }]

    return (
        <div className="mt-5 p-4 shadow-sm bg-white">
            <Chart 
                options={options}
                series={series}
                type="area"
                width="100%"
            />
            <div>
                <button onClick={() => setDateFormat("24h")}>1 day</button>
                <button onClick={() => setDateFormat("7d")}>7 days</button>
                <button onClick={() => setDateFormat("1y")}>1 year</button>
            </div>
        </div>
    )
}