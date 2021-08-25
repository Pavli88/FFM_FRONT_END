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
import RobotTrades from "./Robot/RobotTrades";
import RobotPricing from "./Robot/RobotPricing";
import RobotProcesses from "./Robot/RobotProcesses";

import axios from "axios";

// Bootstrap
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Context
import ServerContext from "../context/server-context";
import EnvContext from "../context/env-context";
import RobotContext from "../context/robot-context";
import {Card} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const RobotPage = (props) => {
    // Date variables
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];
    const defaultRobots = useContext(RobotContext)['robots'];

    const [robot, setRobot] = useState(defaultRobots[0]['name']);
    const [startDate, setStartDate] = useState(firstDay.toISOString().substr(0,10));
    const [endDate, setEndDate] = useState(date.toISOString().substr(0,10));

    const changeRobot = (rob) => {
        setRobot(rob);
    };

    const startDateHandler = (event) => {
        setStartDate(event.target.value);
    };

    const endDateHandler = (event) => {

        if (event.target.value < startDate) {
            alert('End date can not be less then start date!');
        }else {
            setEndDate(event.target.value);
        };
    };

    return (
        <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '20px'}} fluid>
            <Row style={{height: '60px', padding: '5px', display: 'flex', margin: '5px'}}>
                <Col style={{padding: '0px', height: '100%', display: 'flex'}}>
                    <Col style={{height: '100%', display: 'block'}}>
                        <RobotNav robots={defaultRobots}
                                  server={server}
                                  env={env}
                                  robotChange={changeRobot}
                        />
                    </Col>
                    <Col style={{height: '100%'}}>
                        <Form.Group as={Row}>
                            <Form.Label className="form-label-first" column sm={2}>
                                From
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="date" onChange={startDateHandler} defaultValue={startDate}/>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col style={{height: '100%'}}>
                        <Form.Group as={Row}>
                            <Form.Label className="form-label-first" column sm={2}>
                                To
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="date" onChange={endDateHandler} defaultValue={endDate}/>
                            </Col>
                        </Form.Group>
                    </Col>
                </Col>
                <Col style={{padding: '0px', height: '100%', width:'100%', display: 'flex'}}>
                    <Row style={{width: '100%'}}>
                        <Col style={{display: 'flex'}}>
                            <Col>
                                <Form.Group className="mb-2">
                                    <Form.Check type="checkbox" label="All"/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Check type="checkbox" label="Since Inception"/>
                                </Form.Group>
                            </Col>
                            <Col style={{height: '100%'}}>
                                <BalanceCalculation server={server} robot={robot} start_date={startDate}
                                                    end_date={endDate}/>
                            </Col>
                            <Col style={{height: '100%'}}>
                                <RobotPricing server={server} robot={robot} start_date={startDate}
                                              end_date={endDate}/>
                            </Col>
                        </Col>
                        <Col style={{display: 'flex'}}>
                            <Col style={{height: '100%'}}>
                                <NewRobotForm server={server} style={{height: '400px'}}/>
                            </Col>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/*// General Info*/}

            <RobotDetails server={server} robot={robot} default={defaultRobots[0]}/>

            <RobotBalance robot={robot} start_date={startDate} end_date={endDate} server={server}/>

            {/*// Risk and Return*/}
            <Row style={{height:'500px', padding:'5px'}}>
                <Col style={{height:'100%', width:'50%'}}>
                    <RobotReturn robot={robot} start_date={startDate} end_date={endDate} server={server}/>
                </Col>
                <Col style={{height:'100%', width:'50%'}}>
                    <RobotRisk robot={robot} start_date={startDate} end_date={endDate} server={server}/>
                </Col>
            </Row>
            <Row style={{height:'500px', padding:'5px'}}>
                <Col style={{height:'100%'}}>
                    <RobotTrades robot={robot} start_date={startDate} end_date={endDate} server={server}/>
                </Col>
                <Col >
                    <Row style={{height:'100%'}}>
                        <Col style={{height: '100%'}}>
                            <RobotProcesses robot={robot} start_date={startDate} end_date={endDate} server={server}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/*<Row style={{height:'500px', padding:'5px'}}>*/}
            {/*    <Col>*/}
            {/*        <Card>*/}
            {/*            <RobotTable server={server} env={env}/>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </Container>
    );
};

export default RobotPage;