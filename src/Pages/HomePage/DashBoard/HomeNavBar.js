import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import {Nav} from "react-bootstrap";
import Button from "react-bootstrap/Button";

import {useContext, useEffect, useState} from "react";
import Select from 'react-select'

// Contexts
import HomePageReportDateContext from "../contexts/HomePageReportDateContext";
import axios from "axios";

import NewStrategyModal from "../HomePageModals/NewStrategyModal";

const HomeNavBar = (props) => {
    const date = new Date();
    const firstDayOfYear = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().substr(0,10);
    const [reportingStartDate, setReportingStartDate] = useState(firstDayOfYear);

    const saveRequestParameters = useContext(HomePageReportDateContext)['saveRequestParameters'];
    const [strategyOptions, setStrategyOptions] = useState([]);
    const [selectedStrategies, setSelectedStrategies] = useState([]);
    const [newStrategyModalStatus, setNewStrategyModalStatus] = useState(false);

    const getRobotStrategies = async () => {
        const responseStrategies = await axios.get(props.server + 'robots/get/strategies/',);
        setStrategyOptions(responseStrategies['data'].map(function (data, index) {
            if (index === 0) {
                return {'value': '0', 'label': 'All'}
            } else {
                return {'value': data['id'], 'label': data['name']}
            }
            ;
        }));
    };

    useEffect(() => {
        getRobotStrategies();
        }, [newStrategyModalStatus]
    );

    const fetchRobots = () => {
        axios.get(props.server + 'robots/get/active/' + props.env)
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
                            <Select
                                isMulti
                                options={strategyOptions}
                                defaultValue={selectedStrategies}
                                onChange={(e) => setSelectedStrategies(e)}/>
                        </Col>
                        <Col md="auto">
                            <Button onClick={fetchRobots}>Run</Button>
                        </Col>
                        <Col md="auto">
                            <Button onClick={() => setNewStrategyModalStatus(true)}>New Strategy</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <NewStrategyModal server={props.server} show={newStrategyModalStatus} hide={() => setNewStrategyModalStatus(false)}/>
        </Card>
    )
};
export default HomeNavBar;