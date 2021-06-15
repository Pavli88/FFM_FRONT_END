import {useEffect, useState} from "react";
import axios from "axios";
import CardWidget from "../../components/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ApexChart from "../../components/Charts";
import SliderWidget from "../../components/SliderWidget";

const RobotStatCards = (props) => {
    const [robotBalanceData, setRobotBalanceData] = useState([]);

    const balanceRequestData = {
        'env': props.environment,
        'start_date': 21,
        'end_date': 34,
    };

    console.log(balanceRequestData)
    useEffect(() => {
            axios.get('http://127.0.0.1:8000/robots/get_robot_balance/all', {params:balanceRequestData})
                .then(response => response['data'])
                .then(data => setRobotBalanceData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );


    const chartData = robotBalanceData.map((record) =>
        <CardWidget key={record['id']} height={'300px'} width={'95%'} name={record['robot']} button={'Test'} >
            <Row style={{height: '100%'}}>
                <Col>
                    <ApexChart  chartType="line" xdata={record['date']} ydata={record['balance']}/>
                </Col>
                <Col>
                    <SliderWidget/>
                </Col>
            </Row>
        </CardWidget>
    );

    return (
        <div style={{width:'100%', overflow: 'scroll', margin:'0px'}}>
            {chartData}
        </div>
    );
};

export default RobotStatCards;
