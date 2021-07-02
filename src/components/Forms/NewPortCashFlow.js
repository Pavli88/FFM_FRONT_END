import Form from "react-bootstrap/Form";
import {useState} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const NewPortCashFlow = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [value, setValue] = useState(0.0);
    const [type, setType] = useState('TRADE');

    const valueHandler = (event) => {
        setValue(event.target.value);
    };

    const cashTypeHandler = (event) => {
        setType(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log('form submited')
        axios.post(props.server + 'portfolios/new_cash_flow/', {
            port_name: props.portfolio,
            amount: value,
            type: type,
        })
                .then(response => alert(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        setShow(false);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                New Cash Flow
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Cash Flow</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler} style={{width: '100%'}}>
                        <Form.Group>
                            <Form.Label>Portfolio</Form.Label>
                            <Form.Control type="text" placeholder={props.portfolio} value={props.portfolio} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cash Flow</Form.Label>
                            <Form.Control onChange={valueHandler} type="number" placeholder="Value"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <Form.Control onChange={cashTypeHandler} as="select">
                                <option value={'FUNDING'}>Funding</option>
                                <option value={'TRADE'}>Trade</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
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

export default NewPortCashFlow;