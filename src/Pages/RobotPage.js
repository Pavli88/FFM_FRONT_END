import {useState, useEffect, useContext} from "react";

import NewRobotForm from "./Robot/NewRobotForm";
import RobotTable from "./Robot/RobotTable";
import BalanceCalculation from "./Robot/BalanceCalculation";
import RobotReturn from "./Robot/RobotReturn";
import RobotRisk from "./Robot/RobotRisk";
import RobotDetails from "./Robot/RobotDetails";
import RobotBalance from "./Robot/RobotBalance";
import RobotCashFlow from "./Robot/RobotCashFlow";
import RobotNav from "./Robot/RobotNav";

import axios from "axios";

// Bootstrap
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';

// Context
import ServerContext from "../context/server-context";
import EnvContext from "../context/env-context";
import RobotContext from "../context/robot-context";
import {Card} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const RobotPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];
    const defaultRobots = useContext(RobotContext)['robots'];

    const [robot, setRobot] = useState(defaultRobots[0]['name']);
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);

    console.log(robot)

    const changeRobot = (rob) => {
        setRobot(rob);
    };

    const startDateHandler = (event) => {
        setStartDate(event.target.value);
    };

    const endDateHandler = (event) => {
        setEndDate(event.target.value);
    };

    return (
        <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '20px'}} fluid>
            <Row style={{height: '60px', padding:'5px'}}>
                <Col style={{height:'100%'}}>
                    <RobotNav robots={defaultRobots}
                          server={server}
                          env={env}
                          robotChange={changeRobot}
                />
                </Col>

                <Col style={{height:'100%'}}>
                    <Form.Group as={Row}>
                        <Form.Label className="form-label-first" column sm={2}>
                            From
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="date" onChange={startDateHandler}/>
                        </Col>
                    </Form.Group>
                </Col>
                <Col style={{height:'100%'}}>
                    <Form.Group as={Row}>
                        <Form.Label className="form-label-first" column sm={2}>
                            To
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="date" onChange={endDateHandler}/>
                        </Col>
                    </Form.Group>
                </Col>
                <Col style={{height:'100%'}}>
                    <Form.Group as={Row}>
                        <Form.Label className="form-label-first" column sm={2}>
                            Balance
                        </Form.Label>
                        <Col sm={10}>
                            <BalanceCalculation server={server} robot={robot} start_date={startDate} end_date={endDate}/>
                        </Col>
                    </Form.Group>
                </Col>
                <Col style={{height:'100%'}}>
                    <NewRobotForm server={server} style={{height: '400px'}}/>
                </Col>
                <Col style={{height:'100%'}}>

                </Col>
            </Row>

            {/*// General Info*/}
            <Row style={{height: '200px', padding:'5px'}}>
                <Col style={{height:'100%'}}>
                    <RobotDetails server={server} env={env}/>
                </Col>
                <Col>
                    <RobotBalance/>
                </Col>
                <Col style={{height:'100%'}}>
                    <RobotCashFlow robot={robot} server={server}/>
                </Col>
                <Col>

                </Col>
            </Row>

            {/*// Risk and Return*/}
            <Row style={{height:'500px', padding:'5px'}}>
                <Col>
                    <RobotReturn/>
                </Col>
                <Col>
                    <RobotRisk/>
                </Col>
            </Row>
            <Row style={{height:'500px', padding:'5px'}}>
                <Col>
                    <Card>
                        <Card.Header as="h5">

                        </Card.Header>
                        <RobotTable server={server} env={env}/>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RobotPage;