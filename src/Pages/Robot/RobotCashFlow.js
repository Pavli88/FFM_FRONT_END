import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Chart from "react-apexcharts";

import "../MainCSS.css"
import {useEffect, useState} from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";

const RobotCashFlow = (props) => {

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
            dataLabels: {
                enabled: false
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
            <Card.Title className="card-header-first">Cash Flow History</Card.Title>
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

export default RobotCashFlow;