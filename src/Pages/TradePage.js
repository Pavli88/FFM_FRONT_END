// React Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

import TradeTableData from "./TradePage/TradeTableData";
import TradeExecutor from "./TradePage/TradeExecutor";
import TradeSignals from "./TradePage/TradePageSignals/TradeSignals";

import React from "react";
import {useContext, useState} from "react";

// Contexts
import EnvContext from "../context/env-context";
import ServerContext from "../context/server-context";
import TradeContext from "./TradePage/TradePageContext/TradePageContext";

const TradePage = () => {
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];
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
        <Container className={'border'}
                   style={{width: "100%", height: window.innerHeight, padding: '20px'}}
                   fluid>
            <Row style={{height: '900px', padding: 0}}>
                <Col sm={8}>
                    <TradeTableData env={env} server={server}/>
                </Col>
                <Col sm={4} style={{padding:0}}>
                    <Row style={{height: '100%'}}>
                        <Col>
                            <Row style={{height: '50%'}}>
                                <TradeExecutor server={server}/>
                            </Row>
                            <Row style={{height: '50%'}}>
                                <TradeSignals/>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{height: '100%'}}>
                                <TradeSignals/>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default TradePage;