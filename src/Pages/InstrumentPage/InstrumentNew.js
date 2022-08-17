import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useState} from "react";

const InstrumentNew = (props) => {
    const [showNewInstrumentModal, setShowNewInstrumentModal] = useState(false);
    const [name, setName] = useState();
    const [internalCode, setInternalCode] = useState();
    const [broker, setBroker] = useState();
    const [sourceCode, setSourceCode] = useState();
    const [currency, setCurrency] = useState();

    const handleClose = () => {
        setShowNewInstrumentModal(false);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'instruments/new/', {
            inst_name: name,
            internal_code: internalCode,
            broker: broker,
            source_code: sourceCode,
            currency: currency,
        })
            .then(function (response) {
                if (response['data'] == 'New Portfolio is created!') {
                    alert('New portfolio is created!')
                    props.hide();
                } else {
                    alert(response['data']);
                }
            })
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    return (
        <div>
            <Button variant="primary" onClick={()=>setShowNewInstrumentModal(true)}>
                New Security
            </Button>
            <Modal show={showNewInstrumentModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Instrument</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler} style={{width: '100%'}}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={(e)=>setName(e.target.value)} type="text" required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Internal Code</Form.Label>
                            <Form.Control onChange={(e)=>setInternalCode(e.target.value)} type="text" required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Broker</Form.Label>
                            <Form.Control onChange={(e)=>setBroker(e.target.value)} type="text" required as={"select"}>
                                <option hidden>Please select a broker</option>
                                <option value={"ffm_system"}>FFM System</option>
                                <option value={"oanda"}>Oanda</option>
                                <option value={"MAP"}>Magyar Államkincstár</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Broker Ticker</Form.Label>
                            <Form.Control onChange={(e)=>setSourceCode(e.target.value)} type="text" required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Currency</Form.Label>
                            <Form.Control onChange={(e)=>setCurrency(e.target.value)} type="text" required as={"select"}>
                                <option hidden>Please select a currency</option>
                                <option value={"USD"}>USD</option>
                                <option value={"EUR"}>EUR</option>
                                <option value={"HUF"}>HUF</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitHandler}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default InstrumentNew;