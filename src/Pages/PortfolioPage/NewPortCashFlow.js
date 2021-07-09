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
    const [type, setType] = useState('INFLOW');
    const [currency, setCurrency] = useState('USD');

    const valueHandler = (event) => {
        setValue(event.target.value);
    };

    const cashTypeHandler = (event) => {
        setType(event.target.value);
    };

    const currencyHandler = (event) => {
        setCurrency(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log('form submited')
        axios.post(props.server + 'portfolios/new_cash_flow/', {
            port_name: props.portfolio,
            amount: value,
            type: type,
            currency: currency,
        })
                .then(response => alert(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        setCurrency('USD');
        setShow(false);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Funding
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Funding</Modal.Title>
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
                            <Form.Label>Currency</Form.Label>
                            <Form.Control onChange={currencyHandler} as="select">
                                <option value={'USD'}>USD</option>
                                <option value={'EUR'}>EUR</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <Form.Control onChange={cashTypeHandler} as="select">
                                <option value={'INFLOW'}>Inflow</option>
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