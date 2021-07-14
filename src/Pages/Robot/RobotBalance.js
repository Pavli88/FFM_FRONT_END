import Card from "react-bootstrap/Card";

import "../MainCSS.css"
import {useEffect, useState} from "react";
import axios from "axios";
import Chart from "react-apexcharts";

import BalanceChart from "./Charts/BalanceChart";

const RobotBalance = (props) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
            axios.get(props.server + 'robots/get_balance/', {
                params: {
                    robot: props.robot,
                    start_date: props.start_date,
                    end_date: props.end_date,
                }
            })
                .then(response => response['data'].map(data => data['close_balance']))
                .then(data => setChartData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );


    return (
        <Card className="card">
            <Card.Title className="card-header-first">Balance: {chartData[chartData.length - 1]}</Card.Title>
            <Card.Body style={{padding: '0px'}}>
                <div style={{padding: '0px', height: '100%'}}>
                    <BalanceChart data={chartData}/>
                </div>
            </Card.Body>
        </Card>
    );
};

export default RobotBalance;