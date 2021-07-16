import {useState} from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";

const PositionCalculation = (props) => {
    const [loadState, setLoadState] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();

        setLoadState(true);

        axios.post(props.server + 'portfolios/positions/', {
            portfolio: 'ALL',
            start_date: props.start_date,
            end_date: props.end_date,
        })
            .then(response => setLoadState(false))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    return (
        <>
            <Form onSubmit={submitHandler} style={{width: '100%'}}>
                <Form.Group>
                    <Button variant="primary" onClick={submitHandler}>
                        Position
                    </Button>
                </Form.Group>
            </Form>
            <Modal show={loadState}>
                <Modal.Body style={{width: '200px', height: '300px'}}>
                    <div style={{width:'100%'}}>
                        <h5>Portfolio position calculation</h5>
                        <h5>Rundate {props.start_date} and {props.end_date}</h5>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PositionCalculation;