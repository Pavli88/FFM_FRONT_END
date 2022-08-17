import RobotReturn from "./RobotReturn";
import RobotDailyReturns from "./RobotDailyReturns";
import RobotMonthlyReturns from "./RobotMonthlyReturns";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {useContext, useEffect, useState} from "react";
import DateContext from "../../../../context/date-context";
import axios from "axios";

const RobotReturnPage = (props) => {
    const startDate = useContext(DateContext)['startDate'];
    const endDate = useContext(DateContext)['endDate'];

    return (
        <Container fluid>
            <Row style={{width: '100%', height: '100%', margin: '0px'}}>
                <Col style={{width: '50%', height: '100%'}}>
                    <Row style={{height: '60%', padding: '4px'}}>
                        <RobotReturn robot={props.robot} start_date={startDate} end_date={endDate}
                                     server={props.server}/>
                    </Row>
                    <Row style={{height: '40%', padding: '4px'}}>
                        <RobotDailyReturns robot={props.robot} start_date={startDate} end_date={endDate}
                                           server={props.server}/>
                    </Row>
                </Col>
                <Col>
                    <Row style={{height: '40%', padding: '4px'}}>
                        <RobotMonthlyReturns robot={props.robot} start_date={startDate} end_date={endDate}
                                           server={props.server}/>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default RobotReturnPage;