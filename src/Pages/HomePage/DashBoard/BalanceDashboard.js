import CardWidget from "../../../components/CardWidget";
import PieCharts from "../../../components/Charts/PieCharts";
import HomePeriodsPnlsCharts from "../HomePageCharts/HomePeriodsPnlsCharts";
// Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from "react";
import axios from "axios";

const BalanceDashBoard = (props) => {
    const [responseData, setResponseData] = useState([]);
    const [chData, setChData] =  useState([])//balanceData.map(data=>data['y'])
    const [labelData, setLabelData] =  useState([])//balanceData.map(data=>data['x'])
    const totalBalance = chData.reduce((a, b) => a + b, 0)
    console.log(responseData)
    useEffect(() => {
            axios.get(props.server + 'home/total_robot_balances_by_date/',{
                params: {
                    env: props.env,
                }})
                .then(response => setResponseData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Row style={{height: '100%', width: '100%', margin: '0px', padding: '0px'}}>
            <Col style={{height: '100%'}}>
                <HomePeriodsPnlsCharts data={responseData} horizontal={false} xLabel={true} title={'Total Balance'}/>
            </Col>
        </Row>
    );
};

export default BalanceDashBoard;