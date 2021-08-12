import Card from "react-bootstrap/Card";

import "../MainCSS.css"
import Chart from "react-apexcharts";
import {useEffect, useState} from "react";
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Charts
import CumulativeReturnChart from "./Charts/CumulativeReturn";

const RobotReturn = (props) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
            axios.get(props.server + 'robots/cumulative_ret/', {
                params: {
                    robot: props.robot,
                    start_date: props.start_date,
                    end_date: props.end_date
                }
            })
                .then(response => response['data'].map(data => data))
                .then(data => setChartData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Card className="card">
            <Card.Title className="card-header-first">Return</Card.Title>
            <Card.Body style={{padding: '0px'}}>
                <Row style={{height: '100%'}}>
                    <Col style={{height:'100%'}}>
                        <div style={{padding: '0px', height: '100%'}}>
                            <CumulativeReturnChart data={chartData}/>
                        </div>
                    </Col>
                    {/*<Col>*/}

                    {/*</Col>*/}
                    {/*<Col>*/}
                    {/*    <p>Average winning day %</p>*/}
                    {/*    <p>Average loosing day %</p>*/}
                    {/*    <p>Payoff</p>*/}
                    {/*    <p>Profit factor</p>*/}
                    {/*</Col>*/}
                </Row>

            </Card.Body>
        </Card>
    );
};

export default RobotReturn;