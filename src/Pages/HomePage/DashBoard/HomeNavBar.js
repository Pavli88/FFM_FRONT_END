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

const HomeNavBar = (props) => {
    const reportingStartDate = useContext(HomePageReportDateContext)['reportingDate'];
    const saveReportingStartDate = useContext(HomePageReportDateContext)['saveReportingDate'];
    const [strategyOptions, setStrategyOptions] = useState([]);
    const getRobotStrategies = async () => {
        const responseStrategies = await axios.get(props.server + 'robots/get/strategies/', );
        console.log(responseStrategies['data']);
        setStrategyOptions(responseStrategies['data'].map((data) => ({'value': data['id'], 'label': data['name']})));
    };

    useEffect(() => {
        getRobotStrategies();
        }, []
    );


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
                                onChange={(e) => saveReportingStartDate(e.target.value)}
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
                                options={strategyOptions} />
                        </Col>
                        <Col md="auto" style={{paddingLeft: '5px'}}>
                            <Nav.Link href="#" disabled>
                                Market
                            </Nav.Link>
                        </Col>
                        <Col md="auto">
                            <Form.Control as="select">
                                <option value={'live'}>All</option>
                                <option value={'live'}>EUR USD</option>
                                <option value={'live'}>Silver</option>
                            </Form.Control>
                        </Col>
                        <Col md="auto">
                            <Button>Run</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
};
export default HomeNavBar;