import './PortfolioTransactionsFilter.css'
import Form from "react-bootstrap/Form";
import {useContext, useEffect, useRef, useState} from "react";
import PortfolioPageContext from "../../../context/portfolio-page-context";
import TransactionContext from "../context/transaction-context";
import DateContext from "../../../../../context/date-context";

const PortfolioTransactionsFilter = (props) => {
    const newTransaction = useContext(TransactionContext).newTransaction;
    const currentDate = useContext(DateContext).currentDate;
    const portfolioCode = useContext(PortfolioPageContext).portfolioCode;
    const securityRef = useRef();
    const startDateRef = useRef();
    const endDateRef = useRef();
    const [transactionType, setTransactionType] = useState('');
    const [transactionSubType, setTransactionSubType] = useState('Buy Open');
    // const firstUpdate = useRef(true);

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
                portfolio_code: portfolioCode,
                transaction_type: transactionType,
                security: securityRef.current.value,
                trade_date__gte: startDateRef.current.value,
                trade_date__lte: endDateRef.current.value,
            }
        });
    };

    // useEffect(() => {
    //     if (firstUpdate.current) {
    //         firstUpdate.current = false;
    //     }else{
    //         submitHandler()
    //     };
    // }, [newTransaction])

    return (
        <div>
            <div className={'search-container'}>

                {/*<Form.Label style={{paddingBottom: 5}}>Transaction ID</Form.Label>*/}
                {/*<Form.Control ref={securityRef} type="text"/>*/}

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

                <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>From</Form.Label>
                <Form.Control ref={startDateRef} defaultValue={''} type="date"/>

                <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>To</Form.Label>
                <Form.Control ref={endDateRef} defaultValue={''} type="date"/>

            </div>
            <div style={{height: '60px', width: '100%', padding: 10, position: "absolute", bottom: 0}}>
                <button onClick={submitHandler} className={'save-button'}>Search</button>
            </div>
        </div>
    )
};
export default PortfolioTransactionsFilter;