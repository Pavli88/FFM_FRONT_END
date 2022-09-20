import Modal from "react-bootstrap/Modal";
import Spinner from 'react-bootstrap/Spinner'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ProcessIsLoadingModal = (props) => {
    let button = <></>
    let title = <Modal.Title>
                    <Spinner animation="border"/> Calculating...</Modal.Title>
    if (props.finishedState === true) {
        button = <Modal.Footer>
            <Button onClick={() => props.hide()} variant="primary">
                Ok
            </Button>
        </Modal.Footer>
        title = <Modal.Title>Calculation Finsihed</Modal.Title>
    };

    return (
        <Modal show={props.show}>
            <Modal.Header closeButton>
                {title}
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>{props.response}</Form.Label>
                </Form.Group>
            </Modal.Body>
            {button}
        </Modal>
    );
};
export default ProcessIsLoadingModal;