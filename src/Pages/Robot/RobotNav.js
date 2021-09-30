import Card from "react-bootstrap/Card";

import "../MainCSS.css"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import axios from "axios";

import BalanceCalculation from "./BalanceCalculation";

const RobotNav = (props) => {
    const [robotsData, setRobotsData] = useState(props.robots);

    const robotSelectHandler = (event) => {
        props.robotChange(event.target.value);
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
        <>
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
        </>
    );
};

export default RobotNav;