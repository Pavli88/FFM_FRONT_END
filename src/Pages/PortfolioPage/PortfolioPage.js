import {useContext, useEffect, useState} from "react";
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
import axios from "axios";

const PortfolioPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const [selectedPortfolioData, setSelectedPortfolioData] = useState([{}]);
    const [showImportModal, setShowImportModal] = useState(false);
    const fetchData = (portfolio) => {
        axios.get(server + 'portfolios/get/portfolios/', {
            params: {
                portfolio_code: portfolio,
            }
        })
            .then(response => setSelectedPortfolioData(response.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    return (
        <PortfolioPageContext.Provider value={{
            portfolioData: selectedPortfolioData,
        }}>
            <div className={'page-container'}>
                <div className={'page-subContainer'} >
                    <div style={{width: '15%'}}>
                        <Sidebar sidebarData={PortfolioSidebarData}/>
                    </div>
                    <div style={{width: '85%'}}>
                        <PortfolioNavBar fetch={fetchData}/>
                            <Switch>
                                <Route path="/portfolio/dashboard">

                                </Route>
                                <Route path="/portfolio/holdings">
                                    <PortfolioHoldingsPage server={server}/>
                                </Route>
                                <Route path="/portfolio/transactions">
                                    <PortfolioTransactionsPage server={server}/>
                                </Route>
                                <Route path="/portfolio/risk">
                                    <PortfolioRiskPage server={server}/>
                                </Route>
                                <Route path="/portfolio/return">

                                </Route>
                                <Route path="/portfolio/settings">
                                    <PortfolioSettingsPage/>
                                </Route>
                            </Switch>
                    </div>
                </div>
                <PortfolioDataImport show={showImportModal} hide={() => setShowImportModal(false)} server={server}/>
            </div>
        </PortfolioPageContext.Provider>
    );
};

export default PortfolioPage;