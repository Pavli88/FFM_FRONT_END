import Chart from "react-apexcharts";


const ApexChart = (props) => {
    const state = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: props.xdata
            }
        },
        series: [
            {
                name: "series-1",
                data: props.ydata
            }
        ]
    };

    return (
            <Chart
                options={state.options}
                series={state.series}
                type={props.chartType}
                width="500"
            />
        );
}

export default ApexChart;
