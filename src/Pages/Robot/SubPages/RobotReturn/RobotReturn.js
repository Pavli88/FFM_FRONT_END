import Card from "react-bootstrap/Card";

import "../../../MainCSS.css"
import Chart from "react-apexcharts";
import {useEffect, useState} from "react";
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Charts
import CumulativeReturnChart from "../../Charts/CumulativeReturn";

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
        <CumulativeReturnChart data={chartData}/>
    );
};

export default RobotReturn;