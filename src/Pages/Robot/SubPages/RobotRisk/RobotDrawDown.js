import Card from "react-bootstrap/Card";
import { useEffect, useState} from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const RobotDrawDown = (props) => {
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
            axios.get(props.server + 'robots/get/drawdown/', {
                params: {
                    robot_id: props.robotData['id'],
                    start_date: props.startDate,
                    end_date: props.endDate,
                }
            })
                .then(response => response['data'].map(data=>data))
                .then(data=>setChartData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    const chartOptions = {
        options: {
            chart: {
                toolbar: false,
                id: "basic-bar"
            },
            xaxis: {
                categories: [],
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
            annotations: {
                yaxis: [
                    {
                        y: -10,
                        borderColor: '#BF4737',
                        label: {
                            borderColor: '#BF4737',
                            style: {
                                color: '#fff',
                                background: '#BF4737'
                            },
                            text: 'Drawdown Limit 1'
                        }
                    }
                ]
            },
            title: {
                text: 'Drawdown',
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
            dataLabels: {
                enabled: false
            },

        },
        series: [
            {
                name: "Drawdown",
                data: chartData,
            }
        ]
    };
    return (
        <div style={{width: '100%', height: '100%', paddingTop: '10px', paddingLeft: '0px'}}>
            <Card className="card" style={{margin: '0px'}}>
                <Card.Body style={{padding: '0px'}}>
                    <Row style={{height: '100%'}}>
                        <Col style={{height: '100%'}}>
                            <Chart
                                options={chartOptions.options}
                                series={chartOptions.series}
                                type={'bar'}
                                width="100%"
                                height="100%"
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default RobotDrawDown;