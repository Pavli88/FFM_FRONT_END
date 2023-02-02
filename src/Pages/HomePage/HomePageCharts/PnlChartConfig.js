const PnlChartConfig = (data) => {
    return {
        options: {
            chart: {
                toolbar: false,
                id: 'daily_pnl_chart',
                type: 'bar',
                // stacked:true,
            },
            colors: [function (value) {
                if (value['value'] < 0) {
                    return '#E32227'
                } else {
                    return '#007500'
                }
            }],
            annotations: {
                yaxis: [
                    {
                        y: -2.5,
                        borderColor: '#BF4737',
                        label: {
                            borderColor: '#BF4737',
                            position: 'left',
                            style: {
                                color: '#fff',
                                background: '#BF4737'
                            },
                            text: '-2.5 %'
                        }
                    },
                    {
                        y: -5,
                        borderColor: '#BF4737',
                        label: {
                            borderColor: '#BF4737',
                            position: 'left',
                            style: {
                                color: '#fff',
                                background: '#BF4737'
                            },
                            text: '-5%'
                        }
                    },
                ]
            },
            xaxis: {
                categories: data['dates'],
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
            title: {
                text: data['title'],
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
                            return val.toFixed(0);
                        }
                    },
                }
            ],
            dataLabels: {
                enabled: false
            },
        },
        series: [{
            data: data['data']
        }]
    }
}
export default PnlChartConfig;