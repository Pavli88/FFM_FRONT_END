import RobotRiskSettings from "./RobotRiskSettings";
import RobotSettings from "./RobotSettings";

// Bootstrap

// Context
import serverContext from "../../../../context/server-context";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useContext} from "react";

const RobotSettingsPage = (props) => {
    const server = useContext(serverContext)['server'];
    return (
        <Row style={{height: '100%', width: '100%', margin: '0px'}}>
            <Col>
                <RobotRiskSettings server={server}/>
            </Col>
            <Col>
                <RobotSettings server={server}/>
            </Col>
        </Row>
    );
};

export default RobotSettingsPage;