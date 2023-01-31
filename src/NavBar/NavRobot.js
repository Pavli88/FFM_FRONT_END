import Col from "react-bootstrap/Col";
import {Nav} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import {useContext, useState} from "react";

// Context
import DateContext from "../context/date-context";
import RobotContext from "../context/robot-context";
import axios from "axios";

const NavRobot = (props) => {
    const allRobotsData = useContext(RobotContext)['allRobotsData'];
    const selectRobot = useContext(RobotContext)['selectRobot'];
    const selectedRobotData = useContext(RobotContext)['selectedRobotData'];
    const startDate = useContext(DateContext)['startDate'];
    const endDate = useContext(DateContext)['endDate'];
    const setStartDate = useContext(DateContext)['saveStartDate'];
    const setEndDate = useContext(DateContext)['saveEndDate'];

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
            <Col style={{padding:'0px'}}>
                <Row style={{padding: '0px'}}>
                    <Col md="auto" style={{paddingLeft:'5px'}}>
                        <Dropdown onSelect={(id) => getRobotData(id)}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                Robot
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {robotsOptions}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                <Col>
                    <Row style={{alignItems: 'middle'}}>
                        <p style={{margin: '0px', fontSize: '20px', width: '100%'}}>
                            {selectedRobotData['name']}
                        </p>
                    </Row>
                </Col>
                </Row>
            </Col>
            <Col style={{padding:'0px', height:'100%'}}>
                <Row style={{padding:'0px', width:'100%', height: '100%'}}>
                    <Col style={{paddingLeft:'5px'}}>
                        <Nav.Link href="#" disabled>
                            Date
                        </Nav.Link>
                    </Col>
                    <Col>
                        <FormControl
                            type="date"
                            size="sm"
                            className="me-2"
                            aria-label="Search"
                            defaultValue={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={{height:'100%'}}
                        />
                    </Col>
                    <Col>
                        <Nav.Link href="#" disabled>
                            To
                        </Nav.Link>
                    </Col>
                    <Col>
                        <FormControl
                            type="date"
                            size="sm"
                            className="me-2"
                            aria-label="Search"
                            defaultValue={endDate}
                            style={{height:'100%'}}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
export default NavRobot;