import {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import Form from "react-bootstrap/Form";

const RiskEntryModal = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(props.show);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Risk Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Daily Loss Limit %</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Daily Max Number of Trades</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Risk per Trade %</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Pyramiding Level</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Quantity Type</Form.Label>
                            <Form.Control as="select">
                                <option>Stop Based</option>
                                <option>Fix</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const PortfolioEntryModal = () => {

};

export default RiskEntryModal;