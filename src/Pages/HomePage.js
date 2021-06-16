import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card';
import SliderWidget from "../components/SliderWidget";

import {useEffect, useState, useContext} from "react";

import RobotStatCards from "./HomePage/RobotStatCards";

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import axios from "axios";

// Contexts
import EnvContext from "../context/env-context";
import ServerContext from "../context/server-context";

const HomePage = (props) => {
    // Context variables
    const env = useContext(EnvContext)['environment'];
    const server = useContext(ServerContext)['server'];

    // const [robotEnvData, setRobotEnvData] = useState('live')


    const balanceRequestData = {
        'env': 'live',
        'start_date': 21,
        'end_date': 34,
    };

    // console.log(balanceRequestData)
    // console.log(robotRiskData)


    return (
            <Container style={{background: 'red', width: "100%", height: window.innerHeight}} fluid>
            <Row style={{background: 'green', height: window.innerHeight}}>
                <Col style={{background: 'blue', height: '100%'}}>
                    <Row style={{background:'red'}}>
                        <h2>Robots</h2>
                    </Row>
                    <Container style={{background:'orange', width:'100%', height:window.innerHeight, overflow: 'scroll'}}>
                        <RobotStatCards env={env} server={server}/>
                    </Container>

                </Col>
                <Col style={{}}>
                    <Row style={{background:'yellow'}}>
                        <h2>Dashboard</h2>
                    </Row>
                    <Container style={{width:'100%'}}>
                        <Row style={{height: '300px', paddingTop: '5px', paddingBottom: '5px'}}>
                            <Col style={{paddingLeft: '5px', paddingRight: '5px'}}>
                                <Card style={{height: '100%', width: '100%', margin: '0px'}}/>
                            </Col>
                            <Col style={{paddingLeft: '5px', paddingRight: '5px'}}>
                                <Card style={{height: '100%', width: '100%', margin: '0px'}}/>
                            </Col>
                            <Col style={{paddingLeft: '5px', paddingRight: '5px'}}>
                                <Card style={{height: '100%', width: '100%', margin: '0px'}}/>
                            </Col>
                        </Row>
                        <Row style={{height: '50px', paddingTop: '5px', paddingBottom: '5px'}}>
                            <Col style={{paddingLeft: '5px', paddingRight: '5px'}}>
                                <Card style={{height: '100%', width: '100%', margin: '0px'}}/>
                            </Col>
                            <Col style={{paddingLeft: '5px', paddingRight: '5px'}}>
                                <Card style={{height: '100%', width: '100%', margin: '0px'}}/>
                            </Col>
                            <Col style={{paddingLeft: '5px', paddingRight: '5px'}}>
                                <Card style={{height: '100%', width: '100%', margin: '0px'}}/>
                            </Col>
                        </Row>
                        <Row style={{height: '300px', paddingTop: '5px', paddingBottom: '5px'}}>
                            <Col style={{paddingLeft: '5px', paddingRight: '5px'}}>
                                <Card style={{height: '100%', width: '100%', margin: '0px'}}/>
                            </Col>
                        </Row>
                    </Container>

                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;