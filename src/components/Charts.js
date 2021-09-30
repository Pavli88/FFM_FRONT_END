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
            yaxis: [
                {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(0);
                        }
                    }
                }
            ],
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
                height="80%"
            />
        );
}

export default ApexChart;
