import {Card} from "react-bootstrap";

import {useState} from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";

const RobotPricing = (props) => {
    const [loadState, setLoadState] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        setLoadState(true);

        axios.post(props.server + 'robots/pricing/', {
            robot: props.robot,
            start_date: props.start_date,
            end_date: props.end_date,
        })
            .then(response => console.log(response['data'][0]))
            .then(data => setLoadState(false))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    return (
        <>
            <Form onSubmit={submitHandler} style={{width: '100%'}}>
                <Form.Group>
                    <Button variant="primary" onClick={submitHandler}>
                        Pricing
                    </Button>
                </Form.Group>
            </Form>
            <Modal show={loadState}>
                <Modal.Body style={{width: '200px', height: '300px'}}>
                    <h2>Pricing Robots...</h2>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default RobotPricing;