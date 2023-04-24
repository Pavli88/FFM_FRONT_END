import TradeTableData from "./TradeTableData";
import TradeExecutor from "./TradeExecutor";
import TradeSignals from "./TradePageSignals/TradeSignals";
import OpenTransactions from "./OpenTransactions/OpenTransactions";
import React from "react";
import {useContext, useState} from "react";
import EnvContext from "../../context/env-context";
import ServerContext from "../../context/server-context";
import TradeContext from "./context/trade-context";
import TradeExecution from "./TradeExecution/TradeExecution";

const TradePage = () => {
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];
    const [newTransactionID, setNewTransactionID] = useState(0);

    // This part connects a websocket with the back end from the front end
    // const newWebSocket = new WebSocket('http://127.0.0.1:8000/trade/price_stream/')
    //
    // console.log(newWebSocket)
    //
    // const testSocket = () => {
    //     // This code sends data to the websocket form front end
    //     newWebSocket.send("start")
    //     console.log('Streaming request is sent from front end to back end.')
    // };
    //
    // const closeSocket = () => {
    //     // This code closes the websocket connection with the back end
    //     newWebSocket.send("stop")
    //     // newWebSocket.close()
    //     console.log('Streaming is stopped')
    // };

    return (
        <TradeContext.Provider value={{
            newTransactionID: newTransactionID,
            saveNewTrnsactionID: setNewTransactionID,
        }}>
            <div className={'page-container'}>
                <div style={{height: '600px', padding: 15, display: "flex"}}>
                    <div style={{width: '50%'}}>
                        <TradeTableData env={env} server={server}/>
                        <TradeExecution server={server}/>
                    </div>
                    <div style={{width: '50%'}}>
                        <OpenTransactions server={server}/>
                        <TradeExecutor server={server}/>
                    </div>
                    {/*<div style={{padding:0}}>*/}
                    {/*    <div style={{height: '100%'}}>*/}
                    {/*        <div>*/}
                    {/*            <div style={{height: '50%'}}>*/}
                    {/*                <TradeExecutor server={server}/>*/}
                    {/*            </div>*/}
                    {/*            <div style={{height: '50%'}}>*/}
                    {/*                <TradeSignals/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <div style={{height: '100%'}}>*/}
                    {/*                <TradeSignals/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </TradeContext.Provider>
    );
};

export default TradePage;