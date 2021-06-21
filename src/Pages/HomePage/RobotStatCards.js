import {useEffect, useState} from "react";
import axios from "axios";
import CardWidget from "../../components/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ApexChart from "../../components/Charts";
import SliderWidget from "../../components/SliderWidget";
import Card from "react-bootstrap/Card";

const RobotStatCards = (props) => {

    const balanceRequestData = {
        'env': props.env,
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

        <Card className={'shadow-sm'} key={record['id']} style={{marginTop: '5px', marginBottom: '5px', marginRight: '5px', height: '300px'}}>
            <Card.Header as="h6">{record['robot']}</Card.Header>
            <Card.Body style={{padding: '0px'}}>
                <Row style={{height: '100%', width: '100%', margin: '0px'}}>
                    <Col style={{padding: '0px'}}>
                        <ApexChart chartType="line" xdata={record['date']} ydata={record['balance']}/>
                    </Col>
                    <Col>

                    </Col>
                    <Col>
                        <SliderWidget defaultValue={0.01}/>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );

    return (
        <Container className={"border"} style={{padding: '0px', overflow: 'scroll', height:'800px'}}>
            {chartData}
        </Container>
    );
};

export default RobotStatCards;
