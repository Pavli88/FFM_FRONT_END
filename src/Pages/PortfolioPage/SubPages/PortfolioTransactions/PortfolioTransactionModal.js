import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useState} from "react";

const PortfolioTransactionModal = (props) => {
    const [quantity, setQuantity] = useState(props.data['quantity']);
    const [price, setPrice] = useState(props.data['price']);
    const [tradeDate, setTradeDate] = useState(props.data['trade date']);
    const [instrument, setInstrument] = useState(props.data['instrument']);
    const [transactionType, setTransactionType] = useState(props.data['type']);
    console.log(quantity)
    let modalTitle = '';
    if (props.data['id']===''){
        modalTitle='New Transaction'
    }else{
        modalTitle= 'Edit Transaction (' + props.data['id'] + ')'
    }
    const handleClose = () => {
        props.hide();
    };
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'portfolios/new_transaction/', {
            port_name: '',
            port_type: '',
            currency: '',
            port_code: '',
            inception_date: '',
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
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler} style={{width: '100%'}}>
                        <Form.Group>
                            <Form.Label>Portfolio Code</Form.Label>
                            <Form.Control type="text" placeholder={props.data['portfolio']} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control onChange={(e)=>setQuantity(e.target.value)} type="text" placeholder={quantity} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control onChange={(e)=>setPrice(e.target.value)} placeholder={price} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Trade Date</Form.Label>
                            <Form.Control onChange={(e)=>setTradeDate(e.target.value)} type="date" value={tradeDate} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Instrument</Form.Label>
                            <Form.Control onChange={(e)=>setInstrument(e.target.value)} type="text" placeholder={instrument} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Instrument Type</Form.Label>
                            <Form.Control type="text" placeholder={props.data['instrument type']} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Source</Form.Label>
                            <Form.Control type="text" placeholder={props.data['source']} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Transaction Type</Form.Label>
                            <Form.Control onChange={(e)=>setTransactionType(e.target.value)} as="select">
                                <option value={'purchase'}>Purchase</option>
                                <option value={'sale'}>Sale</option>
                                <option value={'cash contribution'}>Cash Contribution</option>
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
export default PortfolioTransactionModal;