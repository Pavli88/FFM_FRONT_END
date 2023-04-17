import Form from "react-bootstrap/Form";
import axios from "axios";
import {useContext, useRef, useState} from "react";
import DateContext from "../../../../../context/date-context";
import PortfolioPageContext from "../../../context/portfolio-page-context";

const PortfolioTransactionEntry = (props) => {
    const portfolioData = useContext(PortfolioPageContext).portfolioData;
    const currentDate = useContext(DateContext).currentDate;
    const [transactionType, setTransactionType] = useState('Purchase');
    const [transactionSubType, setTransactionSubType] = useState('Buy Open');
    const securityRef = useRef();
    const currencyRef = useRef();
    const dateRef = useRef();
    const quantityRef = useRef();
    const priceRef = useRef();
    const costRef = useRef();
    const typeRef = useRef();
    const subTypeRef = useRef();

    const submitHandler = () => {
        console.log(props.server)
        console.log(transactionType)
        console.log(quantityRef.current.value, priceRef.current.value)
        axios.post(props.server + 'portfolios/new/transaction/', {
            portfolio_code: portfolioData[0].portfolio_code,
            security: securityRef.current.value,
            transaction_type: transactionType,
            trade_date: dateRef.current.value,
            quantity: quantityRef.current.value,
            price: priceRef.current.value,
            currency: 'HUF',
            sub_type: transactionSubType,

        })
                .then(response => console.log(response.data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
    };

    const purchaseSubTypes = [
        <option value={'Buy Open'}>Buy Open</option>,
        <option value={'Sell Close'}>Sell Close</option>
    ]

    const saleSubTypes = [
        <option value={'Sell Open'}>Sell Open</option>,
        <option value={'Buy Close'}>Buy Close</option>
    ]

    return (
        <div>
            <div style={{height: '610px', overflowY: 'scroll', padding: 5}}>
                <div className={'entry-block'}>
                    <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Transaction Type</Form.Label>
                    <Form.Control onChange={(e) => setTransactionType(e.target.value)} as="select">
                        <option value={'Purchase'}>Purchase</option>
                        <option value={'Sale'}>Sale</option>
                    </Form.Control>
                </div>

                <div style={{margin: 10, paddingBottom: 5}}>
                    <Form.Label style={{paddingBottom: 5}}>Sub Type</Form.Label>
                    <Form.Control onChange={(e) => setTransactionSubType(e.target.value)} as="select">
                        {transactionType === 'Purchase' ? purchaseSubTypes : saleSubTypes}
                    </Form.Control>
                </div>

                {transactionSubType === 'Buy Close' ? <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Related Transaction ID</Form.Label>
                    <Form.Control ref={currencyRef} type="number"/>
                </div> : ''}

                <div className={'entry-block'}>
                    <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Security ID</Form.Label>
                    <div style={{display: "flex"}}>
                        <div style={{width: '100%', paddingRight: 15}}>
                            <Form.Control ref={securityRef} type="text"/>
                        </div>

                        <div style={{width: '60px'}}>
                            <button className={'save-button'}
                                    style={{paddingTop: 7, paddingBottom: 7, paddingLeft: 7, paddingRight: 7}}>Get
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Sec Name</Form.Label>
                    <Form.Control ref={currencyRef} type="text" disabled/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Sec Group</Form.Label>
                    <Form.Control ref={currencyRef} type="text" disabled/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Sec Type</Form.Label>
                    <Form.Control ref={currencyRef} type="text" disabled/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Currency</Form.Label>
                    <Form.Control ref={currencyRef} type="text" disabled/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Date</Form.Label>
                    <Form.Control ref={dateRef} defaultValue={currentDate} type="date"/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Quantity</Form.Label>
                    <Form.Control ref={quantityRef} type="number"/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Price</Form.Label>
                    <Form.Control ref={priceRef} type="number" min={0.0}/>
                </div>

            </div>
            <div style={{height: '60px', width: '100%', padding: 10, position: "absolute", bottom: 0}}>
                <button onClick={submitHandler} className={'save-button'}>Save</button>
            </div>
        </div>
    )
};
export default PortfolioTransactionEntry;