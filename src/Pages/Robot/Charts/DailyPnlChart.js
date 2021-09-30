import Chart from "react-apexcharts";
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const DailyPnlChart = (props) => {

    const chartOptions = {
        options: {
            chart: {
                toolbar: false,
                id: "basic-bar"
            },

            xaxis: {
                categories: [],
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
            yaxis: [
                {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(0);
                        }
                    }
                }
            ],
            grid: {
                show: false,
                borderColor: '#90A4AE',
                strokeDashArray: 0,
                position: 'back',
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                },
                row: {
                    colors: undefined,
                    opacity: 0.5
                },
                column: {
                    colors: undefined,
                    opacity: 0.5
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
            },
            dataLabels: {
                enabled: false
            },

        },

        title: {
            text: 'Cumulative Return',
            align: 'left',
            margin: 0,
            offsetX: 100,
            offsetY: 100,
            floating: false,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                // fontFamily: undefined,
                color: '#263238'
            },
        },

        series: [
            {
                name: "series-1",
                data: props.data,
            }
        ]
    };

    return (
        <Card className="card">
            <Card.Title className="card-header-first">Daily P&L</Card.Title>
            <Card.Body style={{padding: '0px'}}>
                <Row style={{height: '100%'}}>
                    <Col style={{height: '100%'}}>
                        <div style={{padding: '0px', height: '100%'}}>
                            <Chart
                                options={chartOptions.options}
                                series={chartOptions.series}
                                type={'bar'}
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default DailyPnlChart;