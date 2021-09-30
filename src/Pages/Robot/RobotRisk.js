import Card from "react-bootstrap/Card";

import "../MainCSS.css"
import {useEffect, useState} from "react";
import axios from "axios";
import Chart from "react-apexcharts";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const RobotRisk = (props) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
            axios.get(props.server + 'robots/drawdown/', {
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
                data: chartData,
            }
        ]
    };

    return (
        <Card className="card">
            <Card.Title className="card-header-first">Risk</Card.Title>
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
    );
};

export default RobotRisk;