import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useRef} from "react";

const NewBroker = (props) => {
    const brokerNameRef = useRef();
    const brokerCodeRef = useRef();
    const onHide = () => {
        props.hide();
    };
    const submitHandler = () => {
        axios.post(props.server + 'accounts/new_broker/', {
            broker: brokerNameRef.current.value,
            broker_code: brokerCodeRef.current.value,
        })
                .then(response => alert(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        props.hide();
    };
    return(
        <Modal show={props.show} onHide={onHide} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>New Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Broker Name</Form.Label>
                    <Form.Control ref={brokerNameRef} type="text"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Broker Code</Form.Label>
                    <Form.Control ref={brokerCodeRef} type="text"/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitHandler}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default NewBroker;