import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chart from "react-apexcharts";
import {useEffect, useState} from "react";
import axios from "axios";

const RobotDailyReturns = (props) => {
    const [chartData, setChartData] = useState([]);
    const dailyReturnList = chartData.map(data => Math.round(data['ret']*10000)/100)
    useEffect(() => {
            axios.get(props.server + 'robots/get_balance/', {
                params: {
                    robot: props.robot,
                    start_date: props.start_date,
                    end_date: props.end_date
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
                        y: -5,
                        borderColor: '#BF4737',
                        label: {
                            borderColor: '#BF4737',
                            style: {
                                color: '#fff',
                                background: '#BF4737'
                            },
                            text: 'Daily Risk Limit'
                        }
                    }
                ]
            },
            xaxis: {
                categories: [],
                labels: {show: false}
            },
            yaxis: [
                {
                    tickAmount: 10,
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(0);
                        }
                    }
                }
            ],
            dataLabels: {
                enabled: false,
                textAnchor: 'middle',
                style: {
                    fontSize: '14px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 'bold',
                    colors: undefined
                },
            },
        },
        series: [
            {
                name: "Daily Retur",
                data: dailyReturnList,
            }
        ]
    };

    return (
        <Card className="card" style={{margin: '0px'}}>
            <Card.Title className="card-header-first">Daily Returns</Card.Title>
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

export default RobotDailyReturns;