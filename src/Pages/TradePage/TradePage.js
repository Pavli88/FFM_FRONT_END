import TradeSignals from "./TradePageSignals/TradeSignals";
import OpenTransactions from "./OpenTransactions/OpenTransactions";
import React, {useEffect} from "react";
import {useContext, useState, useRef} from "react";
import TradeContext from "./context/trade-context";
import PortfolioContext from "../../context/portfolio-context";
import ContainerWithSideMenu from "../../components/Layout/ContainerWithSideMenu";
import TradeTerminal from "./TradeTerminal/TradeTerminal";
import fetchAPI from "../../config files/api";
import TradeOrders from "./TradePageOrders/TradeOrders";
import './TradePage.css'

const TradePage = () => {
    const portfolios = useContext(PortfolioContext).portfolios;
    const [openTransactionsData, setOpenTransactionsData] = useState([]);
    const [newTransactionID, setNewTransactionID] = useState(0);
    const [selectedPortfolioCode, setSelectedPortfolioCode] = useState(null);
    const [selectedSignal, setSelectedSignal] = useState(null);
    const allowedForTradePortfolios = portfolios.filter(data => data['trading_allowed'] === true)

    const containerRef = useRef(null);

    const [heightTop, setHeightTop] = useState(400);     // OpenTransactions
    const [heightMiddle, setHeightMiddle] = useState(300); // TradeSignals

    const isDraggingTop = useRef(false);
    const isDraggingMiddle = useRef(false);

    const handleMouseDownTop = () => {
        isDraggingTop.current = true;
    };
    const handleMouseDownMiddle = () => {
        isDraggingMiddle.current = true;
    };

    const handleMouseMove = (e) => {
        const containerTop = containerRef.current.getBoundingClientRect().top;

        if (isDraggingTop.current) {
            const newHeightTop = e.clientY - containerTop;
            setHeightTop(newHeightTop);
        } else if (isDraggingMiddle.current) {
            const newHeightMiddle = e.clientY - containerTop - heightTop - 5; // subtract top + divider
            setHeightMiddle(newHeightMiddle);
        }
    };

    const stopDragging = () => {
        isDraggingTop.current = false;
        isDraggingMiddle.current = false;
    };

    const fetchTransactions = async () => {
        const response = await fetchAPI.get("portfolios/get/open_transactions/");
        setOpenTransactionsData(response.data);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);


    const PortfolioTable = ({portfolios}) => {
        return (
            <div className="card">
                <div className={'card-header'}>
                    Portfolios
                </div>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Portfolio Name</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {portfolios.map((portfolio) => (
                        <tr key={portfolio.id} className="border border-gray-300">
                            <td className="border border-gray-300 px-4 py-2">{portfolio.portfolio_name}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    // className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    onClick={() => setSelectedPortfolioCode(portfolio.portfolio_code)}
                                >
                                    Trade
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        );
    };

    const panel = <div style={{overflow: "scroll", height: '100%', width: '100%'}}>

        <div style={{display: "flex", gap: 5, height: 650, paddingRight: 5}}>
            <div style={{flex: 1}}>
                <PortfolioTable portfolios={allowedForTradePortfolios}/>
            </div>
            <div style={{flex: 2}}>
                <TradeTerminal portfolioCode={selectedPortfolioCode}/>
            </div>
        </div>
    </div>

    const mainArea = <div
      ref={containerRef}
      className="main-container"
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      <div className="section" style={{ height: heightTop }}>
        <OpenTransactions openTransactions={openTransactionsData} />
      </div>

      <div className="divider" onMouseDown={handleMouseDownTop} />

      <div className="section" style={{ height: heightMiddle }}>
        <TradeSignals />
      </div>

      <div className="divider" onMouseDown={handleMouseDownMiddle} />

      <div className="section section-flex">
        <TradeOrders />
      </div>
    </div>

    return (
        <TradeContext.Provider value={{
            newTransactionID: newTransactionID,
            saveNewTrnsactionID: setNewTransactionID,
            fetchTransactions: fetchTransactions,
            selectedSignal: selectedSignal,
            saveSelectedSignal: setSelectedSignal,
        }}>
            <ContainerWithSideMenu panel={panel} mainArea={mainArea} sidebarWidth={'800px'}/>
        </TradeContext.Provider>
    );
};

export default TradePage;