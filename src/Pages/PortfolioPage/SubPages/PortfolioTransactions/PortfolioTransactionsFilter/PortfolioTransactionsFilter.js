import './PortfolioTransactionsFilter.css'
import Form from "react-bootstrap/Form";
import {useContext, useEffect, useRef, useState} from "react";
import PortfolioPageContext from "../../../context/portfolio-page-context";
import TransactionContext from "../context/transaction-context";
import DateContext from "../../../../../context/date-context";
import Card from "react-bootstrap/Card";
import PortfolioTransactionEntry from "../PortfolioTransactionEntry/PortfolioTransactionEntry";
import Select from "react-select";


const PortfolioTransactionsFilter = (props) => {
    const newTransaction = useContext(TransactionContext).newTransaction;
    const currentDate = useContext(DateContext).currentDate;
    const portfolioCode = useContext(PortfolioPageContext).portfolioCode;
    const securityRef = useRef();
    const startDateRef = useRef();
    const endDateRef = useRef();
    const invRef = useRef();
    const [transactionType, setTransactionType] = useState([]);
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
        props.updateParams({
            portfolio_code: portfolioCode,
            trade_date__gte: startDateRef.current.value,
            trade_date__lte: endDateRef.current.value,
            ...(openStatus && {is_active: openStatus}),
            ...(invRef.current?.value && { transaction_link_code: invRef.current.value }),
            ...(securityRef.current?.value && { security_id: securityRef.current.value })
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
        <div className={'card'} style={{padding: 10}}>
            <div style={{display: "flex"}}>

                <div>
                    <span className={'input-label'}>
                        Show Only Active Transactions
                    </span>
                </div>

                <div style={{width: 30}}>
                    <input type={'checkbox'}
                           style={{position: "absolute", top: 18, width: 30, paddingTop: 15, paddingBottom: 5}}
                           onClick={() => setOpenStatus(!openStatus)}/>
                </div>

                <div>
                    <span className={'input-label'}>
                        Inv ID
                    </span>
                </div>
                <div>
                    <input ref={invRef} type="number" style={{width: 100}}/>
                </div>

                <div>
                    <span className={'input-label'}>
                        Security ID
                    </span>
                </div>
                <div>
                    <input ref={securityRef} type="number" style={{width: 100}}/>
                </div>

                <div>
                    <span className={'input-label'}>
                        Transaction Type
                    </span>
                </div>

                <div>
                    <Select
                        isMulti
                        options={[
                            {value: 'Purchase', label: 'Purchase'},
                            {value: 'Sale', label: 'Sale'},
                            {value: 'Subscription', label: 'Subscription'},
                            {value: 'Redemption', label: 'Redemption'}
                        ]}
                        onChange={(e) => setTransactionType(e)}
                        className={'instrument-search-input-field'}
                    />
                </div>

                <div>
                    <span className={'input-label'}>
                        From
                    </span>
                </div>


                <input ref={startDateRef} defaultValue={currentDate} type="date" style={{width: 200}}/>


                <div>
                    <span className={'input-label'}>
                        To
                    </span>
                </div>
                <input ref={endDateRef} defaultValue={currentDate} type="date" style={{width: 200}}/>

                <div style={{paddingLeft: 10}}>
                    <button onClick={submitHandler} className={'normal-button'} style={{fontSize: 12}}>Search</button>
                </div>

            </div>
        </div>
    )
};
export default PortfolioTransactionsFilter;