import {useState, useEffect, useContext} from "react";

import NewRobotForm from "./Robot/NewRobotForm";
import RobotTable from "./Robot/RobotTable";
import RobotBalanceCalculation from "./Robot/Calculations/RobotBalanceCalculation";

import RobotCashFlow from "./Robot/RobotCashFlow";
import RobotNav from "./Robot/RobotNav";

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
import RobotSettingsPage from "./Robot/SubPages/RobotSettings/RobotSettingsPage";

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
import DateContext from "../context/date-context";

// Icons
import { BsFillPlusSquareFill, BsCalculator, BsCash, BsGrid3X2Gap, BsExclamationDiamond, BsBarChart, BsGear, BsCaretRight } from 'react-icons/bs';
import { TiCalculator, TiChartPieOutline } from "react-icons/ti";

const RobotPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];
    const defaultRobots = useContext(RobotContext)['robots'];
    const [robot, setRobot] = useState(defaultRobots[0]['name']);

    const changeRobot = (rob) => {
        setRobot(rob);
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
                    <Menu iconShape="square">
                        <SubMenu title="Robot" icon={<BsCaretRight size={20} className="rounded-circle"/>}>
                            <MenuItem style={{padding: '5px'}}><RobotNav robots={defaultRobots}
                                                                         server={server}
                                                                         env={env}
                                                                         robotChange={changeRobot}
                            />
                            </MenuItem>
                        </SubMenu>
                        <MenuItem onClick={showNewRobotForm}
                                  icon={<BsFillPlusSquareFill size={20} className="rounded-circle"/>}>New
                            Robot</MenuItem>
                        <MenuItem icon={<TiChartPieOutline size={20}/>}>Dashboard
                            <Link to="/robot/dashboard"/>
                        </MenuItem>
                        <SubMenu title="Trade" icon={<BsCash size={20}/>}>
                            <MenuItem>Robot</MenuItem>
                        </SubMenu>
                        <SubMenu title="Calculations" icon={<BsCalculator size={20} className="rounded-circle"/>}>
                            <MenuItem onClick={showRobotCalcForm}>Balance</MenuItem>
                            <MenuItem onClick={showRobotPricingForm}>Pricing</MenuItem>
                        </SubMenu>
                        <MenuItem icon={<BsGrid3X2Gap size={20} className="rounded-circle"/>}>Transactions
                            <Link to="/robot/transactions"/>
                        </MenuItem>
                        <MenuItem icon={<BsExclamationDiamond size={20}/>}>Risk
                            <Link to="/robot/risk"/>
                        </MenuItem>
                        <MenuItem icon={<BsBarChart size={20}/>}>Return
                            <Link to="/robot/return"/>
                        </MenuItem>
                        <MenuItem icon={<BsGear size={20}/>}>Settings
                            <Link to="/robot/settings"/>
                        </MenuItem>
                    </Menu>
                </ProSidebar>
                <Col style={{width: '50%'}}>
                    <Row style={{padding:'15px', height:window.innerHeight, width:'100%', margin:'0px'}}>
                        <Switch>
                            <Route path="/robot/dashboard">
                                <RobotDashBoardPage server={server} robot={robot} default={defaultRobots[0]}/>
                            </Route>
                            <Route path="/robot/transactions">
                                <RobotTransactionsPage robot={robot} server={server}/>
                            </Route>
                            <Route path="/robot/risk">
                                <RobotRiskPage robot={robot} server={server}/>
                            </Route>
                            <Route path="/robot/return">
                                <RobotReturnPage robot={robot} server={server}/>
                            </Route>
                            <Route path="/robot/settings">
                                <RobotSettingsPage robot={robot} server={server}/>
                            </Route>
                        </Switch>
                    </Row>
                </Col>
            </Row>
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
                                     robot={robot}/>
            <RobotPricingForm show={showRobotPricingCalc} hide={hideRobotPricingCalcForm} server={server} robot={robot}/>
        </Container>
    );
};

export default RobotPage;