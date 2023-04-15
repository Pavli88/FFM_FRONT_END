import {useContext, useState} from "react";
import {Route, Switch} from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ServerContext from "../../context/server-context";
import EnvContext from "../../context/env-context";
import PortfolioRiskPage from "./SubPages/PortfolioRisk/PortfolioRiskPage";
import PortfolioHoldingsPage from "./SubPages/PortfolioHoldings/PortfolioHoldingsPage";
import PortfolioSettingsPage from "./SubPages/PortfolioSettings/PortfolioSettingsPage";
import PortfolioTransactionsPage from "./SubPages/PortfolioTransactions/PortfolioTransactionsPage";
import PortfolioDataImport from "./SubPages/PortfolioImport/PortfolioDataImport";
import PortfolioNavBar from "./PortfolioNavBar/PortfolioNavBar";
import PortfolioPageContext from "./context/portfolio-page-context";
import {PortfolioSidebarData} from "./PortfolioSidebarData";
import Sidebar from "../../components/Sidebar/Sidebar";
import './PortfolioPage.css'

const PortfolioPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];
    const [portfolio, setPortfolio] = useState('');
    const [showImportModal, setShowImportModal] = useState(false);
    return (
        <PortfolioPageContext.Provider value={{
            portfolio: portfolio,
            savePortfolio: setPortfolio,
        }}>
            <div className={'page-container'}>
                <div className={'page-subContainer'}>
                    <Sidebar sidebarData={PortfolioSidebarData}/>
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
                </div>
                <PortfolioDataImport show={showImportModal} hide={() => setShowImportModal(false)} server={server}/>
            </div>
        </PortfolioPageContext.Provider>
    );
};

export default PortfolioPage;