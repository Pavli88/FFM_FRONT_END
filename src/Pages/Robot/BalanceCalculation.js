import {Card} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const BalanceCalculation = (props) => {

    const [dateBegin, setDateBegin] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [robot, setRobot] = useState('ALL');
    const [loadState, setLoadState] = useState(false);

    const startDateHandler = (event) => {
        setDateBegin(event.target.value);
    };

    const endDateHandler = (event) => {
        setDateEnd(event.target.value);
    };

    const robotHandler = (event) => {
        setRobot(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setLoadState(true);

        axios.post(props.server + 'robots/process_hub/', {
            process: 'Balance',
            robot: robot,
            start_date: dateBegin,
            end_date: dateEnd,
        })
            .then(response => setLoadState(false))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    return (
        <Card>
            <Card.Header as="h5">
                Balance Calculator
            </Card.Header>
            <Card.Body>
                <Form onSubmit={submitHandler} style={{width: '100%'}}>
                    <Form.Group>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control onChange={startDateHandler} type="date"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control onChange={endDateHandler} type="date"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Robots</Form.Label>
                        <Form.Control onChange={robotHandler} as="select">
                            <option value={'ALL'}>ALL</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={submitHandler}>
                        Calculate
                    </Button>
                </Form>
            </Card.Body>
            <Modal show={loadState} >
                <Modal.Body style={{width: '200px', height:'300px'}}>
                    <h2>Calculating ...</h2>
                </Modal.Body>
            </Modal>
        </Card>
    );
};

export default BalanceCalculation;