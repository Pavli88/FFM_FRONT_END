import PortfolioSettings from "./PortfolioSettings";
import PortfolioTradeRouting from "./PortfolioTradeRouting/PortfolioTradeRouting";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import serverContext from "../../../../context/server-context";
import {useContext} from "react";
import ServerContext from "../../../../context/server-context";

const PortfolioSettingsPage = (props) => {
    const server = useContext(ServerContext)['server'];
    return (
        <Row style={{width:'100%'}}>
            <Col>
                <PortfolioSettings/>
            </Col>
            <Col>
                <PortfolioTradeRouting server={server}/>
            </Col>
        </Row>
    );
};

export default PortfolioSettingsPage;