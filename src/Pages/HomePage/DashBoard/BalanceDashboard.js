
// Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";

import Chart from "react-apexcharts";
import axios from "axios";
import {useContext, useEffect, useState} from "react";

import HomePageReportDateContext from "../contexts/HomePageReportDateContext";

const BalanceDashBoard = (props) => {
    const requestParameters = useContext(HomePageReportDateContext)['requestParameters'];
    const robotColors = requestParameters['robots'].map((data) => data['color']);
    const [responseData, setResponseData] = useState([]);
    const [chData, setChData] =  useState([]);
    const [labelData, setLabelData] =  useState([]);
    const totalBalance = chData.reduce((a, b) => a + b, 0);
    const pieChartData = responseData.map((data) => data['y']);
    const pieChartLabels = responseData.map((data) => data['x']);
    useEffect(() => {
            axios.get(props.server + 'home/robot_balances_by_date/',{
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
                stacked: true,
                type: 'bar'
            },
            plotOptions: {
                bar: {
                    columnWidth: '60%'
                }
            },
            colors: ['#1D4464'],
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
            // annotations: {
            //     yaxis: [
            //         {
            //             y: 0,
            //             borderColor: '#BF4737',
            //             label: {
            //                 borderColor: '#BF4737',
            //                 style: {
            //                     color: '#fff',
            //                     background: '#BF4737'
            //                 },
            //             }
            //         }
            //     ]
            // },
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
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Actual', 'Expected'],
          markers: {
            fillColors: ['#00E396', '#775DD0']
          }
        },
        series: [{
            data: responseData
        },
            // {
            // data: [
            //     {
            //         x: 'WTI',
            //         y: 8.032,
            //         goals: {
            //             name: 'Treshold',
            //             value: 183.62,
            //             strokeColor: '#78909C'
            //         }
            //     },
            //     {
            //         x: 'EUR',
            //         y: 5.91,
            //         goals: {
            //             name: 'Treshold',
            //             value: 172.72,
            //             strokeColor: '#78909C'
            //         }
            //     },
            //     {
            //         x: 'Silver',
            //         y: -5,
            //         goals: {
            //             name: 'Treshold',
            //             value: -10,
            //             strokeHeight: 5,
            //             strokeColor: '#78909C'
            //         }
            //     },
            // ]
        // }

            // {
            //     name: "Aggregated Robot Profit and Loss",
            //     data: responseData,
            // }
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
            colors: robotColors,
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
            </Col>
        </Row>
    );
};

export default BalanceDashBoard;