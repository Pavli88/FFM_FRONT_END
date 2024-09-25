import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {useContext, useEffect, useRef, useState} from "react";
import DateContext from "../../../../../context/date-context";
import PortfolioPageContext from "../../../context/portfolio-page-context";
import Select from "react-select";

const PortfolioCashEntry = (props) => {
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const portfolioData = useContext(PortfolioPageContext).portfolioData;
    const currentDate = useContext(DateContext).currentDate;
    const [currencies, setCurrencies] = useState([{}]);
    const [selectedCurrency, setSelectedCurrency] = useState({});
    const [type, setType] = useState()
    const dateRef = useRef();
    const quantityRef = useRef();

    const submitHandler = () => {
        axios.post(props.server + 'portfolios/new/transaction/', {
            portfolio_code: portfoliCode,
            security_id: selectedCurrency.id,
            transaction_type: type,
            trade_date: dateRef.current.value,
            quantity: quantityRef.current.value,
            currency: selectedCurrency.currency
        })
            .then(response => alert(response.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        props.close()
    };

    useEffect(() => {
        axios.post(props.server + 'instruments/get/instruments/', {
                // name: '',
                currency: portfolioData.currency,
                type: 'Cash'
            }).then(response => setCurrencies(response.data))
    }, [])
    console.log(currencies)
    const transactionType = [
        { value: 'Subscription', label: 'Subscription' },
        { value: 'Redemption', label: 'Redemption' },
        { value: 'Interest Paid', label: 'Interest Paid' },
        { value: 'Commission', label: 'Commission' },
    ]

    return (
        <Modal show={props.show} onHide={() => props.close()}>
            <Modal.Header closeButton>
                <Modal.Title>New Cashflow</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div style={{margin: 10}}>
                    <Form.Label>Transaction Type</Form.Label>
                    <Select style={{height: '100%'}}
                            options={transactionType}
                            onChange={(e) => setType(e.value)}
                    >
                    </Select>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label>Currency</Form.Label>
                    <Select style={{height: '100%'}}
                            options={currencies.map(function (data) {
                                return {value: data.id, label: data.currency}
                            })}
                            onChange={(e) => setSelectedCurrency({id: e.value, currency: e.label})}
                    >
                    </Select>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label>Date</Form.Label>
                    <Form.Control ref={dateRef} defaultValue={currentDate} type="date" min={portfolioData.inception_date}/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control ref={quantityRef} type="number" required min={0.0}/>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <button onClick={submitHandler} className={'normal-button'} type={'submit'}>Save</button>
            </Modal.Footer>
        </Modal>
    )
};
export default PortfolioCashEntry;