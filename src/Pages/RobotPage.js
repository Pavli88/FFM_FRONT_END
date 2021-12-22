import {useState, useEffect, useContext} from "react";

import NewRobotForm from "./Robot/NewRobotForm";
import RobotTable from "./Robot/RobotTable";
import RobotBalanceCalculation from "./Robot/RobotBalanceCalculation";


import RobotBalance from "./Robot/RobotBalance";
import RobotCashFlow from "./Robot/RobotCashFlow";
import RobotNav from "./Robot/RobotNav";

import RobotPricing from "./Robot/RobotPricing";
import RobotProcesses from "./Robot/RobotProcesses";

// Forms
import RobotPricingForm from "./Robot/Calculations/RobotPricingForm";

import axios from "axios";

// Sidebar
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

// Subpages
import RobotDashBoardPage from "./Robot/SubPages/RobotDashboard/RobotDashBoardPage";
import RobotTransactionsPage from "./Robot/SubPages/RobotTransactions/RobotTransactionsPage";
import RobotRiskPage from "./Robot/SubPages/RobotRisk/RobotRiskPage";
import RobotReturnPage from "./Robot/SubPages/RobotReturn/RobotReturnPage";

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
import {Link, Route, Switch} from "react-router-dom";


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
    console.log(robot)
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

    // New robot form
    const [showNewRobot, setNewRobot] = useState(false);
    const showNewRobotForm = () => {
        setNewRobot(true);
    };
    const hideNewRobotForm = () => {
        setNewRobot(false);
    };

    const [showRobotBalanceCalc, setRobotBalanceCalc] = useState(false);
    const showRobotCalcForm = () => {
        setRobotBalanceCalc(true);
    };
    const hideRobotBalanceCalcForm = () => {
        setRobotBalanceCalc(false);
    };

    const [showRobotPricingCalc, setRobotPricingCalc] = useState(false);
    const showRobotPricingForm = () => {
        setRobotPricingCalc(true);
    };
    const hideRobotPricingCalcForm = () => {
        setRobotPricingCalc(false);
    };

    return (
        <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '0px'}} fluid>
            <Row style={{height: '100%', margin:'0px'}}>
                <ProSidebar>
                    <MenuItem style={{padding:'5px'}} ><RobotNav robots={defaultRobots}
                                          server={server}
                                          env={env}
                                          robotChange={changeRobot}
                                />
                    </MenuItem>
                    <Menu iconShape="square">
                        <MenuItem onClick={showNewRobotForm}>New Robot</MenuItem>
                        <MenuItem>Dashboard
                            <Link to="/robot/dashboard"/>
                        </MenuItem>
                        <SubMenu title="Trade">
                            <MenuItem>Robot</MenuItem>
                        </SubMenu>
                        <SubMenu title="Calculations">
                            <MenuItem onClick={showRobotCalcForm}>Balance</MenuItem>
                            <MenuItem onClick={showRobotPricingForm}>Pricing</MenuItem>
                        </SubMenu>
                        <MenuItem>Transactions
                            <Link to="/robot/transactions"/>
                        </MenuItem>
                        <MenuItem>Risk
                            <Link to="/robot/risk"/>
                        </MenuItem>
                        <MenuItem>Return
                            <Link to="/robot/return"/>
                        </MenuItem>
                        <MenuItem>Settings
                            <Link to="/robot/settings"/>
                        </MenuItem>
                    </Menu>
                </ProSidebar>
                <Col style={{width: '50%'}}>
                    <Row style={{height: '60px', width:'50%', padding: '5px', margin: '5px'}}>
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
                    </Row>
                    <Row style={{padding:'15px', height:window.innerHeight, width:'100%',background:'green', margin:'0px'}}>
                        <Switch>
                            <Route path="/robot/dashboard">
                                <RobotDashBoardPage server={server} robot={robot} default={defaultRobots[0]}/>
                            </Route>
                            <Route path="/robot/transactions">
                                <RobotTransactionsPage robot={robot} start_date={startDate} end_date={endDate} server={server}/>
                            </Route>
                            <Route path="/robot/risk">
                                <RobotRiskPage robot={robot} start_date={startDate} end_date={endDate} server={server}/>
                            </Route>
                            <Route path="/robot/return">
                                <RobotReturnPage robot={robot} start_date={startDate} end_date={endDate} server={server}/>
                            </Route>
                        </Switch>
                    </Row>
                </Col>
            </Row>

            {/*<RobotBalance robot={robot} start_date={startDate} end_date={endDate} server={server}/>*/}

            {/*<Row style={{height:'500px', padding:'5px'}}>*/}
            {/*    <Col >*/}
            {/*        <Row style={{height:'100%'}}>*/}
            {/*            <Col style={{height: '100%'}}>*/}
            {/*                <RobotProcesses robot={robot} start_date={startDate} end_date={endDate} server={server}/>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*<Row style={{height:'500px', padding:'5px'}}>*/}
            {/*    <Col>*/}
            {/*        <Card>*/}
            {/*            <RobotTable server={server} env={env}/>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            <NewRobotForm show={showNewRobot} hide={hideNewRobotForm} server={server} style={{height: '400px'}}/>
            <RobotBalanceCalculation show={showRobotBalanceCalc} hide={hideRobotBalanceCalcForm} server={server}
                                     robot={robot} start_date={startDate}
                                     end_date={endDate}/>
            <RobotPricingForm show={showRobotPricingCalc} hide={hideRobotPricingCalcForm} server={server} robot={robot}/>
        </Container>
    );
};

export default RobotPage;