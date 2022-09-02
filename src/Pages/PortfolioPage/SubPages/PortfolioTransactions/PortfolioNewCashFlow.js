import Form from "react-bootstrap/Form";
import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DateContext from "../../../../context/date-context";

const PortfolioNewCashFlowEntry = (props) => {
    const currentDate = useContext(DateContext)['currentDate'];
    const [value, setValue] = useState(0.0);
    const [cashSecurities, setCashSecurities] = useState([{}]);
    const dateRef = useRef();
    const typeRef = useRef();
    const securityRef = useRef();

    const handleClose = () => {
        props.hide();
    };
    let cashOptions = <option></option>

    if (cashSecurities.length > 0){
        cashOptions = cashSecurities.map((data)=><option key={data['id']} value={data['id']}>{data['instrument_name']}</option>)
    };

    useEffect(() => {
        axios.get(props.server + 'instruments/get_instruments/', {
            params: {
                instrument_type: 'Cash',
            }
        })
            .then(response => setCashSecurities(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    }, [])

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'portfolios/new_transaction/', {
            portfolio_code: props.portfolio,
            quantity: value,
            price: 1,
            security: securityRef.current.value,
            transaction_type: typeRef.current.value,
            date: dateRef.current.value,
        })
                .then(response => alert(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
    };
    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Cash Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler} style={{width: '100%'}}>
                    <Form.Group>
                        <Form.Label>Portfolio</Form.Label>
                        <Form.Control type="text" placeholder={props.portfolio} value={props.portfolio} readOnly/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cash Flow</Form.Label>
                        <Form.Control onChange={(e)=>setValue(e.target.value)} type="number" placeholder="Value"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Trade Date</Form.Label>
                        <Form.Control ref={dateRef} defaultValue={currentDate} type="date" required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cash</Form.Label>
                        <Form.Control ref={securityRef} as="select">
                            {cashOptions}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Type</Form.Label>
                        <Form.Control ref={typeRef} as="select">
                                <option value={'cash deposit'}>Cash Deposit</option>
                                <option value={'cash withdrawal'}>Cash Withdrawal</option>
                                <option value={'income'}>Income</option>
                                <option value={'dividend'}>Dividend</option>
                                <option value={'fee'}>Fee</option>
                                <option value={'trading cost'}>Trading Cost</option>
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

export default PortfolioNewCashFlowEntry;