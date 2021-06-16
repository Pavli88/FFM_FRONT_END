import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useContext, useState} from "react";
import axios from "axios";
import ServerContext from "../../context/server-context";

const NewRobotForm = () => {
    const server = useContext(ServerContext);

    const [robotName, setRobotName] = useState('');
    const [strategy, setStrategy] = useState('');
    const [broker, setBroker] = useState('oanda');
    const [env, setEnv] = useState('live');

    const robotNameChangeHandler = (event) => {
        setRobotName(event.target.value)
    };

    const robotStrategyHandler = (event) => {
        setStrategy(event.target.value)
    };

    const envHandler = (event) => {
        setEnv(event.target.value);
    };
    console.log(env)
    const submitHandler = (event) => {
        event.preventDefault();

        axios.post(server + '/robots/new_robot/', {
            robot_name: robotName,
            strategy: strategy,
            security: 'test',
            broker: broker,
            env: env,
            account: ' 1234244'
        })
                .then(response => console.log(response))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
    };

    return (
        <Form onSubmit={submitHandler} style={{width: '50%'}}>
            <Form.Group controlId="robotName">
                <Form.Label>Robot Name</Form.Label>
                <Form.Control onChange={robotNameChangeHandler} type="text" placeholder="Robot Name"/>
            </Form.Group>
            <Form.Group controlId="strategy">
                <Form.Label>Strategy</Form.Label>
                <Form.Control onChange={robotStrategyHandler} type="text"/>
            </Form.Group>
            <Form.Group controlId="broker">
                <Form.Label>Broker</Form.Label>
                <Form.Control as="select">
                    <option>oanda</option>
                    <option>Fix</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="env">
                <Form.Label>Environment</Form.Label>
                <Form.Control onChange={envHandler} as="select">
                    <option  value={'live'}>Live</option>
                    <option value={'demo'}>Demo</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="security">
                <Form.Label>Security</Form.Label>
                <Form.Control as="select">
                    <option>Live</option>
                    <option>Demo</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="accountNumber">
                <Form.Label>Account Number</Form.Label>
                <Form.Control as="select">
                    <option>Live</option>
                    <option>Demo</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default NewRobotForm;