import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState} from "react";

import axios from "axios";

const NewBrokerAccount = (props) => {

    const [broker, setBroker] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [token, setToken] = useState('');
    const [env, setEnv] = useState('live');
    const [currency, setCurrency] = useState('USD');

    const onHide = () => {
        props.hide();
    };

    const submitHandler = () => {
        axios.post(props.server + 'accounts/new_account/', {
            broker_name: broker,
            account_number: accountNumber,
            env: env,
            token: token,
            currency: currency,
        })
                .then(response => alert(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        setBroker('');
        setAccountNumber('');
        setToken('');
        setEnv('live');
        setCurrency('USD');
        props.hide();
    };

    const brokerNameHandler = (event) => {
        setBroker(event.target.value);
    };

    const accountNumberHandler = (event) => {
        setAccountNumber(event.target.value);
    };

    const tokenHandler = (event) => {
        setToken(event.target.value);
    };

    const envHandler = (event) => {
        setEnv(event.target.value);
    };

    const currencyHandler = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <Modal show={props.show} onHide={onHide} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>New Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Control onChange={brokerNameHandler} type="text" placeholder="Broker Name"/>
                </Form.Group>
                <Form.Group>
                    <Form.Control onChange={accountNumberHandler} type="text" placeholder="Account Number"/>
                </Form.Group>
                <Form.Group>
                    <Form.Control onChange={tokenHandler} type="text" placeholder="Token"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Environment</Form.Label>
                    <Form.Control onChange={envHandler} as="select">
                        <option value={'live'}>Live</option>
                        <option value={'demo'}>Demo</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Currency</Form.Label>
                    <Form.Control onChange={currencyHandler} as="select">
                        <option value={'USD'}>USD</option>
                        <option value={'EUR'}>EUR</option>
                    </Form.Control>
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

export default NewBrokerAccount;