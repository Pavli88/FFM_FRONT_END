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

    console.log(robot)

    return (
        <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '20px'}} fluid>
            <RobotNav robots={defaultRobots} server={server} env={env}/>

            {/*// General Info*/}
            <Row style={{height: '300px', margin: '5px'}}>
                <Col>
                    <RobotDetails server={server} env={env}/>
                </Col>
                <Col>
                    <RobotBalance/>
                </Col>
                <Col>
                    <RobotCashFlow/>
                </Col>
            </Row>

            {/*// Risk and Return*/}
            <Row style={{height:'500px', margin: '5px'}}>
                <Col>
                    <RobotReturn/>
                </Col>
                <Col>
                    <RobotRisk/>
                </Col>
            </Row>
            <Row style={{height:'500px', margin: '5px'}}>
                <Col>
                    <Card>
                        <Card.Header as="h5">
                            <NewRobotForm server={server} style={{height: '400px'}}/>
                        </Card.Header>
                        <RobotTable server={server} env={env}/>
                    </Card>
                </Col>
                <Col>
                    <BalanceCalculation server={server}/>
                </Col>
            </Row>
        </Container>
    );
};

export default RobotPage;