import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";
import {useContext, useRef, useState} from "react";

// Contexts
import DateContext from "../../../context/date-context";
import RobotContext from "../../../context/robot-context";

const NewRobotModal = (props) => {
    const currentDate = useContext(DateContext)['currentDate'];
    const saveNewRobot = useContext(RobotContext)['saveNewRobot'];
    const [inceptionDate, setInceptionDate] = useState(currentDate);
    const robotNameRef = useRef();
    const robotCodeRef = useRef();
    const environmentRef = useRef();
    const currencyRef = useRef();
    const strategyCodeRef = useRef();
    const strategies = props.strategyCodes.map((data) => <option value={data['value']}>{data['label']}</option>)

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'robots/create/robot/', {
            robot_name: robotNameRef.current.value,
            env: environmentRef.current.value,
            currency: currencyRef.current.value,
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
                        <Form.Control onChange={(e) => setInceptionDate(e.target.value)} type="date"
                                      defaultValue={currentDate}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Currency</Form.Label>
                        <Form.Control ref={currencyRef} as="select">
                            <option value={'USD'}>USD</option>
                            <option value={'EUR'}>EUR</option>
                            <option value={'HUF'}>HUF</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Strategy</Form.Label>
                        <Form.Control ref={strategyCodeRef} as="select">
                            {strategies}
                        </Form.Control>
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
    )
};
export default NewRobotModal;