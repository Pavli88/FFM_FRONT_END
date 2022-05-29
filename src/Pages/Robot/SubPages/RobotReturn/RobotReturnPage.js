import RobotReturn from "./RobotReturn";
import RobotDailyReturns from "./RobotDailyReturns";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {useContext, useState} from "react";
import DateContext from "../../../../context/date-context";

const RobotReturnPage = (props) => {
    const startDate = useContext(DateContext)['startDate'];
    const endDate = useContext(DateContext)['endDate'];

    return (
        <Container fluid>
            <Row style={{width: '100%', height: '50%', margin: '0px'}}>
                <Col style={{width: '50%', height:'100%'}}>
                    <RobotReturn robot={props.robot} start_date={startDate} end_date={endDate}
                             server={props.server}/>
                </Col>
                <Col style={{width: '50%', height:'100%'}}>
                    <RobotDailyReturns robot={props.robot} start_date={startDate} end_date={endDate}
                                   server={props.server}/>
                </Col>
            </Row>
            <Row>

            </Row>
        </Container>
    );
};

export default RobotReturnPage;