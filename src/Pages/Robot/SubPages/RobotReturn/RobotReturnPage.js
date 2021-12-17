import RobotReturn from "./RobotReturn";
import RobotDailyReturns from "./RobotDailyReturns";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RobotReturnPage = (props) => {
    return (
        <Row style={{height:'400px', width:'100%', margin:'0px'}}>
            <Col style={{margin:'0px', background:'green'}}>
                <RobotReturn robot={props.robot} start_date={props.start_date} end_date={props.end_date} server={props.server}/>
            </Col>
            <Col style={{margin:'0px', background:'blue'}}>
                <RobotDailyReturns robot={props.robot} start_date={props.start_date} end_date={props.end_date} server={props.server}/>
            </Col>
        </Row>
    );
};

export default RobotReturnPage;