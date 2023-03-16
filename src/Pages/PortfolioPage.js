import {useContext, useEffect, useRef, useState} from "react";
import {Route, Switch, Link} from "react-router-dom";

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

// Contexts
import RobotContext from "../context/robot-context";
import NewBrokerAccount from "./ProfilPage/BrokerAccounts/NewBrokerAccount";
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

const PortfolioPage = (props) => {
    const defaultRobots = useContext(RobotContext)['robots'];
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];

    const portfolios = useContext(PortfolioContext)['portfolios'];
    const [portfolio, setPortfolio] = useState(portfolios[0]['portfolio_code']);
    const [selectedPortfolioInfo, setSelectedPortfolioInfo] = useState([]);

    const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
    const [showNewPortCashFlow, setNewPortCashFlow] = useState(false);
    const [showNewRobotTrade, setNewRobotTrade] = useState(false);
    const [showCashCalc, setCashCalc] = useState(false);
    const [showNewPortfolio, setShowNewPortfolio] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [showPosCalc, setPosCalc] = useState(false);

    useEffect(() => {
        axios.get(server + 'portfolios/get_portfolio_data/' + portfolio)
            .then(response => response['data'].map(data => data))
            .then(data => setSelectedPortfolioInfo(data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        }, [props]
    );

    return (
        <Container style={{width: "100%", height: window.innerHeight, padding: '0px'}} fluid>
            <Row style={{height: '100%', margin:'0px'}}>
                <ProSidebar>
                    <Menu iconShape="square">
                        <MenuItem onClick={()=>setShowNewPortfolio(true)}>New Portfolio</MenuItem>
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
                        <MenuItem onClick={()=>setShowImportModal(true)}>Import</MenuItem>
                    </Menu>
                    </ProSidebar>;
                <Col style={{width: '50%'}}>
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
                                <PortfolioSettingsPage/>
                            </Route>
                        </Switch>
                    </Row>
                </Col>
            </Row>

            <NewPortfolioForm show={showNewPortfolio} hide={() => setShowNewPortfolio(false)} server={server}/>
            <PortfolioBuy show={showNewRobotTrade} hide={() => setNewRobotTrade(false)} portfolio={portfolio} server={server} env={env}/>
            <PortfolioNewCashFlowEntry show={showNewPortCashFlow} hide={() => setNewPortCashFlow(false)} portfolio={portfolio} server={server}/>
            <PositionCalculation show={showPosCalc} hide={() => setPosCalc(false)} server={server} portfolio={portfolio}/>
            <CashHoldingCalculation show={showCashCalc} hide={() => setCashCalc(false)} server={server} portfolio={portfolio}/>
            <PortfolioDataImport show={showImportModal} hide={() => setShowImportModal(false)} server={server}/>
            <PortfolioNewTransaction show={showNewTransactionModal} hide={() => setShowNewTransactionModal(false)} portfolio={portfolio} server={server}/>

        </Container>
    );
};

export default PortfolioPage;