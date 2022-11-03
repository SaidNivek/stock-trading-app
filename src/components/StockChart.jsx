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

    // This function will apply the proper classes to the buttons which select that date format
    // If the dateFormat === the button selected, then it will add the primary button, so it will be highlighted
    const renderButtonSelect = button => {
        const classes = "btn m-1 "
        if (button === dateFormat) {
            return classes + "btn-primary"
        } else {
            return classes + "btn-outline-primary"
        }
    }

    return (
        <div className="mt-5 p-4 shadow-sm bg-white">
            <Chart 
                options={options}
                series={series}
                type="area"
                width="100%"
            />
            <div>
                <button className={renderButtonSelect("24h")} onClick={() => setDateFormat("24h")}>1 day</button>
                <button className={renderButtonSelect("7d")} onClick={() => setDateFormat("7d")}>1 week</button>
                <button className={renderButtonSelect("1y")} onClick={() => setDateFormat("1y")}>1 year</button>
            </div>
        </div>
    )
}