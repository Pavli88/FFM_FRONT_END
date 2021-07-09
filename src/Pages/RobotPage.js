import {useState, useEffect, useContext} from "react";

import RobotDetails from "./Robot/RobotDetails";

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
import Form from "react-bootstrap/Form";
import NewPortfolioForm from "./PortfolioPage/NewPortfolioForm";
import NewPortCashFlow from "./PortfolioPage/NewPortCashFlow";
import PortfolioBuy from "./PortfolioPage/PortfolioBuy";

const RobotPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];
    const [robot, setRobot] = useState('robot');
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);

    const robotSelectHandler = (event) => {
        setRobot(event.target.value);
    };

    const startDateHandler = (event) => {
        setStartDate(event.target.value);
    };

    const endDateHandler = (event) => {
        setEndDate(event.target.value);
    };

    return (
        <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '20px'}} fluid>
            <Row>
                <Col style={{display: 'flex'}}>
                    <Row>
                        <Col>
                            <Form.Group as={Row}>
                                <Form.Label className="form-label-first" column sm={2}>
                                    Robot
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control onChange={robotSelectHandler} as="select">
                                        {}
                                    </Form.Control>

                                </Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Row}>
                                <Form.Label className="form-label-first" column sm={2}>
                                    From
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="date" onChange={startDateHandler}/>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Row}>
                                <Form.Label className="form-label-first" column sm={2}>
                                    To
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="date" onChange={endDateHandler}/>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col>

                </Col>
            </Row>
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