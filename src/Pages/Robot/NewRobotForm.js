import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useEffect, useState, useRef} from "react";
import axios from "axios";
import OptionLoader from "../../components/Options";
import Modal from "react-bootstrap/Modal";

const NewRobotForm = (props) => {
    const [robotName, setRobotName] = useState('');
    const [strategy, setStrategy] = useState('');
    const [broker, setBroker] = useState('oanda');
    const [env, setEnv] = useState('live');
    const [account, setAccount] = useState('');
    const [instrument, setInstrument] = useState('');

    console.log(account);
    console.log(instrument)

    const handleClose = () => {
        props.hide();
    };

    const accountParams = {
        'broker': broker,
        'env': env,
    };

    const instrumentParams = {
        'broker': broker,
    };

    const robotNameChangeHandler = (event) => {
        setRobotName(event.target.value)
    };

    const robotStrategyHandler = (event) => {
        setStrategy(event.target.value)
    };

    const envHandler = (event) => {
        setEnv(event.target.value);
    };

    const instHandler = (event) => {
        setInstrument(event.target.value);
    };

    const brokerHandler = (event) => {
        setBroker(event.target.value);
    };

    const accountHandler = (event) => {
        setAccount(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        axios.post(props.server + 'robots/new_robot/', {
            robot_name: robotName,
            strategy: strategy,
            security: instrument,
            broker: broker,
            env: env,
            account: account,
        })
                .then(response => console.log(response))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        props.hide();
    };

    return (
        <>
            <Modal show={props.show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>New Robot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler} style={{width: '100%'}}>
                        <Form.Group>
                            <Form.Label>Robot Name</Form.Label>
                            <Form.Control onChange={robotNameChangeHandler} type="text" placeholder="Robot Name"
                                          maxLength={20}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Strategy</Form.Label>
                            <Form.Control onChange={robotStrategyHandler} as="select">
                                <option value={'Initiative'}>Initiative</option>
                                <option value={'Responsive'}>Responsive</option>
                                <option value={'Correction'}>Correction</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Broker</Form.Label>
                            <Form.Control onChange={brokerHandler} as="select">
                                <option>oanda</option>
                                <option>Fix</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Environment</Form.Label>
                            <Form.Control onChange={envHandler} as="select">
                                <option value={'live'}>Live</option>
                                <option value={'demo'}>Demo</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Instruments</Form.Label>
                            <Form.Control onChange={instHandler} as="select">
                                <OptionLoader
                                    url={props.server + 'instruments/get_instruments/'}
                                    params={instrumentParams}
                                    code={'instrument_name'}
                                    value={'instrument_name'}
                                />
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control onChange={accountHandler} as="select">
                                <OptionLoader
                                    url={props.server + 'accounts/get_accounts_data/'}
                                    params={accountParams}
                                    code={'account_number'}
                                    value={'account_number'}
                                />
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

export default NewRobotForm;