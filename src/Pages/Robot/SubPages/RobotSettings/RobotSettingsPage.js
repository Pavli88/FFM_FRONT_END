import RobotRiskSettings from "./RobotRiskSettings";
import RobotSettings from "./RobotSettings";

// Bootstrap
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {useEffect, useState} from "react";

const RobotSettingsPage = (props) => {
    return (
        <Row style={{height: '100%', width: '100%', margin:'0px'}}>
            <Col>
                <RobotRiskSettings robot={props.robot} server={props.server}/>
            </Col>
            <Col>
                <RobotSettings robot={props.robot} server={props.server}/>
            </Col>
        </Row>
    );
};

export default RobotSettingsPage;