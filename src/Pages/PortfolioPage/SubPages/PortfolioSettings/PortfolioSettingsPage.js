import PortfolioTradeRouting from "./PortfolioTradeRouting/PortfolioTradeRouting";
import PortfolioRiskSettings from "./PortfolioRiskSettings/PortfolioRiskSettings";
import PortfolioValuationSetting from "./PortfolioValuationSetting/PortfolioValuationSetting";
import PortfolioGeneralSettings from "./PortfolioGeneralSettings/PortfolioGeneralSettings";
import PortfolioOwnershipSettings from "./PortfolioOwnershipSettings/PortfolioOwnershipSettings";
import PortfolioDateSettings from "./PortfolioDateSettings/PortfolioDateSettings";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import {useContext} from "react";
import ServerContext from "../../../../context/server-context";

const PortfolioSettingsPage = (props) => {
    const server = useContext(ServerContext)['server'];
    return (
        <Row style={{width:'100%'}}>
            <Col>
                <Row>
                    <Col>
                        <PortfolioGeneralSettings/>
                    </Col>
                    <Col>
                        <PortfolioOwnershipSettings/>
                    </Col>
                </Row>
                <Row>
                    <PortfolioDateSettings/>
                </Row>
                <Row>
                    <PortfolioValuationSetting/>
                </Row>
                <Row>
                    <PortfolioRiskSettings/>
                </Row>
            </Col>
            <Col>
                <PortfolioTradeRouting server={server}/>
            </Col>
        </Row>
    );
};

export default PortfolioSettingsPage;