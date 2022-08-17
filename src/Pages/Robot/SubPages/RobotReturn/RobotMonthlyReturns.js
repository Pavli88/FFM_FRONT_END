import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chart from "react-apexcharts";
import {useEffect, useState} from "react";
import axios from "axios";

const RobotMonthlyReturns = (props) => {
    const [monthlyChartData, setMonthlyChartData] = useState([]);
    useEffect(() => {
            axios.get(props.server + 'robots/monthly_returns_calc/', {
                params: {
                    robot: props.robot,
                    year: '2022'
                }
            })
                .then(response => setMonthlyChartData(response['data']))
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
            colors: [function(value){
                if (value['value'] < 0){
                    return '#E32227'
                }else {
                    return '#007500'
                }
            }],
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
                            text: 'Monthly Risk Limit'
                        }
                    }
                ]
            },
            xaxis: {
                // categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                // labels: {show: true}
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
                name: "Monthly Return",
                data: monthlyChartData,
            }
        ]
    };
    return (
        <Card className="card" style={{margin: '0px'}}>
            <Card.Title className="card-header-first">Monthly Returns</Card.Title>
            <Card.Body style={{padding: '0px'}}>
                <Row style={{height: '100%', width: '100%', margin: '0px'}}>
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
    );
};
export default RobotMonthlyReturns;