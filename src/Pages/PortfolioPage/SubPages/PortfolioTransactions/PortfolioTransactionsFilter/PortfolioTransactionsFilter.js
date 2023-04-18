import './PortfolioTransactionsFilter.css'
import Form from "react-bootstrap/Form";
import {useContext, useRef, useState} from "react";
import PortfolioPageContext from "../../../context/portfolio-page-context";

const PortfolioTransactionsFilter = (props) => {
    const portfolioData = useContext(PortfolioPageContext).portfolioData;
    const securityRef = useRef();
    const [transactionType, setTransactionType] = useState('');
    const [transactionSubType, setTransactionSubType] = useState('Buy Open');
    const purchaseSubTypes = [
        <option value={'Buy Open'}>Buy Open</option>,
        <option value={'Sell Close'}>Sell Close</option>
    ]
    const saleSubTypes = [
        <option value={'Sell Open'}>Sell Open</option>,
        <option value={'Buy Close'}>Buy Close</option>
    ]
    const submitHandler = () => {
        props.fetch({
            params: {
                portfolio_code: portfolioData[0].portfolio_code,
                transaction_type: transactionType,
                security: securityRef.current.value,
            }
        });
    };
    console.log(transactionType)
    return (
        <div>
            <div className={'search-container'}>

                <Form.Label style={{paddingBottom: 5}}>Security</Form.Label>
                <Form.Control ref={securityRef} type="text"/>

                <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Transaction Type</Form.Label>
                <Form.Control onChange={(e) => setTransactionType(e.target.value)} as="select">
                    <option value={''}></option>
                    <option value={'Purchase'}>Purchase</option>
                    <option value={'Sale'}>Sale</option>
                    <option value={'Subscription'}>Subscription</option>
                    <option value={'Redemption'}>Redemption</option>
                </Form.Control>

                <div style={{paddingBottom: 5}}>
                    <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Sub Type</Form.Label>
                    <Form.Control onChange={(e) => setTransactionSubType(e.target.value)} as="select">
                        {transactionType === 'Purchase' ? purchaseSubTypes : saleSubTypes}
                    </Form.Control>
                </div>

                {transactionSubType === 'Buy Close' ? <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Related Transaction ID</Form.Label>
                    <Form.Control type="number"/>
                </div> : ''}

            </div>
            <div style={{height: '60px', width: '100%', padding: 10, position: "absolute", bottom: 0}}>
                <button onClick={submitHandler} className={'save-button'}>Search</button>
            </div>
        </div>
    )
};
export default PortfolioTransactionsFilter;