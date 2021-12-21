import RobotDrawDown from "./RobotDrawDown";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const RobotRiskPage = (props) => {
    return (
            <Row style={{width: '100%', height:'100%', margin:'0px'}}>
                <Row style={{width: '100%', height: '400px', margin:'0px'}}>
                    <RobotDrawDown robot={props.robot} start_date={props.start_date} end_date={props.end_date} server={props.server}/>
                </Row>
            </Row>
    );
};

export default RobotRiskPage;