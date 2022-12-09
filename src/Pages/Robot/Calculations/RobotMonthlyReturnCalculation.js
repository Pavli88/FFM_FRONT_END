import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import {useContext, useState} from "react";

// Context
import RobotContext from "../../../context/robot-context";
import serverContext from "../../../context/server-context";

const RobotMonthlyReturnCalculation = (props) => {
    const server = useContext(serverContext)['server'];
    const [month, setMonth] = useState('01-31');
    const [year, setYear] = useState('2020');
    const handleClose = () => {
        props.hide();
    };
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(server + 'robots/calculate/monthly_return/', {
            robot: [props.robotData['id']],
            month: month,
            year: year,
        })
            .then(response => alert(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    return(
        <Modal show={props.show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Monthly Return - {props.robotData['name']}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width: '100%', height: '200px'}}>
                <Form.Group className="mb-3" controlId="quantity_type">
                    <Form.Label>Year</Form.Label>
                    <Form.Control onChange={(e) => setYear(e.target.value)} as="select">
                        <option value={'2020'}>2020</option>
                        <option value={'2021'}>2021</option>
                        <option value={'2022'}>2022</option>
                        <option value={'2023'}>2023</option>
                        <option value={'2024'}>2024</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="quantity_type">
                    <Form.Label>Month</Form.Label>
                    <Form.Control onChange={(e) => setMonth(e.target.value)} as="select">
                        <option value={'01-31'}>January</option>
                        <option value={'02-28'}>February</option>
                        <option value={'03-31'}>March</option>
                        <option value={'04-30'}>April</option>
                        <option value={'05-31'}>May</option>
                        <option value={'06-30'}>June</option>
                        <option value={'07-31'}>July</option>
                        <option value={'08-31'}>August</option>
                        <option value={'09-30'}>September</option>
                        <option value={'10-31'}>October</option>
                        <option value={'11-30'}>November</option>
                        <option value={'12-31'}>December</option>
                    </Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={submitHandler}>
                    Calculate
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default RobotMonthlyReturnCalculation;