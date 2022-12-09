import HomePageBarChart from "../HomePageCharts/HomePageBarChart";
import AllRobotsPnlsChart from "../HomePageCharts/AllRobotsPnlsChart";

// Bootstrap Imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from "react";
import axios from "axios";



const TopLevel = (props) =>{
    const [responseData, setResponseData] = useState([{}]);
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
            axios.get(props.server + 'robots/get/pnls/', {
                params: {
                    env: props.env,
                }
            })
                .then(response => response['data']['data'].map(data => data))
                .then(data => setResponseData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    return (
        <Row style={{height:'100%', width: '100%', margin: '0px', paddingLeft: '0px'}}>
            <Col style={{height: '100%', width: '50%', paddingLeft: '15px'}}>
                <AllRobotsPnlsChart data={responseData}/>
                {/*<HomePageBarChart data={findCumulativeSum(responseData)} title={'Total Cumulative Year to Date P&L'} id={'aggregated-pnl-chart'} type={'area'}/>*/}
            </Col>
            <Col style={{height: '100%', width: '50%'}}>
                <AllRobotsPnlsChart data={responseData}/>
                {/*<HomePageBarChart data={responseData} title={'Daily P&L'} id={'daily-aggregated-pnl-chart'} type={'bar'}/>*/}
            </Col>
        </Row>
    )
};

export default TopLevel;