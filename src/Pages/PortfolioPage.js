import {useContext, useEffect, useRef, useState} from "react";
import {Route, Switch, Link} from "react-router-dom";

import axios from "axios";

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

// Contexts
import RobotContext from "../context/robot-context";
import RiskPage from "./RiskPage";
import ServerContext from "../context/server-context";
import EnvContext from "../context/env-context";
import PortfolioContext from "../context/portfolio-context";


// SubPages
import PortfolioRiskPage from "./PortfolioPage/SubPages/PortfolioRisk/PortfolioRiskPage";
import PortfolioHoldingsPage from "./PortfolioPage/SubPages/PortfolioHoldings/PortfolioHoldingsPage";
import PortfolioDashBoardPage from "./PortfolioPage/SubPages/PortfolioDashboard/PortfolioDashBoardPage";
import PortfolioSettingsPage from "./PortfolioPage/SubPages/PortfolioSettings/PortfolioSettingsPage";
import PortfolioTransactionsPage from "./PortfolioPage/PortfolioTransactionsPage/PortfolioTransactionsPage";
import PortfolioDataImport from "./PortfolioPage/SubPages/PortfolioImport/PortfolioDataImport";
import PortfolioNewCashFlowEntry from "./PortfolioPage/SubPages/PortfolioTransactions/PortfolioNewCashFlow";
import PortfolioBuy from "./PortfolioPage/PortfolioBuy";
import PortfolioNewTransaction from "./PortfolioPage/SubPages/PortfolioTransactions/PortfolioNewTransaction";
import PortfolioDetails from "./PortfolioPage/SubPages/PortfolioDashboard/PortfolioDetails";
import PortfolioNavBar from "./PortfolioPage/PortfolioNavBar/PortfolioNavBar";
import PortfolioPageContext from "./PortfolioPage/context/portfolio-page-context";

const PortfolioPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];
    const [portfolio, setPortfolio] = useState('');
    const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
    const [showNewPortCashFlow, setNewPortCashFlow] = useState(false);
    const [showNewRobotTrade, setNewRobotTrade] = useState(false);
    const [showCashCalc, setCashCalc] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [showPosCalc, setPosCalc] = useState(false);

    return (
        <PortfolioPageContext.Provider value={{
            portfolio: portfolio,
            savePortfolio: setPortfolio,
        }}>
            <Container style={{width: "100%", height: window.innerHeight, padding: '0px', margin: '0px'}} fluid>
                <Row style={{height: '100%', margin: '0px', padding: '0px'}}>
                    <ProSidebar style={{background: 'red'}}>
                        <Menu iconShape="square">
                            <MenuItem>Dashboard
                                <Link to="/portfolio/dashboard"/>
                            </MenuItem>
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
                            <MenuItem onClick={() => setShowImportModal(true)}>Import</MenuItem>
                        </Menu>
                    </ProSidebar>
                    <Col style={{width: '50%'}}>
                        <PortfolioNavBar/>
                        <Row style={{
                            padding: '15px',
                            height: window.innerHeight,
                            width: '100%',
                            margin: '0px'
                        }}>
                            <Switch>
                                <Route path="/portfolio/dashboard">
                                    {/*<PortfolioDashBoardPage portfolio={portfolio} server={server} default={portfolios[0]}/>*/}
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
                                    <PortfolioSettingsPage portfolio={portfolio}/>
                                </Route>
                            </Switch>
                        </Row>
                    </Col>
                </Row>
                <PortfolioBuy show={showNewRobotTrade} hide={() => setNewRobotTrade(false)} portfolio={portfolio}
                              server={server} env={env}/>
                <PortfolioNewCashFlowEntry show={showNewPortCashFlow} hide={() => setNewPortCashFlow(false)}
                                           portfolio={portfolio} server={server}/>
                <PositionCalculation show={showPosCalc} hide={() => setPosCalc(false)} server={server}
                                     portfolio={portfolio}/>
                <CashHoldingCalculation show={showCashCalc} hide={() => setCashCalc(false)} server={server}
                                        portfolio={portfolio}/>
                <PortfolioDataImport show={showImportModal} hide={() => setShowImportModal(false)} server={server}/>
                <PortfolioNewTransaction show={showNewTransactionModal} hide={() => setShowNewTransactionModal(false)}
                                         portfolio={portfolio} server={server}/>

            </Container>
        </PortfolioPageContext.Provider>
    );
};

export default PortfolioPage;