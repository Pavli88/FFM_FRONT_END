import {useState} from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";

const PositionCalculation = (props) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const [startDate, setStartDate] = useState(firstDay.toISOString().substr(0,10));
    const [endDate, setEndDate] = useState(date.toISOString().substr(0,10));
    const [loadState, setLoadState] = useState(false);

    const startDateHandler = (event) => {
        setStartDate(event.target.value);
    };

    const endDateHandler = (event) => {
        setEndDate(event.target.value);
    };

    const handleClose = () => {
        props.hide();
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoadState(true);
        axios.post(props.server + 'portfolios/positions/', {
            portfolio: 'ALL',
            start_date: startDate,
            end_date: endDate,
        })
            .then(response => setLoadState(false))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    return (
        <>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Portfolio Position Calculation</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{height: '300px'}}>
                    <Form onSubmit={submitHandler} style={{width: '100%', height: '100%', margin:'0px'}}>
                            <Row style={{width:'100%', margin:'0px'}}>
                                <Form.Group style={{width:'100%', margin:'0px'}}>
                                    <Form.Label className="form-label-first" column sm={2}>
                                        From
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="date" onChange={startDateHandler}
                                                      defaultValue={firstDay.toISOString().substr(0, 10)}/>
                                    </Col>
                                </Form.Group>
                            </Row>
                            <Row style={{width:'100%', margin:'0px'}}>
                                <Form.Group style={{width:'100%'}}>
                                    <Form.Label className="form-label-first" column sm={2}>
                                        To
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="date" onChange={endDateHandler}
                                                      defaultValue={date.toISOString().substr(0, 10)}/>
                                    </Col>
                                </Form.Group>
                            </Row>
                            <Row style={{width:'100%', margin:'0px'}}>
                                <Form.Group style={{width:'100%'}}>
                                    <Col sm={10}>
                                        <Button variant="primary" onClick={submitHandler} style={{width:'100%'}}>
                                            Calculate
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PositionCalculation;