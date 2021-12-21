import {Card} from "react-bootstrap";

import {useState} from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";

const RobotBalanceCalculation = (props) => {
    const [loadState, setLoadState] = useState(false);

    const handleClose = () => {
        props.hide();
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoadState(true);

        axios.post(props.server + 'robots/calculate_robot_balance/', {
            process: 'Balance',
            robot: props.robot,
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
            <Modal show={props.show} onHide={handleClose} animation={false}>
                <Modal.Body style={{width: '200px', height: '300px'}}>
                    <Form onSubmit={submitHandler} style={{width: '100%'}}>
                        <Form.Group>
                            <Button variant="primary" onClick={submitHandler}>
                                Balance
                            </Button>
                        </Form.Group>
                    </Form>
                    <h2>Calculating ...</h2>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default RobotBalanceCalculation;