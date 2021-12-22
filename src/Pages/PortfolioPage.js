import {useContext, useEffect, useState} from "react";
import {Route, Switch, Link} from "react-router-dom";
import ServerContext from "../context/server-context";
import EnvContext from "../context/env-context";
import PortfolioContext from "../context/portfolio-context";
import axios from "axios";

import NewPortfolioForm from "./PortfolioPage/NewPortfolioForm";

// Sidebar
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

// Calculations
import PositionCalculation from "./PortfolioPage/Calculations/PositionCalculation";
import CashHoldingCalculation from "./PortfolioPage/Calculations/CashHoldingCalc";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import OptionLoader from "../components/Options";

// CSS
import "./PortfolioPage.css"
import PortfolioBuy from "./PortfolioPage/PortfolioBuy";
import NewPortCashFlow from "./PortfolioPage/NewPortCashFlow";

// Contexts
import RobotContext from "../context/robot-context";
import NewBrokerAccount from "../components/NewBrokerAccount";
import RiskPage from "./RiskPage";


// SubPages
import PortfolioRiskPage from "./PortfolioPage/SubPages/PortfolioRisk/PortfolioRiskPage";
import PortfolioHoldingsPage from "./PortfolioPage/SubPages/PortfolioHoldings/PortfolioHoldingsPage";
import PortfolioDashBoardPage from "./PortfolioPage/SubPages/PortfolioDashboard/PortfolioDashBoardPage";
import PortfolioSettingsPage from "./PortfolioPage/SubPages/PortfolioSettings/PortfolioSettingsPage";
import PortfolioTransactionsPage from "./PortfolioPage/SubPages/PortfolioTransactions/PortfolioTransactionsPage";

const PortfolioPage = (props) => {
    // Date variables
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const defaultRobots = useContext(RobotContext)['robots'];
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];
    const portfolios = useContext(PortfolioContext)['portfolioData'];
    const [portfolio, setPortfolio] = useState(portfolios[0]['portfolio_code']);
    const [startDate, setStartDate] = useState(firstDay.toISOString().substr(0,10));
    const [endDate, setEndDate] = useState(date.toISOString().substr(0,10));

    const portfolioOptions = portfolios.map((record) =>
        <option key={record['id']} value={record['portfolio_code']}>{record['portfolio_name']}</option>)

    const portSelectHandler = (event) => {
        setPortfolio(event.target.value);
    };

    const portSelect = (port) => {
        setPortfolio(port);
    };

    const startDateHandler = (event) => {
        setStartDate(event.target.value);
    };

    const endDateHandler = (event) => {
        setEndDate(event.target.value);
    };

    // New portfolio form
    const [showNewPortfolio, setShowNewPortfolio] = useState(false);
    const showNewRobotForm = () => {
        setShowNewPortfolio(true);
    };
    const hideNewPortfolio = () => {
        setShowNewPortfolio(false);
    };

    // New robot trade form
    const [showNewRobotTrade, setNewRobotTrade] = useState(false);
    const showNewRobotTradeForm = () => {
        setNewRobotTrade(true);
    };
    const hideNewRobotTrade = () => {
        setNewRobotTrade(false);
    };

    // New portfolio cash flow
    const [showNewPortCashFlow, setNewPortCashFlow] = useState(false);
    const showNewPortCashFlowForm = () => {
        setNewPortCashFlow(true);
    };
    const hideNewPortCashFlow = () => {
        setNewPortCashFlow(false);
    };

    // Position calculation
    const [showPosCalc, setPosCalc] = useState(false);
    const showPosCalcForm = () => {
        setPosCalc(true);
    };
    const hidePosCalcForm = () => {
        setPosCalc(false);
    };

    // Cash flow calculation
    const [showCashCalc, setCashCalc] = useState(false);
    const showCashCalcForm = () => {
        setCashCalc(true);
    };
    const hideCashCalcForm = () => {
        setCashCalc(false);
    };

    return (
        <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '0px'}} fluid>
            <Row style={{height: '100%', margin:'0px'}}>
                <ProSidebar>
                    <MenuItem style={{padding:'5px'}} ><Form.Control onChange={portSelectHandler} as="select">
                        {portfolioOptions}
                    </Form.Control>
                    </MenuItem>
                    <Menu iconShape="square">
                        <MenuItem onClick={showNewRobotForm}>New Portfolio</MenuItem>
                        <MenuItem>Dashboard
                            <Link to="/portfolio/dashboard"/>
                        </MenuItem>
                        <SubMenu title="Cash Operations">
                            <MenuItem onClick={showNewPortCashFlowForm}>Funding</MenuItem>
                            <MenuItem>Withdraw</MenuItem>
                        </SubMenu>
                        <SubMenu title="Trade">
                            <MenuItem onClick={showNewRobotTradeForm}>Robot</MenuItem>
                            <MenuItem>Security</MenuItem>
                        </SubMenu>
                        <SubMenu title="Calculations">
                            <MenuItem onClick={showCashCalcForm}>Cash Holdings</MenuItem>
                            <MenuItem onClick={showPosCalcForm}>Positions</MenuItem>
                            <MenuItem>Holdings</MenuItem>
                            <MenuItem>Return</MenuItem>
                        </SubMenu>
                        <MenuItem>Holdings
                            <Link to="/portfolio/holdings"/>
                        </MenuItem>
                        <MenuItem>Transactions
                            <Link to="/portfolio/transactions"/>
                        </MenuItem>
                        <MenuItem>Risk
                            <Link to="/portfolio/risk"/>
                        </MenuItem>
                        <MenuItem>Return
                            <Link to="/portfolio/return"/>
                        </MenuItem>
                        <MenuItem>Settings
                            <Link to="/portfolio/settings"/>
                        </MenuItem>
                    </Menu>
                    </ProSidebar>;
                <Col style={{width: '50%'}}>
                    <Row style={{height: '60px', width: '50%', padding: '5px', margin: '5px'}}>
                        <Col style={{height: '100%'}}>
                            <Form.Group as={Row}>
                                <Form.Label className="form-label-first" column sm={2}>
                                    From
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="date" onChange={startDateHandler}
                                                  defaultValue={firstDay.toISOString().substr(0, 10)}/>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col style={{height: '100%'}}>
                            <Form.Group as={Row}>
                                <Form.Label className="form-label-first" column sm={2}>
                                    To
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="date" onChange={endDateHandler}
                                                  defaultValue={date.toISOString().substr(0, 10)}/>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={{
                        padding: '15px',
                        height: window.innerHeight,
                        width: '100%',
                        background: 'green',
                        margin: '0px'
                    }}>
                        <Switch>
                            <Route path="/portfolio/dashboard">
                                <PortfolioDashBoardPage portfolio={portfolio} server={server} default={portfolios[0]}
                                                        end_date={endDate}/>
                            </Route>
                            <Route path="/portfolio/holdings">
                                <PortfolioHoldingsPage portfolio={portfolio} server={server}/>
                            </Route>
                            <Route path="/portfolio/transactions">
                                <PortfolioTransactionsPage portfolio={portfolio} server={server}/>
                            </Route>
                            <Route path="/portfolio/risk">
                                <PortfolioRiskPage portfolio={portfolio} server={server}/>
                            </Route>
                            <Route path="/portfolio/return">

                            </Route>
                            <Route path="/portfolio/settings">
                                <PortfolioSettingsPage/>
                            </Route>
                        </Switch>
                    </Row>
                </Col>
            </Row>

            {/*<Row>*/}
            {/*    <Col>*/}
            {/*        <Row style={{height: '500px', padding: '5px'}}>*/}
            {/*            <Col style={{height: '100%'}} sm={4}>*/}
            {/*                <PortfolioCashFlow portfolio={portfolio} server={server} start_date={startDate}*/}
            {/*                                   end_date={endDate}/>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </Col>*/}
            {/*</Row>*/}

            // Modals
            <NewPortfolioForm show={showNewPortfolio} hide={hideNewPortfolio} server={server}/>
            <PortfolioBuy show={showNewRobotTrade} hide={hideNewRobotTrade} portfolio={portfolio} server={server} env={env}/>
            <NewPortCashFlow show={showNewPortCashFlow} hide={hideNewPortCashFlow} portfolio={portfolio} server={server}/>
            <PositionCalculation show={showPosCalc} hide={hidePosCalcForm} server={server} start_date={startDate} end_date={endDate}/>
            <CashHoldingCalculation show={showCashCalc} hide={hideCashCalcForm} server={server} portfolio={portfolio}/>
        </Container>
    );
};

export default PortfolioPage;