import {Card} from "react-bootstrap";

import {useContext, useState} from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ToggleButton from 'react-bootstrap/ToggleButton'
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';

// Context
import DateContext from "../../../context/date-context";

const RobotBalanceCalculation = (props) => {
    const startDate = useContext(DateContext)['startDate'];
    const endDate = useContext(DateContext)['endDate'];
    const [beginDate, setBeginDate] = useState(startDate);
    const [loadState, setLoadState] = useState(false);
    const [checked, setChecked] = useState(false);
    const [startDateSection, setStartDateSection] = useState(<Form.Group>
        <Form.Label>Start Date</Form.Label>
        <Form.Control onChange={(e) => setBeginDate(e.target.value)} type="date" defaultValue={startDate}/>
    </Form.Group>);

    console.log(props.robotData)
    console.log(checked)
    console.log(beginDate)
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'robots/calculate/balance/', {
            robot_id: props.robotData['id'],
            start_date: beginDate,
            end_date: endDate,
        })
            .then(response => {
                alert(response['data'])
                props.hide()
            })
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    return (
        <Modal show={props.show} onHide={() => props.hide()} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Balance - {props.robotData['name']}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width: '100%', height: '300px'}}>
                <Form onSubmit={submitHandler} style={{width: '100%'}}>
                    <ToggleButton
                        className="mb-2"
                        id="toggle-check"
                        type="checkbox"
                        variant="outline-primary"
                        checked={checked}
                        value="1"
                        onChange={(e) => {
                            setChecked(e.currentTarget.checked);
                            if (checked === false) {
                                setStartDateSection(<></>);
                                setBeginDate(props.robotData['inception_date']);
                            } else {
                                setStartDateSection(<Form.Group>
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control onChange={(e) => setBeginDate(e.target.value)} type="date" defaultValue={startDate}/>
                                </Form.Group>)
                                setBeginDate(startDate);
                            };

                        }}
                    >
                        Since Inception
                    </ToggleButton>
                    {startDateSection}
                    <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" defaultValue={endDate}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={submitHandler}>
                    Calculate
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RobotBalanceCalculation;