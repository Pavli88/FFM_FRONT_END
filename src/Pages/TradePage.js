// React Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button'

import TradeTableData from "./TradePage/TradeTableData";
import PriceParagraph from "./TradePage/PriceParagraph";

import {useContext, useState} from "react";

// Contexts
import EnvContext from "../context/env-context";
import ServerContext from "../context/server-context";

const TradePage = () => {
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];

    const newWebSocket = new WebSocket('ws://127.0.0.1:8000/trade/price_stream/')

    console.log(newWebSocket)

    const testSocket = () => {
        newWebSocket.send("XAG_USD")
    };

    const closeSocket = () => {
        newWebSocket.close()
        console.log('websocket is closed')
    };

    return (
        <Container className={'border'} style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '20px'}} fluid>
            <Row style={{height: '60%'}}>
                <Button variant="primary" onClick={testSocket}>WS</Button>
                <Button variant="primary" onClick={closeSocket}>WS Close</Button>
                <PriceParagraph socketConnection={newWebSocket}/>
            </Row>
            <Row style={{height: '40%', background: 'blue'}}>
                <TradeTableData env={env} server={server}/>
            </Row>
        </Container>
    );
};

export default TradePage;