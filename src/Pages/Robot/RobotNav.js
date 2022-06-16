import Card from "react-bootstrap/Card";

import "../MainCSS.css"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import axios from "axios";

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
            <Form.Group as={Row} >
                <Col sm={10}>
                    <Form.Control onChange={robotSelectHandler} as="select" style={{margin:'0px', width:'100%'}}>
                        {robotsOptions}
                    </Form.Control>
                </Col>
            </Form.Group>
    );
};

export default RobotNav;