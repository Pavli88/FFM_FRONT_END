import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import axios from "axios";

const NewRobotForm = () => {

    const [robotName, setRobotName] = useState('')

    const robotNameChangeHandler = (event) => {
        setRobotName(event.target.value)
    };

    const submitHandler = (event) => {
        event.preventDefault();

        axios.post('http://127.0.0.1:8000/robots/new_robot/', {
            robot_name: robotName,
            strategy: 'test',
            security: 'test',
            broker: 'oanda',
            env: 'live',
            account: ' 1234244'
        })
                .then(response => console.log(response))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
    };

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Robot Name</Form.Label>
                <Form.Control onChange={robotNameChangeHandler} type="text" placeholder="Robot Name"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default NewRobotForm;