import {useState} from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";

const CashHoldingCalculation = (props) => {
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

        axios.post(props.server + 'portfolios/cash_holding/', {
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
                    <Modal.Title>Cash Holding Calculation</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width: '100%', height: '300px'}}>
                    <Form onSubmit={submitHandler} style={{width: '100%'}}>
                        <Row style={{height: '60px', width: '100%', padding: '5px', margin: '5px'}}>
                            <Col style={{height: '100%'}}>
                                <Form.Group as={Row}>
                                    <Form.Label className="form-label-first" column sm={2}>
                                        From
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="date" onChange={startDateHandler}
                                                      defaultValue={firstDay.toISOString().substr(0, 10)}/>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col style={{height: '100%'}}>
                                <Form.Group as={Row}>
                                    <Form.Label className="form-label-first" column sm={2}>
                                        To
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="date" onChange={endDateHandler}
                                                      defaultValue={date.toISOString().substr(0, 10)}/>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group as={Row}>
                                    <Button variant="primary" onClick={submitHandler}>
                                        Calculate
                                    </Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CashHoldingCalculation;