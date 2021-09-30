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
import axios from "axios";

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

    const testSocket2 = () => {
        axios.get(server + 'new_process/',)
                .then()
                .catch((error) => {
                    console.error('Error Message:', error);
                });
    };

    return (
        <Container className={'border'} style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '20px'}} fluid>
            <Row style={{height: '60%'}}>
                <Button variant="primary" onClick={testSocket2}>TEST SOCKET</Button>
                {/*<PriceParagraph socketConnection={newWebSocket}/>*/}
            </Row>
            <Row style={{height: '40%', background: 'blue'}}>
                <TradeTableData env={env} server={server}/>
            </Row>
        </Container>
    );
};

export default TradePage;