import Col from "react-bootstrap/Col";
import {Nav} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";

import {useContext} from "react";

// Context
import DateContext from "../context/date-context";
import RobotContext from "../context/robot-context";
import EnvContext from "../context/env-context";
import axios from "axios";

const NavRobot = (props) => {
    const allRobotsData = useContext(RobotContext)['allRobotsData'];
    const selectRobot = useContext(RobotContext)['selectRobot'];
    const selectedRobotData = useContext(RobotContext)['selectedRobotData'];
    const startDate = useContext(DateContext)['startDate'];
    const endDate = useContext(DateContext)['endDate'];
    const setStartDate = useContext(DateContext)['saveStartDate'];
    const setEndDate = useContext(DateContext)['saveEndDate'];
    const saveEnvironment = useContext(EnvContext)['saveEnvironment'];
    const getRobotData = (id) => {
        axios.get(props.server + 'robots/get/robot/' + id)
            .then(response => selectRobot(response['data'][0]))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    const robotsOptions = allRobotsData.map((record) =>
        <Dropdown.Item key={record['id']} eventKey={record['id']}>{record['name']}</Dropdown.Item>);
    return (
        <Row>
            <Nav.Link href="#" disabled>
                {selectedRobotData['name']}
            </Nav.Link>
            <Col>
                <Nav.Link href="#" disabled>
                    From
                </Nav.Link>
            </Col>
            <Col style={{padding: '0px'}}>
                <FormControl
                    type="date"
                    className="me-2"
                    aria-label="Search"
                    defaultValue={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </Col>
            <Col style={{padding: '0px'}}>
                <Nav.Link href="#" disabled>
                    To
                </Nav.Link>
            </Col>
            <Col>
                <FormControl
                    type="date"
                    className="me-2"
                    aria-label="Search"
                    defaultValue={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </Col>
            <Col style={{width: '100%'}}>
                <Dropdown onSelect={(id) => getRobotData(id)}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Robot
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {robotsOptions}
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            {/*<Col>*/}
            {/*    <Dropdown onSelect={(env) => saveEnvironment(env)} style={{margin: '5px'}}>*/}
            {/*        <Dropdown.Toggle variant="success" id="dropdown-basic">*/}
            {/*           Environment*/}
            {/*        </Dropdown.Toggle>*/}
            {/*        <Dropdown.Menu>*/}
            {/*            <Dropdown.Item eventKey="live">Live</Dropdown.Item>*/}
            {/*            <Dropdown.Item eventKey="demo">Demo</Dropdown.Item>*/}
            {/*        </Dropdown.Menu>*/}
            {/*    </Dropdown>*/}
            {/*</Col>*/}
        </Row>
    );
};
export default NavRobot;