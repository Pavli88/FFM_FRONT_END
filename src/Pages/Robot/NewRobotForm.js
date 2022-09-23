import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {useContext, useRef, useState} from "react";
import axios from "axios";

// Context
import RobotContext from "../../context/robot-context";
import DateContext from "../../context/date-context";

const NewRobotForm = (props) => {
    const currentDate = useContext(DateContext)['currentDate'];
    const [inceptionDate, setInceptionDate] = useState(currentDate);
    const robotNameRef = useRef();
    const robotCodeRef = useRef();
    const environmentRef = useRef();
    const saveNewRobot = useContext(RobotContext)['saveNewRobot'];

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'robots/new/robot/', {
            robot_name: robotNameRef.current.value,
            env: environmentRef.current.value,
            inception_date: inceptionDate,
        })
                .then(response => alert(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        saveNewRobot(robotCodeRef.current.value);
        props.hide();
    };

    return (
        <>
            <Modal show={props.show} onHide={() => props.hide()} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>New Robot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler} style={{width: '100%'}}>
                        <Form.Group>
                            <Form.Label>Robot Name</Form.Label>
                            <Form.Control ref={robotNameRef} type="text" maxLength={20}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Environment</Form.Label>
                            <Form.Control ref={environmentRef} as="select">
                                <option value={'live'}>Live</option>
                                <option value={'demo'}>Demo</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Inception Date</Form.Label>
                            <Form.Control onChange={(e) => setInceptionDate(e.target.value)} type="date" defaultValue={currentDate}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.hide()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitHandler}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewRobotForm;