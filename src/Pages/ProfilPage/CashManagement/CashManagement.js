import './CashManagement.css'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useRef, useState, useContext} from "react";
import CashflowContext from "../context/cashflow-context";

const Cashflow = (props) => {
    const cashFlowNumber = useContext(CashflowContext).cashFlowNumber;
    const saveNewCashFlowNumber = useContext(CashflowContext).saveNewCashflow;
    const currencyRef = useRef();
    const amountRef = useRef();
    const cashflowRef = useRef();
    const handleClose = () => {
        props.close();
    };
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'portfolios/new/cashflow/', {
            portfolio_code: 'MAIN_' + props.user.toUpperCase(),
            amount: cashflowRef.current.value === 'Subscription' ? amountRef.current.value: amountRef.current.value * -1,
            type: cashflowRef.current.value,
            date: '',
            currency: currencyRef.current.value,
            user: props.user,
        }).then(function(response) {
            alert(response.data.msg)
            saveNewCashFlowNumber(cashFlowNumber + 1)
        })
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    return (
        <Modal show={props.show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Cashflow</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width: '100%', height: '300px'}}>
                <Form onSubmit={submitHandler} style={{width: '100%'}}>
                    <div>
                        <Form.Label>Cashflow</Form.Label>
                        <Form.Control ref={cashflowRef} as="select">
                            <option value={'Subscription'}>Subscription</option>
                            <option value={'Redemption'}>Redemption</option>
                        </Form.Control>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <Form.Label>Currency</Form.Label>
                        <Form.Control ref={currencyRef} as="select">
                            <option value={'USD'}>USD</option>
                            <option value={'EUR'}>EUR</option>
                            <option value={'HUF'}>HUF</option>
                        </Form.Control>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control ref={amountRef} type="number" step={1}/>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={submitHandler} style={{width: '100%'}}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
};



const CashManagement = (props) => {
    const { user, server} = props.parameters;
    const [subscriptionState, setSubscriptionState] = useState(false);
    return (
        <div style={{height:'100%', width: '300px'}}>
            <div style={{height: '100%', padding: '20px'}}>
                <div style={{padding: '10px'}}>
                    <button className={'button'} onClick={() => setSubscriptionState(true)}>New Cashflow</button>
                </div>
                <div style={{padding: '10px'}}>
                    <button className={'button'}>Invest</button>
                </div>
            </div>
            <Cashflow user={user} server={server} show={subscriptionState}
                          close={() => setSubscriptionState(false)}/>

        </div>
    )
};
export default CashManagement;