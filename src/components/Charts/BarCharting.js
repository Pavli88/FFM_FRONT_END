import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chart from "react-apexcharts";


const BarCharting = (props) => {
    // const yMax = Math.max(...props.data);
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
            colors: props.colors,
            xaxis: {
                categories: props.xData,
                labels: {show: true}
            },
            title: {
                text: props.title,
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
                    tickAmount: 1,
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
                enabled: true,
                enabledOnSeries: [0],
                distributed: true,
                style: {
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 'bold',
                    colors: ['white']
                },
                textAnchor: 'middle',
                background: {
                    enabled: true,
                    foreColor: '#ffh',
                    padding: 4,
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: 'white',
                    opacity: 0.9,
                    dropShadow: {
                        enabled: false,
                        top: 1,
                        left: 1,
                        blur: 1,
                        color: '#000',
                        opacity: 0.45
                    }
                },
                dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#000',
                    opacity: 0.45
                }
            },
        },
        series: [
            {
                name: "Aggregated Robot Profit and Loss",
                data: props.data,
            }
        ]
    };

    return (
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

export default BarCharting;