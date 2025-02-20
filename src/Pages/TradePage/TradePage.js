import TradeSignals from "./TradePageSignals/TradeSignals";
import OpenTransactions from "./OpenTransactions/OpenTransactions";
import React from "react";
import {useContext, useState} from "react";
import ServerContext from "../../context/server-context";
import TradeContext from "./context/trade-context";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";

const TradePage = () => {
    const server = useContext(ServerContext)['server'];
    const [newTransactionID, setNewTransactionID] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const MINUTE_MS = 10000;

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

    const pricingStream = async() => {
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
    };


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

    return (
        <TradeContext.Provider value={{
            newTransactionID: newTransactionID,
            saveNewTrnsactionID: setNewTransactionID,
        }}>
            <div style={{overflow: "scroll", display: "flex"}}>
                {/*<button onClick={pricingStream}>Pricing Stream</button>*/}
                {/*<div style={{width: '100%'}}>*/}
                {/*    <TradeTableData env={env} server={server}/>*/}
                {/*</div>*/}

                <div style={{
                    width: isMenuOpen ? "1000px" : "50px",
                    transition: "width 0.3s ease",
                    backgroundColor: "#eeeeee",
                    height: "100vh",
                    position: "fixed",
                    zIndex: 2,
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                    boxShadow: isMenuOpen ? "2px 0px 5px rgba(0, 0, 0, 0.1)" : "none",
                    paddingTop: "80px",
                    paddingLeft: isMenuOpen ? 20 : 0,
                    paddingRight: 50,

                }}>
                    <div style={{
                        visibility: isMenuOpen ? "visible" : "hidden",
                        opacity: isMenuOpen ? 1 : 0,
                        transition: "visibility 0.3s, opacity 0.3s ease",
                        height: "100vh",
                    }}>
                        <TradeSignals server={server}/>
                    </div>
                    <div
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{
                            position: "absolute",
                            right: "5px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            fontSize: "16px",
                            backgroundColor: "#fff",
                            borderRadius: "80%",
                            padding: "10px",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                            zIndex: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {isMenuOpen ? <BsChevronLeft/> : <BsChevronRight/>}
                    </div>
                </div>

                <div style={{
                    marginLeft: isMenuOpen ? "500px" : "50px",
                    transition: "margin-left 0.3s ease",
                    flex: 1,
                    padding: 10,
                }}>

                    <h2 className="input-label" style={{fontSize: "1.2rem", fontWeight: "bold"}}>
                    Open Transactions
                </h2>
                    <OpenTransactions server={server}/>
                </div>

            </div>
        </TradeContext.Provider>
    );
};

export default TradePage;