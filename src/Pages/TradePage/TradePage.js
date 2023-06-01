import TradeTableData from "./TradeTableData";
import TradeExecutor from "./TradeExecutor";
import TradeSignals from "./TradePageSignals/TradeSignals";
import OpenTransactions from "./OpenTransactions/OpenTransactions";
import React from "react";
import {useContext, useState, useEffect} from "react";
import EnvContext from "../../context/env-context";
import ServerContext from "../../context/server-context";
import TradeContext from "./context/trade-context";
import TradeExecution from "./TradeExecution/TradeExecution";
import axios from "axios";

const TradePage = () => {
    const server = useContext(ServerContext)['server'];
    const [newTransactionID, setNewTransactionID] = useState(0);
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
            <div className={'page-container'}>
                {/*<button onClick={pricingStream}>Pricing Stream</button>*/}
                {/*<div style={{width: '100%'}}>*/}
                {/*    <TradeTableData env={env} server={server}/>*/}
                {/*</div>*/}

                <div style={{height: '900px', padding: 15, display: "flex"}}>
                    <div style={{width: '15%'}}>
                        <TradeSignals server={server}/>
                    </div>

                    <div style={{width: '20%'}}>
                        <TradeExecution server={server}/>
                    </div>

                    <div style={{width: '65%'}}>
                        <OpenTransactions server={server}/>
                    </div>

                </div>
            </div>
        </TradeContext.Provider>
    );
};

export default TradePage;