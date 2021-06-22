import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import TradeTableData from "./TradePage/TradeTableData";
import {useContext} from "react";
import EnvContext from "../context/env-context";
import ServerContext from "../context/server-context";


const TradePage = () => {
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];

    return (
        <Container className={'border'} style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '20px'}} fluid>
            <Row style={{height: '60%', background: 'green'}}>

            </Row>
            <Row style={{height: '40%', background: 'blue'}}>
                <TradeTableData env={env} server={server}/>
            </Row>
        </Container>
    );
};

export default TradePage;