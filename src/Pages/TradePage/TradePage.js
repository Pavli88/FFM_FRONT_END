import TradeSignals from "./TradePageSignals/TradeSignals";
import OpenTransactions from "./OpenTransactions/OpenTransactions";
import React from "react";
import {useContext, useState} from "react";
import ServerContext from "../../context/server-context";
import TradeContext from "./context/trade-context";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";
import PortfolioContext from "../../context/portfolio-context";
import ContainerWithSideMenu from "../../components/Layout/ContainerWithSideMenu";
import TradeTerminal from "./TradeTerminal/TradeTerminal";

const TradePage = () => {
    const server = useContext(ServerContext)['server'];
    const portfolios = useContext(PortfolioContext).portfolios;
    const [newTransactionID, setNewTransactionID] = useState(0);
    const [selectedPortfolioCode, setSelectedPortfolioCode] = useState(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const MINUTE_MS = 10000;

    const allowedForTradePortfolios = portfolios.filter(data => data['trading_allowed'] === true)

    // const url = "https://stream-fxtrade.oanda.com/v3/accounts/001-004-2840244-004/pricing/stream?instruments=EUR_USD"
    // const token = 'acc56198776d1ce7917137567b23f9a1-c5f7a43c7c6ef8563d0ebdd4a3b496ac'
    // const params = {
    //     headers: {
    //     'Authorization' : 'Bearer ' + token
    //     },
    //     params: {
    //         instruments: 'XAG_USD'
    //     }
    // }

    // const pricingStream = async() => {
        // console.log('Pricing stream')
        // const response = await axios.get(" https://api-fxtrade.oanda.com/v3/accounts/001-004-2840244-004/pricing", params)
        // console.log(response.data)
        // const stream = response.data;
        // console.log(stream)
        // stream.on('data', data => {
        //     console.log(data);
        // });
        //
        // stream.on('end', () => {
        //     console.log("stream done");
        // });
    // };


    // useEffect(async() => {
    //     console.log('Live request')
        // axios.get("https://stream-fxtrade.oanda.com/v3/accounts/001-004-2840244-006/pricing/stream", params)
        //     .then(response => setX(response.data))
        //     .catch((error) => {
        //         console.error('Error Message:', error);
        //     });

        // const eventSource = new EventSource("http://stream-fxtrade.oanda.com/v3/accounts/001-004-2840244-006/pricing/stream", params);
        //
        // eventSource.onmessage = result => {
        //     const data = JSON.parse(result.data);
        //     console.log('Data: ', data);
        // };
        //
        // eventSource.onerror = err => {
        //     console.log('EventSource error: ', err);
        // };

        // const url2 = 'wss://streamer.finance.yahoo.com'
        // const ws = new WebSocket(url2, )
        // ws.onopen = function open() {
        //     console.log('connected')
        //     ws.send(JSON.stringify({
        //         subscribe: ['MSFT']
        //     }))
        // }
        //
        // ws.onmessage = function incoming(data) {
        //     console.log('Coming message')
        //     console.log(typeof data.data)
        // }
    // }, [])

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

    const panel = <div style={{overflow: "scroll", height: '100%'}}>
        <div style={{padding:10}}>
            <PortfolioTable portfolios={allowedForTradePortfolios}/>
        </div>
        <div style={{padding:10}}>
            <TradeTerminal portfolioCode={selectedPortfolioCode}/>
        </div>
        <div style={{padding:10, height: 500}}>
            <TradeSignals server={server}/>
        </div>
    </div>

    const mainArea = <div style={{padding: 30}}>

        <OpenTransactions server={server}/>
    </div>

    return (
        <TradeContext.Provider value={{
            newTransactionID: newTransactionID,
            saveNewTrnsactionID: setNewTransactionID,
        }}>
            <ContainerWithSideMenu panel={panel} mainArea={mainArea} sidebarWidth={'800px'}/>
        </TradeContext.Provider>
    );
};

export default TradePage;