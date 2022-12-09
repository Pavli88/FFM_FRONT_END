import PieChartFull from "../../../components/Charts/PieChartFull";

// Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";

const BalanceDashBoard = (props) => {
    const [responseData, setResponseData] = useState([]);
    const [chData, setChData] =  useState([]);
    const [labelData, setLabelData] =  useState([]);
    const totalBalance = chData.reduce((a, b) => a + b, 0);
    const pieChartData = responseData.map((data) => data['y']);
    const pieChartLabels = responseData.map((data) => data['x']);
    console.log(responseData)
    useEffect(() => {
            axios.get(props.server + 'home/total_robot_balances_by_date/',{
                params: {
                    env: props.env,
                }})
                .then(response => setResponseData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    const totalValue = responseData.map(data => data['y']).reduce((a, b) => a + b, 0)
    const balanceChartOptions = {
        options: {
            chart: {
                toolbar: false,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
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
                text: 'Total Balance ('  + totalValue.toString() + ')',
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
                    tickAmount: 5,
                    decimalsInFloat: 0,
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
                data: responseData,
            }
        ]
    };
    const pieChartOptions = {
        options: {
            chart: {
                width: '100%',
                height: '100%',
                type: 'donut',
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return (Math.round(val * 100) / 100) + '%'
                },
            },
            title: {
                text: 'Balance Distribution',
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
            legend: {
                show: false,
                showForSingleSeries: false,
                position: 'top',
            },
            // colors: ['#489F33', '#DB604F'],
            labels: pieChartLabels,
        },
    };
    return (
        <Row style={{height: '100%', width: '100%', margin: '0px', padding: '0px'}}>
            <Col style={{height: '100%', width:'50%', padding:'15px'}}>
                <Card className="card" style={{margin: '0px'}}>
                    <Card.Body style={{padding: '0px'}}>
                        <Row style={{height: '100%', width: '100%', margin: '0px'}}>
                            <Col style={{height: '100%', width: '100%', margin: '0px'}}>
                                <Chart
                                    options={balanceChartOptions.options}
                                    series={balanceChartOptions.series}
                                    type={'bar'}
                                    width="100%"
                                    height="90%"
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            <Col style={{height: '100%', width: '50%', padding: '15px'}}>
                <Card className="card" style={{margin: '0px'}}>
                    <Card.Body style={{padding: '0px'}}>
                        <Row style={{height: '100%', width: '100%', margin: '0px'}}>
                            <Col style={{height: '100%', width: '100%', margin: '0px'}}>
                                <Chart
                                    options={pieChartOptions.options}
                                    series={pieChartData}
                                    type={'donut'}
                                    width="100%"
                                    height="90%"
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                {/*<PieChartFull data={[20, 80]}/>*/}
            </Col>
        </Row>
    );
};

export default BalanceDashBoard;