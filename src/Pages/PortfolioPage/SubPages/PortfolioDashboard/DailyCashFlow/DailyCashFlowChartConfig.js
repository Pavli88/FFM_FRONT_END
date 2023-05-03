const DailyCashFlowChartConfig = (data) => {
    return{

        options: {
            chart: {
                toolbar: false,
                type: 'bar',
                stacked: true,
            },
            xaxis: {
                categories: data.dates,
                labels: {show: false},
                axisBorder: {
                    show: false,
                    color: '#78909C',
                    height: 1,
                    width: '100%',
                    offsetX: 0,
                    offsetY: 0
                },
                axisTicks: {
                    show: false,
                    borderType: 'solid',
                    color: '#78909C',
                    height: 6,
                    offsetX: 0,
                    offsetY: 0
                },
            },
            // title: {
            //     // text: "Total Drawdown",
            //     align: 'left',
            //     margin: 10,
            //     offsetX: 0,
            //     offsetY: 0,
            //     floating: false,
            //     style: {
            //         fontSize: '14px',
            //         fontWeight: 'bold',
            //         fontFamily: undefined,
            //         color: '#263238'
            //     },
            // },
            yaxis: [
                {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(2);
                        }
                    },
                }
            ],
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
        },
        series: data.series
        }
}
export default DailyCashFlowChartConfig;