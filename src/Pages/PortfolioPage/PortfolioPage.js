import {useContext, useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import PortfolioSettingsPage from "./SubPages/PortfolioSettings/PortfolioSettingsPage";
import PortfolioTransactionsPage from "./SubPages/PortfolioTransactions/PortfolioTransactionsPage";
import PortfolioHoldingsPage from "./SubPages/PortfolioHoldings/PortfolioHoldingsPage";
import PortfolioOverview from "./SubPages/PortfolioOverview/PortfolioOverview";
import PortfolioPageContext from "./context/portfolio-page-context";
import {PortfolioSidebarData} from "./PortfolioSidebarData";
import Sidebar from "../../components/Sidebar/Sidebar";
import './PortfolioPage.css'
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import DateContext from "../../context/date-context";
import ContainerWithSideMenu from "../../components/Layout/ContainerWithSideMenu";
import PortfolioSearch from "./PortfolioSearch/PortfolioSearch";
import fetchAPI from "../../config files/api";

const PortfolioPage = () => {
    const currentDate = useContext(DateContext).currentDate;
    const [portfolioCode, setPortfolioCode] = useState();
    const [selectedPortfolioData, setSelectedPortfolioData] = useState([{}]);
    const [currentHolding, setCurrentHolding] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const fetchHoldingData = async () => {
        const response = await fetchAPI.post('portfolios/get/holding/', {
            date: currentDate,
            portfolio_code: [portfolioCode]
        })
        setCurrentHolding(response.data)
    };

    useEffect(() => {
        if (portfolioCode !== undefined) {
            fetchHoldingData()
        }
    }, [portfolioCode])

    const panel =
        <div>
            <div style={{
                // visibility: isMenuOpen ? "visible" : "hidden",
                opacity: isMenuOpen ? 1 : 0,
                transition: "visibility 0.3s, opacity 0.3s ease",
                paddingTop: 10,
                paddingBottom: 10
            }}>
                <PortfolioSearch/>
            </div>

            <div style={{
                // visibility: isMenuOpen ? "visible" : "hidden",
                opacity: isMenuOpen ? 1 : 0,
                transition: "visibility 0.3s, opacity 0.3s ease",
                height: 300
            }}>
                <Sidebar sidebarData={PortfolioSidebarData}/>
            </div>
        </div>

    const mainArea = <Switch>
        <Route path="/portfolio/overview">
            <PortfolioOverview/>
        </Route>
        <Route path="/portfolio/holdings">
            <PortfolioHoldingsPage/>
        </Route>
        <Route path="/portfolio/transactions">
            <PortfolioTransactionsPage/>
        </Route>
        <Route path="/portfolio/settings">
            <PortfolioSettingsPage/>
        </Route>
    </Switch>

    return (
        <PortfolioPageContext.Provider value={{
            portfolioCode: portfolioCode,
            savePortfolioCode: setPortfolioCode,
            portfolioData: selectedPortfolioData,
            savePortfolioData: setSelectedPortfolioData,
            currentHolding: currentHolding
        }}>
            <ContainerWithSideMenu panel={panel} mainArea={mainArea}/>
        </PortfolioPageContext.Provider>
    );
};

export default PortfolioPage;