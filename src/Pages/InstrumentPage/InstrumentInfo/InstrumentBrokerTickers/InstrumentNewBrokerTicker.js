import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useRef} from "react";
import axios from "axios";


const InstrumentNewBrokerTicker = (props) => {
    const brokerRef = useRef();
    const tickerRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'instruments/new/ticker/', {
            inst_code: props.id,
            source: brokerRef.current.value,
            source_ticker: tickerRef.current.value,
        })
            .then(response => alert(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        props.hide();
    };
    return(
        <Modal show={props.show} onHide={() => props.hide()} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>New Broker Ticker</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler} style={{width: '100%'}}>

                    <Form.Group>
                        <Form.Label>Broker</Form.Label>
                        <Form.Control ref={brokerRef} as="select">
                            <option value={'oanda'}>Oanda</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Strategy</Form.Label>
                        <Form.Control ref={tickerRef}></Form.Control>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.hide()}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitHandler}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
};
export default InstrumentNewBrokerTicker;