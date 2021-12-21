import RobotReturn from "./RobotReturn";
import RobotDailyReturns from "./RobotDailyReturns";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RobotReturnPage = (props) => {
    return (
        <Row style={{width: '100%', height:'100%', margin:'0px'}}>
            <Row style={{width: '50%', height: '300px', margin:'0px'}}>
                <RobotReturn robot={props.robot} start_date={props.start_date} end_date={props.end_date} server={props.server}/>
            </Row>
            <Row style={{width: '50%', height: '300px', margin:'0px'}}>
                <RobotDailyReturns robot={props.robot} start_date={props.start_date} end_date={props.end_date} server={props.server}/>
            </Row>
        </Row>
    );
};

export default RobotReturnPage;