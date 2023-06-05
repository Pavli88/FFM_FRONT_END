import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {useContext, useRef, useState} from "react";

//Context
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import DateContext from "../../../context/date-context";
import BrokerContext from "../../../context/broker-context";

const NewInstrumentPriceModal = (props) => {
    const selectedInstrumentData = useContext(InstrumentSearchContext)['selectedInstrument'];
    const brokerData = useContext(BrokerContext)['brokerData']
    const currentDate = useContext(DateContext)['currentDate'];
    const [showModal, setShowModal] = useState(false);
    const priceRef = useRef();
    const dateRef = useRef();
    const [source, setSource] = useState('ffm_system');
    const brokers = brokerData.map((data) => <option value={data['broker_code']} key={data['id']}>{data['broker']}</option>)
    const handleClose = () => {
        setShowModal(false);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(source)
        axios.post(props.server + 'instruments/new/price/', {
            inst_code: selectedInstrumentData[0]['id'],
            price: priceRef.current.value,
            date: dateRef.current.value,
            source: source,
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
    return(
        <div>
            <Button className={"operation-button"} onClick={()=>setShowModal(true)}>New</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Price</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler} style={{width: '100%'}}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeHolder={selectedInstrumentData[0]['instrument_name']} disabled/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Internal Code</Form.Label>
                            <Form.Control type="text" placeHolder={selectedInstrumentData[0]['id']} disabled/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control ref={priceRef} type="number"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Dater</Form.Label>
                            <Form.Control ref={dateRef} type="date" defaultValue={currentDate} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Source</Form.Label>
                            <Form.Control onChange={(e)=>setSource(e.target.value)} type="text" required as={"select"}>
                                {brokers}
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
export default NewInstrumentPriceModal;