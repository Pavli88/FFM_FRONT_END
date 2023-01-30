import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
import {useRef} from "react";


const NewStrategyModal = (props) => {
    const nameRef = useRef();
    const descriptionRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'robots/create/strategy/', {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
        })
                .then(response => alert(response['data']['response']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        props.hide();
    };
    return (
        <Modal show={props.show} onHide={() => props.hide()} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>New Strategy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler} style={{width: '100%'}}>
                    <Form.Group>
                        <Form.Label>Strategy Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" maxLength={20}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descriptionRef}
                                      as="textarea"
                                      rows={4}>
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
    );
};
export default NewStrategyModal;