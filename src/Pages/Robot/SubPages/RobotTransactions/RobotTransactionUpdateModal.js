import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useContext, useState, useRef} from "react";
import RobotTransactionContext from "./RobotTransactionContext";

const RobotTransactionUpdateModal = (props) => {
    const saveModalStatus = useContext(RobotTransactionContext)['saveModalDataParameters'];
    const quantityRef = useRef();
    const statusRef = useRef();
    const pnlRef = useRef();
    const openPriceRef = useRef();
    const closePriceRef = useRef();
    const openTimeRef = useRef();
    const closeTimeRef = useRef();
    const handleClose = () => {
        saveModalStatus({'data': [], 'status': false});
    };
    const submitHandler = (event) => {
        event.preventDefault();
        const quantity = quantityRef.current.value
        const status = statusRef.current.value
        const pnl = pnlRef.current.value
        const openPrice = openPriceRef.current.value
        const closePrice = closePriceRef.current.value
        const openTime = openTimeRef.current.value
        const closeTime = closeTimeRef.current.value
        axios.post(props.server + 'trade_page/edit_transaction/', {
            status: status,
            quantity: quantity,
            pnl: pnl,
            open_price: openPrice,
            close_price: closePrice,
            open_time: openTime,
            close_time: closeTime,
            id: props.data[9],
        })
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    return (
        <Modal show={props.show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Transaction - Broker ID - {props.data[8]}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width: '100%', height: '700px'}}>
                <Form onSubmit={submitHandler} style={{width: '100%'}}>
                    <Form.Group className="mb-3" controlId="quantity_type">
                        <Form.Label>Status</Form.Label>
                        <Form.Control ref={statusRef} defaultValue={props.data[1]}
                                      as="select">
                            <option value={'OPEN'}>OPEN</option>
                            <option value={'CLOSED'}>CLOSED</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control ref={quantityRef} type="number" defaultValue={props.data[0]}
                                      step={1}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>P&L</Form.Label>
                        <Form.Control ref={pnlRef} type="number" defaultValue={props.data[2]}
                                      step={1}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Open Price</Form.Label>
                        <Form.Control ref={openPriceRef} type="number" defaultValue={props.data[3]}
                                      min={0.0}
                                      step={0.01}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Close Price</Form.Label>
                        <Form.Control ref={closePriceRef} type="number" defaultValue={props.data[4]}
                                      min={0.0}
                                      step={0.01}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Open Time</Form.Label>
                        <Form.Control ref={openTimeRef} type="date" defaultValue={props.data[5]}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Close Time</Form.Label>
                        <Form.Control ref={closeTimeRef} type="date" defaultValue={props.data[6]}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={submitHandler}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default RobotTransactionUpdateModal;