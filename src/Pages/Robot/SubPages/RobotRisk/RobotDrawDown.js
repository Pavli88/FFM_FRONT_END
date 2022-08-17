import Card from "react-bootstrap/Card";

import "../../../MainCSS.css"
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Chart from "react-apexcharts";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DateContext from "../../../../context/date-context";

const RobotDrawDown = (props) => {
    const startDate = useContext(DateContext)['startDate'];
    const endDate = useContext(DateContext)['endDate'];
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
            axios.get(props.server + 'robots/drawdown/', {
                params: {
                    robot: props.robot,
                    start_date: startDate,
                    end_date: endDate,
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
                name: "Drawdown",
                data: chartData,
            }
        ]
    };
    return (
        <Card className="card" style={{margin:'0px'}}>
            <Card.Title className="card-header-first">Drawdown</Card.Title>
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

export default RobotDrawDown;