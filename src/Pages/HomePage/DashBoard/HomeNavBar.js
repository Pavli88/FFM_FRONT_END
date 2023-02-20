import FormControl from "react-bootstrap/FormControl";
import InputGroup from 'react-bootstrap/InputGroup';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import {Nav} from "react-bootstrap";
import Button from "react-bootstrap/Button";

import {useContext, useEffect, useState} from "react";
import Select from 'react-select'
import axios from "axios";

// Contexts
import HomePageReportDateContext from "../contexts/HomePageReportDateContext";
import RobotContext from "../../../context/robot-context";
import DateContext from "../../../context/date-context";

// Modals
import NewStrategyModal from "../HomePageModals/NewStrategyModal";
import NewRobotModal from "../HomePageModals/NewRobotModal";
import ManageFundsModal from "../HomePageModals/ManageFundsModal";

// Icons
import { BsArrowClockwise, BsCashStack, BsTrophy, BsFillPersonPlusFill } from "react-icons/bs";

const HomeNavBar = (props) => {
    const {server, env} = props;
    const firstDayOfYear = useContext(DateContext)['firstDayOfCurrentYear'];
    const saveRequestParameters = useContext(HomePageReportDateContext)['saveRequestParameters'];
    const robotStrategies = useContext(RobotContext)['robotStrategies'];
    const [reportingStartDate, setReportingStartDate] = useState(firstDayOfYear);
    const [selectedStrategies, setSelectedStrategies] = useState([]);
    const [newStrategyModalStatus, setNewStrategyModalStatus] = useState(false);
    const [newRobotModalStatus, setNewRobotModalStatus] = useState(false);
    const [fundsModalStatus, setFundsModalStatus] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    console.log(robotStrategies)
    const fetchRobots = () => {
        axios.get(server + 'robots/get/active/' + env)
                .then(response => saveRequestParameters({'startDate': reportingStartDate, 'robots': response['data']}))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
    };
    return (
        <Card style={{height: '50px', paddingTop: '0px', margin: '0px'}}>
            <Row style={{height:'100%', padding:'5px'}}>
                <Col style={{padding: '0px', height: '100%'}}>
                    <Row style={{padding: '0px', width: '100%', height: '100%'}}>
                        <Col md="auto" style={{paddingLeft: '5px'}}>
                            <Nav.Link href="#" disabled>
                                Period Start
                            </Nav.Link>
                        </Col>
                        <Col md="auto">
                            <FormControl
                                type="date"
                                size="sm"
                                className="me-2"
                                aria-label="Search"
                                defaultValue={reportingStartDate}
                                onChange={(e) => setReportingStartDate(e.target.value)}
                                style={{height: '100%'}}
                            />
                        </Col>
                        <Col md="auto" style={{paddingLeft: '5px'}}>
                            <Nav.Link href="#" disabled>
                                Strategy
                            </Nav.Link>
                        </Col>
                        <Col md="auto">
                            <InputGroup>
                                <InputGroup.Text>All</InputGroup.Text>
                                <InputGroup.Checkbox aria-label="Checkbox for following text input" onChange={function(){
                                    setIsDisabled((state) => !state);
                                    setSelectedStrategies([]);
                                }}/>
                                <Select
                                    isMulti
                                    options={robotStrategies}
                                    value={selectedStrategies}
                                    isDisabled={isDisabled}
                                    onChange={(e) => setSelectedStrategies(e)}/>
                            </InputGroup>
                        </Col>
                        <Col md="auto">
                            <Button onClick={fetchRobots}>Run</Button>
                        </Col>
                        <Col md="auto">
                            <Button onClick={() => setNewStrategyModalStatus(true)}><BsTrophy style={{color:'white', fontSize:'16px', borderColor:'darkgrey'}}/></Button>
                        </Col>
                        <Col md="auto">
                            <Button onClick={() => setNewRobotModalStatus(true)}><BsFillPersonPlusFill style={{color:'white', fontSize:'16px', borderColor:'darkgrey'}}/></Button>
                        </Col>
                        <Col md="auto">
                            <Button onClick={() => setFundsModalStatus(true)}><BsCashStack style={{color:'white', fontSize:'16px', borderColor:'darkgrey'}}/></Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <NewStrategyModal server={server} show={newStrategyModalStatus}
                              hide={() => setNewStrategyModalStatus(false)}/>
            <NewRobotModal server={server} show={newRobotModalStatus} hide={() => setNewRobotModalStatus(false)}
                           strategyCodes={robotStrategies}/>
            <ManageFundsModal server={server} show={fundsModalStatus}
                              hide={() => setFundsModalStatus(false)}/>
        </Card>
    )
};
export default HomeNavBar;