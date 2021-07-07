import {useState, useEffect, useContext} from "react";

import NewRobotForm from "./Robot/NewRobotForm";
import RobotTable from "./Robot/RobotTable";
import BalanceCalculation from "./Robot/BalanceCalculation";
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
import {Card} from "react-bootstrap";

const RobotPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];

    return (
        <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '20px'}} fluid>
            <Row>
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