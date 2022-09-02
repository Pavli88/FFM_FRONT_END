import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const InstrumentNew = (props) => {
    const [showNewInstrumentModal, setShowNewInstrumentModal] = useState(false);
    const [name, setName] = useState();
    const [broker, setBroker] = useState("ffm_system");
    const [sourceCode, setSourceCode] = useState();
    const [currency, setCurrency] = useState("USD");
    const [type, setType] = useState("Cash");

    const handleClose = () => {
        setShowNewInstrumentModal(false);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'instruments/new/', {
            inst_name: name,
            currency: currency,
            instrument_type: type,
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
                        <Form.Group className="form-group">
                            <Form.Label style={{textAlign: 'left'}}>Type</Form.Label>
                            <Form.Control onChange={(e)=>setType(e.target.value)} as={'select'}>
                                <option value={'Cash'}>Cash</option>
                                <option value={'Commodity'}>Commodity</option>
                                <option value={'CFD'}>CFD</option>
                                <option value={'Equity'}>Equity</option>
                                <option value={'Fixed Income'}>Fixed Income</option>
                                <option value={'Futures'}>Futures</option>
                                <option value={'Mutual Fund'}>Mutual Fund</option>
                                <option value={'Robot'}>Robot</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Currency</Form.Label>
                            <Form.Control onChange={(e)=>setCurrency(e.target.value)} type="text" required as={"select"}>
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