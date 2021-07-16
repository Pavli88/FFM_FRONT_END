import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../MainCSS.css"
import Chart from "react-apexcharts";
import {useEffect, useState} from "react";
import axios from "axios";

const CashHoldings = (props) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
            axios.get(props.server + 'portfolios/get_cash_holdings/', {
                params: {
                    portfolio: props.portfolio,
                    date: props.end_date,
                }
            })
                .then(response => response['data'].map(data=>data['amount']))
                .then(data=>setChartData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    const chartOptions = {
        options: {
              chart: {
                type: 'donut',
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }],
            },

        series: [50.0, 50.0

        ]
    };

    const chartOptions2 = {
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
            dataLabels: {
                enabled: false
            },

        },

        series: [
            {
                name: "USD",
                data: [200,],
            },
            {
                name: "EUR",
                data: [300,],
            }
        ]
    };

    return (
        <Card className="card">
            <Card.Title className="card-header-first">Cash Holdings</Card.Title>
            <Card.Body>
                <Row style={{height:'50%', width:'100%'}}>
                    <Col style={{height:'100%'}}>
                        <div style={{padding:'20px'}}>
                            <Chart
                                options={chartOptions.options}
                                series={chartOptions.series}
                                type={'donut'}
                                width="100%"
                                height="100%"/>

                        </div>
                    </Col>
                </Row>
                <Row style={{height:'50%', width:'100%'}}>
                    <Col style={{height:'100%'}}>
                        <div style={{padding:'20px'}}>
                            <Chart
                                options={chartOptions2.options}
                                series={chartOptions2.series}
                                type={'bar'}
                                width="100%"
                                height="100%"/>

                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default CashHoldings;