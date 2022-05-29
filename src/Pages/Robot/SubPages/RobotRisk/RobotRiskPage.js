import RobotDrawDown from "./RobotDrawDown";
import DateSelectorRobotPage from "../../DateSelectorRobotPage";
// Bootstrap
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {useState} from "react";

const RobotRiskPage = (props) => {
    return (
        <Container fluid>
            <Row style={{width: '100%', height: '100%', margin: '0px'}}>
                <Row style={{width: '100%', height: '400px', margin: '0px'}}>
                    <RobotDrawDown robot={props.robot} server={props.server}/>
                </Row>
            </Row>
        </Container>
    );
};

export default RobotRiskPage;