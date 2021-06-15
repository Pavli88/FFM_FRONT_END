import Chart from "react-apexcharts";


const ApexChart = (props) => {
    const state = {
        options: {
            chart: {
                toolbar: false,
                id: "basic-bar"
            },
            xaxis: {
                categories: props.xdata,
                labels: {show: false}
            },
            dataLabels: {
                enabled: false
            },

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
                width="100%"
                height="100%"
            />

        );
}

export default ApexChart;
