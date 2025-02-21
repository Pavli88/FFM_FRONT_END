import './PortfolioTransactionsFilter.css'
import {useContext, useEffect, useRef, useState} from "react";
import PortfolioPageContext from "../../../context/portfolio-page-context";
import TransactionContext from "../context/transaction-context";
import DateContext from "../../../../../context/date-context";
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
    const [openStatus, setOpenStatus] = useState(false)

    const submitHandler = () => {
        props.updateParams({
            portfolio_code: portfolioCode,
            trade_date__gte: startDateRef.current.value,
            trade_date__lte: endDateRef.current.value,
            transaction_type: transactionType.map(data => data['value']),
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
        <div style={{padding: '15px', width: '100%'}}>
            <div className={'card'}>
                <div className={'search-container'}>

                    <div className={'search-container-label-box'}>
                        <label>
                            Show Only Active Transactions
                        </label>
                        <div>
                            <input type={'checkbox'} onClick={() => setOpenStatus(!openStatus)}/>
                        </div>
                    </div>


                    <div className={'search-container-label-box'}>
                        <label>
                            Inventory ID
                        </label>
                        <div>
                            <input ref={invRef} type="number" style={{width: 100}}/>
                        </div>
                    </div>


                    <div className={'search-container-label-box'}>
                        <label>
                            Security ID
                        </label>
                        <div>
                            <input ref={securityRef} type="number" style={{width: 100}}/>
                        </div>
                    </div>


                    <div className={'search-container-label-box'}>
                        <label>
                            Transaction Type
                        </label>
                        <div>
                            <Select
                                isMulti
                                options={[
                                    {value: 'Purchase', label: 'Purchase'},
                                    {value: 'Sale', label: 'Sale'},
                                    {value: 'Subscription', label: 'Subscription'},
                                    {value: 'Redemption', label: 'Redemption'},
                                    {value: 'Commission', label: 'Commission'},
                                    {value: 'Financing', label: 'Financing'}
                                ]}
                                onChange={(e) => setTransactionType(e)}

                            />
                        </div>
                    </div>


                    <div className={'search-container-label-box'}>
                        <label>
                            From
                        </label>
                        <div>
                            <input ref={startDateRef} defaultValue={currentDate} type="date" style={{width: 200}}/>
                        </div>
                    </div>

                    <div className={'search-container-label-box'}>
                        <label>
                            To
                        </label>
                        <div>
                            <input ref={endDateRef} defaultValue={currentDate} type="date" style={{width: 200}}/>
                        </div>
                    </div>

                    <div className={'search-container-label-box'}>
                        <button onClick={submitHandler} className={'normal-button'}>Search
                        </button>
                    </div>

                </div>
            </div>
        </div>

    )
};
export default PortfolioTransactionsFilter;