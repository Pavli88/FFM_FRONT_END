import RobotDrawDown from "./RobotDrawDown";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const RobotRiskPage = (props) => {
    return (
            <Row style={{height:'400px', width:'100%', margin:'0px'}}>
                <Col style={{width:'50%'}}>
                    <RobotDrawDown robot={props.robot} start_date={props.start_date} end_date={props.end_date} server={props.server}/>
                </Col>
                <Col style={{width:'50%'}}>

                </Col>
            </Row>
    );
};

export default RobotRiskPage;