import HomePageBarChart from "../HomePageCharts/HomePageBarChart";
// Bootstrap Imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from "react";
import axios from "axios";

const TopLevel = (props) =>{
    const [responseData, setResponseData] = useState([]);
    const findCumulativeSum = arr => {
        const creds = arr.reduce((acc, val) => {
            let {sum, res} = acc;
            sum += val;
            res.push(sum);
            return {sum, res};
        }, {
            sum: 0,
            res: []
        });
        return creds.res;
    };
    useEffect(() => {
            axios.get(props.server + 'home/daily_robot_balances', {
                params: {
                    env: props.env,
                }
            })
                .then(response => setResponseData(response['data'].map(data=>data['y'])))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    return (
        <Row style={{height: '600px', width: '100%', margin: '0px', padding: '0px'}}>
            <Col style={{height: '100%', width: '50%'}}>
                <HomePageBarChart data={findCumulativeSum(responseData)} title={'Total Cumulative Year to Date P&L'}/>
            </Col>
            <Col style={{height: '100%', width: '50%'}}>
                <HomePageBarChart data={responseData} title={'Daily P&L'}/>
            </Col>
        </Row>
    )
};

export default TopLevel;