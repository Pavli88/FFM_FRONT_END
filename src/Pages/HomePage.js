import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card';
import SliderWidget from "../components/SliderWidget";

import {useEffect, useState} from "react";

import RobotStatCards from "./HomePage/RobotStatCards";

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import axios from "axios";


const HomePage = () => {

    const [robotEnvData, setRobotEnvData] = useState('live')
    const [robotRiskData, setRobotRiskData] = useState([])

    const envChange = (envValue) => {
        setRobotEnvData(envValue);
    };

    const balanceRequestData = {
        'env': 'live',
        'start_date': 21,
        'end_date': 34,
    };

    console.log(balanceRequestData)
    console.log(robotRiskData)
    useEffect(() => {
            axios.get('http://127.0.0.1:8000/risk/get_robot_risk/' + robotEnvData)
                .then(response => response['data'])
                .then(data => setRobotRiskData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, []
    );

    return (
        <Container style={{background: 'red', width: "90%", height: '100%'}} fluid>
            <Row>
                <h2>{robotEnvData}</h2>
                <Dropdown onSelect={envChange}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Environment
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="live">Live</Dropdown.Item>
                        <Dropdown.Item eventKey="demo">Demo</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
            <Row style={{background: 'green', height: "100%"}}>
                <Col style={{background: 'blue', height: "100%"}}>
                    <Row>
                        <h2>Robots</h2>
                    </Row>
                    <Row style={{background:'orange', width:'100%', height:'500px', margin:'0px'}}>
                        <RobotStatCards environment={robotEnvData}/>
                    </Row>

                </Col>
                <Col>
                    <Card style={{height: '300px', width: '100%', margin: '5px'}}>
                        <SliderWidget name={'Risk on Trade'}/>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;