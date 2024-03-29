import './PortfolioTransactionsFilter.css'
import Form from "react-bootstrap/Form";
import {useContext, useEffect, useRef, useState} from "react";
import PortfolioPageContext from "../../../context/portfolio-page-context";
import TransactionContext from "../context/transaction-context";
import DateContext from "../../../../../context/date-context";
import Card from "react-bootstrap/Card";
import PortfolioTransactionEntry from "../PortfolioTransactionEntry/PortfolioTransactionEntry";


const PortfolioTransactionsFilter = (props) => {
    const newTransaction = useContext(TransactionContext).newTransaction;
    const currentDate = useContext(DateContext).currentDate;
    const portfolioCode = useContext(PortfolioPageContext).portfolioCode;
    const securityRef = useRef();
    const startDateRef = useRef();
    const endDateRef = useRef();
    const [transactionType, setTransactionType] = useState('');
    const [transactionSubType, setTransactionSubType] = useState('Buy Open');
    const [openStatus, setOpenStatus] = useState(false)

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
                is_active: openStatus ? 1 : '',
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
        <Card>
            <div className={'search-container'}>

                <div>
                    <span className={'input-label'}>
                        Open Transactions
                    </span>
                </div>

                <div style={{width:30}}>
                    <input type={'checkbox'} style={{position: "absolute",top: 18, width: 30, paddingTop: 15, paddingBottom: 5}} onClick={() => setOpenStatus(!openStatus)}/>
                </div>

                <div>
                    <span className={'input-label'}>
                        Security ID
                    </span>
                </div>
                <div>
                    <input ref={securityRef} type="text" style={{width: 100}}/>
                </div>

                <div>
                    <span className={'input-label'}>
                        Transaction Type
                    </span>
                </div>

                <div>
                    <Form.Control onChange={(e) => setTransactionType(e.target.value)} as="select"
                                  style={{width: 200}}>
                        <option value={''}></option>
                        <option value={'Purchase'}>Purchase</option>
                        <option value={'Sale'}>Sale</option>
                        <option value={'Subscription'}>Subscription</option>
                        <option value={'Redemption'}>Redemption</option>
                    </Form.Control>
                </div>

                <div>
                    <span className={'input-label'}>
                        From
                    </span>
                </div>


                <input ref={startDateRef} defaultValue={''} type="date" style={{width: 200}}/>


                <div>
                    <span className={'input-label'}>
                        To
                    </span>
                </div>
                <input ref={endDateRef} defaultValue={''} type="date" style={{width: 200}}/>

                <div style={{paddingLeft: 10}}>
                    <button onClick={submitHandler} className={'normal-button'} style={{fontSize: 12}}>Search</button>
                </div>

            </div>
        </Card>
    )
};
export default PortfolioTransactionsFilter;