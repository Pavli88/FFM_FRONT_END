import {useEffect, useState} from "react";
import axios from "axios";
import CardWidget from "../../components/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ApexChart from "../../components/Charts";
import SliderWidget from "../../components/SliderWidget";

const RobotStatCards = (props) => {

    const balanceRequestData = {
        'env': props.environment,
        'start_date': 21,
        'end_date': 34,
    };

    // Fetching Robot balance data
    const [robotBalanceData, setRobotBalanceData] = useState([]);

    useEffect(() => {
            axios.get(props.server + 'robots/get_robot_balance/' + props.env, {params:balanceRequestData})
                .then(response => response['data'])
                .then(data => setRobotBalanceData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    // Fetching robot risk data
    const [robotRiskData, setRobotRiskData] = useState([]);

    useEffect(() => {
            axios.get(props.server + 'risk/get_robot_risk/' + props.env)
                .then(response => response['data'])
                .then(data => setRobotRiskData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    const widgetData = {
        balance: robotBalanceData,
        risk: robotRiskData,
    };
    console.log(widgetData)

    const chartData = robotBalanceData.map((record, index) =>
        <CardWidget key={record['id']} style={{height: '300px', width: '95%', margin: '5px', padding:'0px'}} name={record['robot']} button={'Test'} >
            <Row style={{height: '100%'}}>
                <Col>
                    <ApexChart chartType="line" xdata={record['date']} ydata={record['balance']}/>
                </Col>
                <Col>
                    <SliderWidget defaultValue={0.01}/>
                </Col>
            </Row>
        </CardWidget>
    );

    return (
        <div>
            {chartData}
        </div>
    );
};

export default RobotStatCards;
