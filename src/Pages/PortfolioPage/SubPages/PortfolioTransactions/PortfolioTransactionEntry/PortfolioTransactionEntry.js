import Form from "react-bootstrap/Form";
import axios from "axios";
import {useContext, useRef, useState} from "react";
import DateContext from "../../../../../context/date-context";
import PortfolioPageContext from "../../../context/portfolio-page-context";

const PortfolioTransactionEntry = (props) => {
    const portfolioCode = useContext(PortfolioPageContext).portfolioCode;
    const portfolioData = useContext(PortfolioPageContext).portfolioData;
    const currentDate = useContext(DateContext).currentDate;
    const [relatedSelected, setRelatedSelected] = useState(false);
    const [cashTranSelected, setCashTranSelected] = useState(false);
    const [transactionType, setTransactionType] = useState('Purchase');
    const [relatedID, setRelatedID] = useState('');
    const [instrumentData, setInstrumentData] = useState({});
    const dateRef = useRef();
    const quantityRef = useRef();
    const priceRef = useRef();

    const submitHandler = () => {
        if (portfolioData.currency !== instrumentData.currency){
            alert('Portfolio currency is ' + portfolioData.currency + ' and the instrument currency is ' + instrumentData.currency + '. Instrument currency must match with portoflio currency!')
        }else{
            axios.post(props.server + 'portfolios/new/transaction/', {
                portfolio_code: portfolioCode,
                security: relatedSelected === false ? instrumentData.id : instrumentData.security,
                sec_group: cashTranSelected ? 'Cash' : relatedSelected === false ? instrumentData.group : instrumentData.sec_group,
                transaction_type: relatedSelected === false || cashTranSelected ? transactionType : instrumentData.transaction_type === 'Purchase' ? 'Sale' : instrumentData.sec_group === 'CFD' && instrumentData.transaction_type === 'Sale' ? 'Sale' : 'Purchase',
                trade_date: dateRef.current.value,
                quantity: quantityRef.current.value,
                price: priceRef.current.value,
                currency: instrumentData.currency,
                status: '',
                is_active: 0,
                transaction_link_code: relatedSelected ? relatedID : 0,
        })
                .then(response => alert(response.data.response))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        setRelatedID('')
        }
    };

    const getSecurity = () => {
        const url = relatedSelected ? 'portfolios/get/transactions/': 'instruments/get/instrument/'
        axios.get(props.server + url, {
            params: {
                id: relatedID,
            }
        })
            .then(response => setInstrumentData(response.data[0]))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    return (
        <div>
            <div style={{height: '500px', overflowY: 'scroll', padding: 5}}>

                <div style={{paddingLeft: 10, display: "flex"}}>
                    <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Related Transaction</Form.Label>
                    <div style={{padding: 10}}>
                        <input type="checkbox" onChange={(e) => {
                            setRelatedSelected(e.target.checked)
                            setRelatedID('')
                            setInstrumentData({})
                        }} />
                    </div>
                </div>

                {relatedSelected ? <div style={{paddingLeft: 10, display: "flex"}}>
                    <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Cash Transaction</Form.Label>
                    <div style={{padding: 10}}>
                        <input type="checkbox" onChange={(e) => {
                            setCashTranSelected(e.target.checked)
                            setTransactionType('Dividend')
                        }}/>
                    </div>
                </div>: ''
                }

                <div className={'entry-block'}>
                    <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>{relatedSelected ? 'Transaction': 'Security'} ID</Form.Label>
                    <div style={{display: "flex"}}>
                        <div style={{width: '100%', paddingRight: 15}}>
                            <Form.Control value={relatedID} onChange={(e) => setRelatedID(e.target.value)}
                                          type="number"/>
                        </div>
                        <div style={{width: '60px'}}>
                            <button className={'save-button'}
                                    style={{paddingTop: 7, paddingBottom: 7, paddingLeft: 7, paddingRight: 7}}
                                    onClick={getSecurity}
                            >Get
                            </button>
                        </div>
                    </div>
                </div>

                {relatedSelected && cashTranSelected === false ? <div style={{margin: 10}}>
                        <Form.Label style={{paddingBottom: 5}}>Transaction Type</Form.Label>
                        <Form.Control value={instrumentData.transaction_type === 'Purchase' ? 'Sale' : instrumentData.sec_group === 'CFD' & instrumentData.transaction_type === 'Sale' ? 'Sale': 'Purchase'} type="text"
                                      disabled/>
                    </div> : relatedSelected && cashTranSelected ? <div className={'entry-block'}>
                        <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Transaction Type</Form.Label>
                        <Form.Control onChange={(e) => setTransactionType(e.target.value)} as="select">
                            <option value={'Dividend'}>Dividend</option>
                            <option value={'Interest Received'}>Interest Received</option>
                        </Form.Control>
                    </div>:
                    <div className={'entry-block'}>
                        <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Transaction Type</Form.Label>
                        <Form.Control onChange={(e) => setTransactionType(e.target.value)} as="select">
                            <option value={'Purchase'}>Purchase</option>
                            <option value={'Sale'}>Sale</option>
                        </Form.Control>
                    </div>
                }

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Sec Name</Form.Label>
                    <Form.Control value={relatedSelected ? instrumentData.security: instrumentData.name} type="text" disabled/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Sec Group</Form.Label>
                    <Form.Control value={relatedSelected ? instrumentData.sec_group: instrumentData.group} type="text" disabled/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Currency</Form.Label>
                    <Form.Control value={instrumentData.currency} type="text" disabled/>
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