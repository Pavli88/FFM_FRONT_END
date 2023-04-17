import Card from "react-bootstrap/Card";
import {Nav} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {useContext, useRef} from "react";
import DateContext from "../../../../../context/date-context";
import PortfolioPageContext from "../../../context/portfolio-page-context";
const PortfolioCashEntry = (props) => {
    const portfolioData = useContext(PortfolioPageContext).portfolioData;
    const currentDate = useContext(DateContext).currentDate;
    const typeRef = useRef();
    const currencyRef = useRef();
    const quantityRef = useRef();
    const submitHandler = () => {
        axios.post(props.server + 'portfolios/new/transaction/', {
            portfolio_code: portfolioData[0].portfolio_code,
            security: 'Cash',
            transaction_type: typeRef.current.value,
            // trade_date: dateRef.current.value,
            quantity: quantityRef.current.value,
            price: 1,
            currency: currencyRef.current.value,
            // sub_type: transactionSubType,
        })
                .then(response => console.log(response.data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
    };
    return(
        <div style={{padding: 5}}>
            <div style={{margin: 10}}>
                <Form.Label>Transaction Type</Form.Label>
                <Form.Control ref={typeRef} as="select">
                    <option value={'Subscription'}>Subscription</option>
                    <option value={'Redemption'}>Redemption</option>
                    <option value={'Dividend'}>Dividend</option>
                    <option value={'Interest Received'}>Interest Received</option>
                    <option value={'Interest Paid'}>Interest Paid</option>
                    <option value={'Commission'}>Commission</option>
                </Form.Control>
            </div>

            <div style={{margin: 10}}>
                <Form.Label>Currency</Form.Label>
                <Form.Control ref={currencyRef} as="select">
                    <option value={'USD'}>USD</option>
                    <option value={'EUR'}>EUR</option>
                    <option value={'HUF'}>HUF</option>
                </Form.Control>
            </div>

            <div style={{margin: 10}}>
                <Form.Label>Date</Form.Label>
                <Form.Control defaultValue={currentDate} type="date"/>
            </div>

            <div style={{margin: 10}}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control ref={quantityRef} type="number" required min={0.0}/>
            </div>
            <div style={{height: '60px', width: '100%', padding: 10, position: "absolute", bottom: 0}}>
                <button onClick={submitHandler} className={'save-button'} type={'submit'}>Save</button>
            </div>
        </div>
    )
};
export default PortfolioCashEntry;