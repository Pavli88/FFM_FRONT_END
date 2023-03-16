import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState, useRef, useContext} from "react";

import axios from "axios";
import BrokerContext from "../../../context/broker-context";

const NewBrokerAccount = (props) => {
    const saveAccount = useContext(BrokerContext).saveAccount;
    const newAccount = useContext(BrokerContext).newAccount;
    const [broker, setBroker] = useState('');
    const [env, setEnv] = useState('live');
    const [currency, setCurrency] = useState('USD');
    const accountNameRef = useRef();
    const accountNumberRef = useRef();
    const tokenRef = useRef();
    const onHide = () => {
        props.hide();
    };

    const submitHandler = () => {
        axios.post(props.server + 'accounts/new_account/', {
            broker_name: broker,
            account_number: accountNumberRef.current.value,
            account_name: accountNameRef.current.value,
            env: env,
            token: tokenRef.current.value,
            currency: currency,
            owner: props.user
        })
                .then(function(response){

                    if (response.data === 'Account is created successfully!'){
                        saveAccount(newAccount + 1)
                        alert(response.data)
                    }
                })
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        setBroker('');
        setEnv('live');
        setCurrency('USD');
        props.hide();
    };

    const brokerNameHandler = (event) => {
        setBroker(event.target.value);
    };

    const envHandler = (event) => {
        setEnv(event.target.value);
    };

    const currencyHandler = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <Modal show={props.show} onHide={onHide} animation={false}>
            <Modal.Header>
                <Modal.Title>New Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Form.Label>Broker</Form.Label>
                    <Form.Control onChange={brokerNameHandler} type="text"/>
                </div>
                <div>
                    <Form.Label>Account Name</Form.Label>
                    <Form.Control ref={accountNameRef} type="text"/>
                </div>
                <div>
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control ref={accountNumberRef} type="text"/>
                </div>
                <div>
                    <Form.Label>Token</Form.Label>
                    <Form.Control ref={tokenRef} type="text"/>
                </div>
                <div>
                    <Form.Label>Environment</Form.Label>
                    <Form.Control onChange={envHandler} as="select">
                        <option value={'live'}>Live</option>
                        <option value={'demo'}>Demo</option>
                    </Form.Control>
                </div>
                <div>
                    <Form.Label>Currency</Form.Label>
                    <Form.Control onChange={currencyHandler} as="select">
                        <option value={'USD'}>USD</option>
                        <option value={'EUR'}>EUR</option>
                    </Form.Control>
                </div>
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