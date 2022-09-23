import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chart from "react-apexcharts";

const HomePeriodsPnlsCharts = (props) => {
    const totalValue = props.data.map(data => data['y']).reduce((a, b) => a + b, 0)
    console.log(props.data)
    const chartOptions = {
        options: {
            chart: {
                toolbar: false,
            },
            plotOptions: {
                bar: {
                    horizontal: props.horizontal
                }
            },
            colors: [function(value){
                if (value['value'] < 0){
                    return '#E32227'
                }else {
                    return '#007500'
                }
            }],
            xaxis: {
                categories: [],
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
                axisTicks: {
                    show: false,
                    borderType: 'solid',
                    color: '#78909C',
                    height: 6,
                    offsetX: 0,
                    offsetY: 0
                }
            },
            annotations: {
                yaxis: [
                    {
                        y: 0,
                        borderColor: '#BF4737',
                        label: {
                            borderColor: '#BF4737',
                            style: {
                                color: '#fff',
                                background: '#BF4737'
                            },
                        }
                    }
                ]
            },
            title: {
                text: props.title + ' ('  + totalValue.toString() + ')',
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
                    tickAmount: 10,
                    labels: {
                        show: true,
                        style: {
                            colors: [],
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            cssClass: 'apexcharts-yaxis-label',
                        },
                        // formatter: function (val) {
                        //     return val.toFixed(0);
                        // }
                    },
                }
            ],
            dataLabels: {
                enabled: false
            },
        },
        series: [
            {
                name: "Aggregated Robot Profit and Loss",
                data: props.data,
            }
        ]
    };
    return(
        <Card className="card" style={{margin: '0px'}}>
            <Card.Body style={{padding: '0px'}}>
                <Row style={{height: '100%', width: '100%', margin: '0px'}}>
                    <Col style={{height: '100%', width: '100%', margin: '0px'}}>
                        <Chart
                            options={chartOptions.options}
                            series={chartOptions.series}
                            type={'bar'}
                            width="100%"
                            height="90%"
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};
export default HomePeriodsPnlsCharts;