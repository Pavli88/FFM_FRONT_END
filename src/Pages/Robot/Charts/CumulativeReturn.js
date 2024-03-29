import Chart from "react-apexcharts";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

const CumulativeReturnChart = (props) => {
        const chartOptions = {
        options: {
            chart: {
                type: 'area',
                toolbar: false,
                id: "basic-bar",
                zoom: {
            enabled: false
          }
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
            title: {
                text: 'Cumulative Performance',
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
                    }
                }
            ],
            dataLabels: {
                enabled: false
            },

        },
        stroke: {
          curve: 'straight'
        },
        title: {
            text: 'Cumulative Return',
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                // fontFamily: undefined,
                color: '#263238'
            },
        },

        series: props.series
    };
    return (
        <div style={{width: '100%', height: '100%', paddingTop: '10px', paddingLeft: '0px'}}>
            <Card className="card" style={{margin: '0px'}}>
                <Card.Body style={{padding: '0px'}}>
                    <Row style={{height: '100%', width: '100%', margin: '0px'}}>
                        <Col style={{height: '100%'}}>
                            <div style={{padding: '0px', height: '100%'}}>
                                <Chart
                                    options={chartOptions.options}
                                    series={chartOptions.series}
                                    type={'area'}
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CumulativeReturnChart;