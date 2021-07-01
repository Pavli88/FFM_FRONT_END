import {Card} from "react-bootstrap";
import NewRobotForm from "../../components/Forms/NewRobotForm";
import Table from "react-bootstrap/Table";
import TableHeaderGenerator from "../../components/Table";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {useState} from "react";
import Button from "react-bootstrap/Button";

const BalanceCalculation = (props) => {

    const [dateBegin, setDateBegin] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [robot, setRobot] = useState('ALL');

    console.log(dateBegin)
    console.log(dateEnd)

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

        axios.post(props.server + 'robots/process_hub/', {
            process: 'Balance',
            robot: robot,
            start_date: dateBegin,
            end_date: dateEnd,
        })
            .then(response => console.log(response))
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
        </Card>
    );
};

export default BalanceCalculation;