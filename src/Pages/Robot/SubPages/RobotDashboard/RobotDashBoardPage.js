import RobotDetails from "./RobotDetails";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const RobotDashBoardPage = (props) => {
    return (
        <Row style={{width: '100%', height:'100%', margin:'0px'}}>
            <Row style={{width: '100%', height: '100px', margin:'0px'}}>
                <RobotDetails server={props.server} robot={props.robot} default={props.default}/>
            </Row>

        </Row>

    );
};

export default RobotDashBoardPage;
