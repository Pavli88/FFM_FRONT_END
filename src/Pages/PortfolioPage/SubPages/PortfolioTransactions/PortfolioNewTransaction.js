import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useContext, useEffect, useRef, useState} from "react";
import DateContext from "../../../../context/date-context";

const PortfolioNewTransaction = (props) => {
    const currentDate = useContext(DateContext)['currentDate'];
    const [responseData, setResponseData] = useState([]);
    const [marketValue, setMarketValue] = useState(0.0);
    const [instrumentType, setInstrumentType] = useState('Commodity');
    const quantityRef = useRef();
    const dateRef = useRef();
    const transactionTypeRef = useRef('purchase');
    const priceRef = useRef();
    const securityRef = useRef();
    const instrumentTypeRef = useRef();
    const sourceRef = useRef();

    let instrumentOptions = <option></option>
    if (responseData.length > 0){
        instrumentOptions = responseData.map((data)=><option key={data['id']} value={data['id']}>{data['instrument_name']}</option>)
    };
    const handleClose = () => {
        props.hide();
    };
    const calculateMarketValue = () => {
        setMarketValue(quantityRef.current.value * priceRef.current.value);
    };
    const fetchInstrumentData = (source, instrumentType) => {
        axios.get(props.server + 'instruments/get_instruments/', {
            params: {
                source: source,
                instrument_type: instrumentType,
            }
        })
            .then(response => setResponseData(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    const instrumentHandler = () => {
        fetchInstrumentData(sourceRef.current.value, instrumentTypeRef.current.value);
    };
    console.log(responseData)
    console.log(instrumentType)

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'portfolios/new_transaction/', {
            portfolio_code: props.portfolio,
            quantity: quantityRef.current.value,
            price: priceRef.current.value,
            security: securityRef.current.value,
            transaction_type: transactionTypeRef.current.value,
            date: dateRef.current.value,
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
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler} style={{width: '100%'}}>
                    <Form.Group>
                        <Form.Label>Portfolio Code</Form.Label>
                        <Form.Control value={props.portfolio} type="text" disabled/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control ref={quantityRef} onChange={calculateMarketValue} type="number" min={0.0} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control ref={priceRef} onChange={calculateMarketValue} type="number" min={0.0} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Market Value</Form.Label>
                        <Form.Control value={marketValue} type="text" disabled/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Trade Date</Form.Label>
                        <Form.Control ref={dateRef} defaultValue={currentDate} type="date" required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Source</Form.Label>
                        <Form.Control ref={sourceRef} as={'select'}>
                            <option value={'ffm_system'}>System</option>
                            <option value={'oanda'}>Oanda</option>
                            <option value={'MAP'}>Magyar Államkincstár</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Instrument Type</Form.Label>
                        <Form.Control ref={instrumentTypeRef} onChange={instrumentHandler} as={'select'}>
                            <option value={'Commodity'}>Commodity</option>
                            <option value={'Currency'}>Currency</option>
                            <option value={'CFD'}>CFD</option>
                            <option value={'Equity'}>Equity</option>
                            <option value={'Fixed Income'}>Fixed Income</option>
                            <option value={'Futures'}>Futures</option>
                            <option value={'Mutual Fund'}>Mutual Fund</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Instrument</Form.Label>
                        <Form.Control ref={securityRef}  as="select">
                            {instrumentOptions}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Transaction Type</Form.Label>
                        <Form.Control ref={transactionTypeRef} as="select">
                            <option value={'purchase'}>Purchase</option>
                            <option value={'sale'}>Sale</option>
                            <option value={'dividend'}>Dividend</option>
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
    );
};
export default PortfolioNewTransaction;