import {useContext, useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import ServerContext from "../../context/server-context";
import PortfolioDashBoardPage from "./SubPages/PortfolioDashboard/PortfolioDashBoardPage";
import PortfolioRiskPage from "./SubPages/PortfolioRisk/PortfolioRiskPage";
import PortfolioHoldingsPage from "./SubPages/PortfolioHoldings/PortfolioHoldingsPage";
import PortfolioSettingsPage from "./SubPages/PortfolioSettings/PortfolioSettingsPage";
import PortfolioTransactionsPage from "./SubPages/PortfolioTransactions/PortfolioTransactionsPage";
import PortfolioDataImport from "./SubPages/PortfolioImport/PortfolioDataImport";
import PortfolioReturnPage from "./SubPages/PortfolioReturn/PortfolioReturnPage";
import PortfolioNavBar from "./PortfolioNavBar/PortfolioNavBar";
import PortfolioPageContext from "./context/portfolio-page-context";
import {PortfolioSidebarData} from "./PortfolioSidebarData";
import Sidebar from "../../components/Sidebar/Sidebar";
import './PortfolioPage.css'
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import {Nav} from "react-bootstrap";

const PortfolioPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const [portfolioCode, setPortfolioCode] = useState();
    const [selectedPortfolioData, setSelectedPortfolioData] = useState([{}]);
    const [showImportModal, setShowImportModal] = useState(false);

    return (
        <PortfolioPageContext.Provider value={{
            portfolioCode: portfolioCode,
            savePortfolioCode: setPortfolioCode,
            portfolioData: selectedPortfolioData,
            savePortfolioData: setSelectedPortfolioData,
        }}>
            <div className={'page-container'}>
                <div className={'page-subContainer'} >
                    <div style={{width: '15%', paddingLeft: 15}}>
                        <PortfolioNavBar/>
                        <Sidebar sidebarData={PortfolioSidebarData}/>
                    </div>
                    <div style={{width: '85%'}}>
                        <Switch>
                            <Route path="/portfolio/dashboard">
                                <PortfolioDashBoardPage server={server} portfolioData={selectedPortfolioData}/>
                            </Route>
                            <Route path="/portfolio/transactions">
                                <PortfolioTransactionsPage server={server}/>
                            </Route>
                            <Route path="/portfolio/risk">
                                <PortfolioRiskPage server={server}/>
                            </Route>
                            <Route path="/portfolio/return">
                                <PortfolioReturnPage/>
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