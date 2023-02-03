
const ExposureChartConfig = (data) => {
    return {
            options: {
                chart: {
                    toolbar: false,
                    id: 'exposure-chart',
                    type:'bar'
                },
                // stroke: {
                //     curve: 'smooth',
                // },
                // colors: props.colors,
                xaxis: {
                    categories: data['name'],
                    labels: {
                        show: true,
                        style: {
                            colors: [],
                            fontSize: '8px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            cssClass: 'apexcharts-xaxis-label',
                        },
                    },
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
                    // text: "Exposures",
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
                annotations: {
                    yaxis: [
                        {
                            y: -5,
                            borderColor: '#BF4737',
                            label: {
                                borderColor: '#BF4737',
                                style: {
                                    color: '#fff',
                                    background: '#BF4737'
                                },
                                text: '-5%'
                            }
                        },
                    ]
                },
                dataLabels: {
                    enabled: false
                },
            },
            series: [
                {
                    name: 'Return to Robot',
                    data: data['ret']
                },
                {
                    name: 'Return to Total',
                    data: data['ret_to_total']
                }
            ]
        }
}
export default ExposureChartConfig;