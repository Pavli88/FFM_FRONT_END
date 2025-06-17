import {useContext, useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import PortfolioSettingsPage from "./SubPages/PortfolioSettings/PortfolioSettingsPage";
import PortfolioTransactionsPage from "./SubPages/PortfolioTransactions/PortfolioTransactionsPage";
import PortfolioOverview from "./SubPages/PortfolioOverview/PortfolioOverview";
import PortfolioPageContext from "./context/portfolio-page-context";
import {PortfolioSidebarData} from "./PortfolioSidebarData";
import Sidebar from "../../components/Sidebar/Sidebar";
import './PortfolioPage.css'
import DateContext from "../../context/date-context";
import ContainerWithSideMenu from "../../components/Layout/ContainerWithSideMenu";
import PortfolioSearch from "./PortfolioSearch/PortfolioSearch";
import fetchAPI from "../../config files/api";
import { FaLock, FaGlobe, FaTimes } from "react-icons/fa";
import HoldingsTable from "../../components/Tables/HoldingTable";
import PortfolioCommunity from "./SubPages/PortfolioSocial/PortfolioCommunity/PortfolioCommunity";
import PortfolioContext from "../../context/portfolio-context";

const PortfolioPage = () => {
    const { selectedPortfolio } = useContext(PortfolioContext);
    const currentDate = useContext(DateContext).currentDate;
    const [portfolioCode, setPortfolioCode] = useState();
    const [selectedPortfolioData, setSelectedPortfolioData] = useState([{}]);
    const [currentHolding, setCurrentHolding] = useState({});

    const [activeTab, setActiveTab] = useState("Overview");
    const [isPublic, setIsPublic] = useState(true);

    const [isFullscreenTransactions, setIsFullscreenTransactions] = useState(true);

    const fetchHoldingData = async () => {
        const response = await fetchAPI.post('portfolios/get/holding/', {
            date: currentDate,
            portfolio_code: [selectedPortfolio.portfolio_code]
        })
        setCurrentHolding(response.data)
    };

    useEffect(() => {
        if (selectedPortfolio.portfolio_code !== undefined) {
            fetchHoldingData()
        }
    }, [selectedPortfolio.portfolio_code])


    const [selectedLabels, setSelectedLabels] = useState(["Momentum"]);

    const handleLabelClick = (label) => {
        if (selectedLabels.includes(label)) {
            setSelectedLabels(selectedLabels.filter((l) => l !== label));
        } else {
            setSelectedLabels([...selectedLabels, label]);
        }
    };

    const availableLabels = [
        {label: "Scalping", color: "#d4eaf7"},
        {label: "Energy", color: "#fdebd0"},
        {label: "Momentum", color: "#e8f8f5"},
        {label: "Value Investing", color: "#f9ebea"},
    ];

    const labels = <div className="portfolio-labels">
        {availableLabels.map(({label, color}) =>
            selectedLabels.includes(label) ? (
                <span
                    key={label}
                    className="portfolio-label selected"
                    style={{backgroundColor: color}}
                >
                  {label}
                    <FaTimes className="remove-icon" onClick={() => handleLabelClick(label)}/>
                </span>
            ) : (
                <span
                    key={label}
                    className="portfolio-label"
                    style={{backgroundColor: color}}
                    onClick={() => handleLabelClick(label)}
                >
                  {label}
                </span>
            )
        )}
    </div>

    return (
        <PortfolioPageContext.Provider value={{
            portfolioCode: portfolioCode,
            savePortfolioCode: setPortfolioCode,
            portfolioData: selectedPortfolioData,
            savePortfolioData: setSelectedPortfolioData,
            currentHolding: currentHolding,
            isFullscreenTransactions: isFullscreenTransactions,
            setIsFullscreenTransactions: setIsFullscreenTransactions
        }}>
            {/*<ContainerWithSideMenu panel={panel} mainArea={mainArea}/>*/}

            <div className="portfolio-layout">
                <div className="portfolio-container card">

                    <div className="portfolio-header">
                        <div>
                             <h1 className="portfolio-title">{selectedPortfolio.portfolio_name}</h1>
                            <div className="portfolio-meta">

                                <span><strong>Status:</strong> {selectedPortfolio.status}</span>
                                <span><strong>Type:</strong> Momentum</span>
                                <span><strong>Currency:</strong> {selectedPortfolio.currency}</span>
                                <span className="visibility-label" title={isPublic ? "Public" : "Private"}>
      {isPublic ? (
          <>
              <FaGlobe size={14}/> Public
          </>
      ) : (
          <>
          <FaLock size={14}/> Private
        </>
      )}
    </span>
                            </div>
                        </div>

                        {/* Public icon jobbra igazítva, egy szinten a címmel */}
                        <div style={{display: "flex", gap: 15}}>
                            <PortfolioSearch />

  </div>
</div>

                    <div className="portfolio-tabs">
                        {[
                            "Overview",
                            "Holdings",
                            "Transactions",
                            "Configuration",
                            "Minds and Journal",
                        ].map((tab) => (
                            <button
                                key={tab}
                                className={`tab-link ${activeTab === tab ? "active" : ""}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === "Overview" && (
                        <PortfolioOverview/>
                    )}
                    {activeTab === "Holdings" && (
                        <HoldingsTable portfolioCode={portfolioCode}/>
                    )}
                    {activeTab === "Transactions" && (
                        <div className={isFullscreenTransactions ? "fullscreen-wrapper" : ""}>
                        <PortfolioTransactionsPage/>
                        </div>
                    )}
                    {activeTab === "Configuration" && (
                        <PortfolioSettingsPage/>
                    )}
                </div>
               <div className="portfolio-sidebar">
  {/*<PortfolioCommunity />*/}
</div>
            </div>

        </PortfolioPageContext.Provider>
    );
};

export default PortfolioPage;