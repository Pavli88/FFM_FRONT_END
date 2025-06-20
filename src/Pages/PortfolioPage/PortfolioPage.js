import {useContext, useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import PortfolioPageContext from "./context/portfolio-page-context";
import DateContext from "../../context/date-context";
import PortfolioContext from "../../context/portfolio-context";
import './PortfolioPage.css'
import PortfolioDetailedView from "./PortfolioDetailedView/PortfolioDetailedView";
import fetchAPI from "../../config files/api";
import { FaLock, FaGlobe, FaTimes } from "react-icons/fa";
import PortfolioBusinessView from "./PortfolioBusinessView/PortfolioBusinessView";

const PortfolioPage = () => {
    const { selectedPortfolio } = useContext(PortfolioContext);
    const currentDate = useContext(DateContext).currentDate;
    const [portfolioCode, setPortfolioCode] = useState();
    const [selectedPortfolioData, setSelectedPortfolioData] = useState([{}]);

    const [showBusinessView, setShowBusinessView] = useState(true);
    const [isFullscreenTransactions, setIsFullscreenTransactions] = useState(false);

    return (
        <PortfolioPageContext.Provider value={{
            portfolioCode: portfolioCode,
            savePortfolioCode: setPortfolioCode,
            portfolioData: selectedPortfolioData,
            savePortfolioData: setSelectedPortfolioData,
            setShowBusinessView: setShowBusinessView,
            showBusinessView: showBusinessView,
            // currentHolding: currentHolding,
            isFullscreenTransactions: isFullscreenTransactions,
            setIsFullscreenTransactions: setIsFullscreenTransactions
        }}>

            <div className="portfolio-page">
                {showBusinessView ? <PortfolioBusinessView/> : <PortfolioDetailedView/>}
            </div>
        </PortfolioPageContext.Provider>
    );
};

export default PortfolioPage;