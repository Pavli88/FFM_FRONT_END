import PortfolioTradeRouting from "./PortfolioTradeRouting/PortfolioTradeRouting";
import PortfolioRiskSettings from "./PortfolioRiskSettings/PortfolioRiskSettings";
import PortfolioValuationSetting from "./PortfolioValuationSetting/PortfolioValuationSetting";
import PortfolioGeneralSettings from "./PortfolioGeneralSettings/PortfolioGeneralSettings";
import PortfolioOwnershipSettings from "./PortfolioOwnershipSettings/PortfolioOwnershipSettings";
import PortfolioDateSettings from "./PortfolioDateSettings/PortfolioDateSettings";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import {useContext, useEffect, useState} from "react";
import ServerContext from "../../../../context/server-context";
import axios from "axios";

const PortfolioSettingsPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const [portfolioData, setPortfolioData] = useState([]);
    console.log(portfolioData)
    useEffect(() => {
            axios.get(server + 'portfolios/get/portfolio/', {
                params: {
                    portfolio: props.portfolio
                }
            })
                .then(response => setPortfolioData(response.data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props.portfolio]
    );

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