import AggregatedRobotPnl from "./AggregatedRobotPnl";
import BarCharting from "../../../components/Charts/BarCharting";

// Bootstrap Imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from "react";
import axios from "axios";


const TopLevel = (props) =>{
    const [responseData, setResponseData] = useState([]);
    const dailyPnlData = responseData.map(data=>data['y'])
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
            axios.get(props.server + 'home/daily_robot_balances', )
                .then(response => setResponseData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    return(
        <Row>
            <Row style={{height: '300px', width:'100%', margin:'0px', padding:'10px'}}>
                <BarCharting data={findCumulativeSum(dailyPnlData)} title={'Total Cumulative PnL - YTD'} horizontal={false}/>
            </Row>
            <Row style={{height: '300px', width:'100%', margin:'0px', padding:'10px'}}>
                <BarCharting data={dailyPnlData} title={'Daily Total Robot PnL - YTD'} horizontal={false}/>
            </Row>
        </Row>
    )
};

export default TopLevel;