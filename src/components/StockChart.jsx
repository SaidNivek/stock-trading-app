import Chart from "react-apexcharts";

// Call in the props that are passed into chart data and destructure them instead of using props
export const StockChart = ({chartData, symbol}) => {
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
        }
    }

    const series = [{
        name: symbol,
        data: day
    }]

    return (
        <div className="mt-5 p-4 shadow-sm bg-white">
            <Chart 
                options={options}
                series={series}
                type="area"
                width="100%"
            />
        </div>
    )
}