import RobotDetails from "./RobotDetails";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const RobotDashBoardPage = (props) => {
    return (
        <Row style={{width:'100%'}}>
            <RobotDetails server={props.server} robot={props.robot} default={props.default}/>
        </Row>

    );
};

export default RobotDashBoardPage;
