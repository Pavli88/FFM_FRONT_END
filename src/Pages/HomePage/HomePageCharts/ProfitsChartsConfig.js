const ProfitsChartsConfig = (data) => {
    return {
        options: {
            chart: {
                toolbar: false,
                id: 'pofits-chart',
                type: 'bar'
            },
            xaxis: {
                categories: data['name'],
                labels: {show: true},
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
            title: {
                text: "Outstanding P&L",
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: '#263238'
                },
            },
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
        },
        series: [
            {
                name: 'Profit',
                data: data['pnl']
            },
        ]
    }
}
export default ProfitsChartsConfig;