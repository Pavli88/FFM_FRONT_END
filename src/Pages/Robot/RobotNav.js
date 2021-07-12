import Card from "react-bootstrap/Card";

import "../MainCSS.css"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import axios from "axios";

const RobotNav = (props) => {
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);
    const [robotsData, setRobotsData] = useState(props.robots);

    const robotSelectHandler = (event) => {
        // setRobot(event.target.value);
    };

    const startDateHandler = (event) => {
        setStartDate(event.target.value);
    };

    const endDateHandler = (event) => {
        setEndDate(event.target.value);
    };

    useEffect(() => {
            axios.get(props.server + 'robots/get_robots/' + props.env)
                .then(response => setRobotsData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    const robotsOptions = robotsData.map((record) =>
        <option key={record['id']} value={record['name']}>{record['name']}</option>);

    return (
        <Row>
            <Col style={{display: 'flex'}}>
                <Row>
                    <Col>
                        <Form.Group as={Row}>
                            <Form.Label className="form-label-first" column sm={2}>
                                Robot
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control onChange={robotSelectHandler} as="select">
                                    {robotsOptions}
                                </Form.Control>

                            </Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Row}>
                            <Form.Label className="form-label-first" column sm={2}>
                                From
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="date" onChange={startDateHandler}/>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Row}>
                            <Form.Label className="form-label-first" column sm={2}>
                                To
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="date" onChange={endDateHandler}/>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
            </Col>
            <Col>

            </Col>
        </Row>
    );
};

export default RobotNav;