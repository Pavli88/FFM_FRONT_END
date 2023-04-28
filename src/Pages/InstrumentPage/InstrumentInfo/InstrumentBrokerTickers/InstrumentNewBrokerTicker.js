import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useContext, useRef} from "react";
import axios from "axios";
import BrokerContext from "../../../../context/broker-context";


const InstrumentNewBrokerTicker = (props) => {
    const brokerRef = useRef();
    const tickerRef = useRef();
    const marginRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'instruments/new/ticker/', {
            inst_code: props.id,
            source: brokerRef.current.value,
            source_ticker: tickerRef.current.value,
            margin: marginRef.current.value,
        })
            .then(response => alert(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        props.hide();
    };

    const brokers = useContext(BrokerContext).brokerData.map((data) =>
        <option key={data.id} value={data.broker_code}>{data.broker}</option>
    )

    return(
        <Modal show={props.show} onHide={() => props.hide()} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>New Broker Ticker - {props.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler} style={{width: '100%'}}>

                    <Form.Group>
                        <Form.Label>Broker</Form.Label>
                        <Form.Control ref={brokerRef} as="select">
                            {brokers}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Ticker</Form.Label>
                        <Form.Control ref={tickerRef}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Margin %</Form.Label>
                        <Form.Control ref={marginRef} min={0.0} step={0.05} type={'number'}></Form.Control>
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