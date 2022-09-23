import {useState, useEffect, useContext} from "react";

import NewRobotForm from "./Robot/NewRobotForm";
import RobotTable from "./Robot/RobotTable";
import RobotBalanceCalculation from "./Robot/Calculations/RobotBalanceCalculation";
import RobotMonthlyReturnCalculation from "./Robot/Calculations/RobotMonthlyReturnCalculation";

import RobotCashFlow from "./Robot/RobotCashFlow";
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
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";

// Context
import ServerContext from "../context/server-context";
import RobotContext from "../context/robot-context";

import {Link, Route, Switch} from "react-router-dom";
import DateContext from "../context/date-context";

// Icons
import { BsFillPlusSquareFill, BsCalculator, BsCash, BsGrid3X2Gap, BsExclamationDiamond, BsBarChart, BsGear, BsCaretRight } from 'react-icons/bs';
import { TiCalculator, TiChartPieOutline } from "react-icons/ti";

const RobotPage = (props) => {
    const robotData = useContext(RobotContext)['selectedRobotData'];
    const server = useContext(ServerContext)['server'];
    const startDate = useContext(DateContext)['startDate'];
    const endDate = useContext(DateContext)['endDate'];
    const [showNewRobot, setNewRobot] = useState(false);
    const [showRobotPricingCalc, setRobotPricingCalc] = useState(false);
    const [showRobotBalanceCalc, setRobotBalanceCalc] = useState(false);
    const [showRobotMonthlyCalc, setRobotMonthlyCalc] = useState(false);

    return (
            <Container style={{height:window.innerHeight, background: '#FBFAFA', width: "100%", margin: '0px', padding:'0px'}} fluid>
                <Row style={{height:'100%', margin: '0px'}}>
                    <ProSidebar>
                        <Menu iconShape="square">
                            <MenuItem onClick={() => setNewRobot(true)}
                                      icon={<BsFillPlusSquareFill size={20} className="rounded-circle"/>}>New
                                Robot</MenuItem>
                            <MenuItem icon={<TiChartPieOutline size={20}/>}>Dashboard
                                <Link to="/robot/dashboard"/>
                            </MenuItem>
                            <SubMenu title="Trade" icon={<BsCash size={20}/>}>
                                <MenuItem>Robot</MenuItem>
                            </SubMenu>
                            <SubMenu title="Calculations" icon={<BsCalculator size={20} className="rounded-circle"/>}>
                                <MenuItem onClick={() => setRobotBalanceCalc(true)}>Balance</MenuItem>
                                <MenuItem onClick={() => setRobotPricingCalc(true)}>Pricing</MenuItem>
                                <MenuItem onClick={() => setRobotMonthlyCalc(true)}>Monthly Return</MenuItem>
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
                    <Col style={{width:'100%'}}>
                        <Row style={{height:'100%', padding: '0px', width: '100%', margin: '0px'}}>
                            <Switch>
                                <Route path="/robot/dashboard">
                                    <RobotDashBoardPage server={server} robotData={robotData} startDate={startDate}
                                                        endDate={endDate}/>
                                </Route>
                                <Route path="/robot/transactions">
                                    {/*<RobotTransactionsPage robot={robot} server={server}/>*/}
                                </Route>
                                <Route path="/robot/risk">
                                    {/*<RobotRiskPage robot={robot} server={server}/>*/}
                                </Route>
                                <Route path="/robot/return">
                                    {/*<RobotReturnPage robot={robot} server={server}/>*/}
                                </Route>
                                <Route path="/robot/settings">
                                    <RobotSettingsPage/>
                                </Route>
                            </Switch>
                        </Row>
                    </Col>
                </Row>
                <NewRobotForm show={showNewRobot} hide={() => setNewRobot(false)} server={server}
                              style={{height: '400px'}}/>
                <RobotBalanceCalculation show={showRobotBalanceCalc} hide={() => setRobotBalanceCalc(false)}
                                         server={server}
                                         robotData={robotData}/>
                {/*<RobotPricingForm show={showRobotPricingCalc} hide={() => setRobotPricingCalc(false)} server={server}*/}
                {/*                  robot={robot}/>*/}
                {/*<RobotMonthlyReturnCalculation show={showRobotMonthlyCalc} hide={() => setRobotMonthlyCalc(false)} server={server}*/}
                {/*                               robot={[robot]}/>*/}
            </Container>
    );
};

export default RobotPage;