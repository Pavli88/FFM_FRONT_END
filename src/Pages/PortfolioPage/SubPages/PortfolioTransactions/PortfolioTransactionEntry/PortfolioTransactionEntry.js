import Form from "react-bootstrap/Form";
import axios from "axios";
import {useContext, useRef, useState} from "react";
import DateContext from "../../../../../context/date-context";
import PortfolioPageContext from "../../../context/portfolio-page-context";

const PortfolioTransactionEntry = (props) => {
    const portfolioData = useContext(PortfolioPageContext).portfolioData;
    const currentDate = useContext(DateContext).currentDate;
    const [relatedSelected, setRelatedSelected] = useState(false);
    const [transactionType, setTransactionType] = useState('Purchase');
    const [relatedID, setRelatedID] = useState('');
    const [instrumentData, setInstrumentData] = useState({});
    const securityRef = useRef();
    const openRef = useRef();
    const dateRef = useRef();
    const quantityRef = useRef();
    const priceRef = useRef();
    const costRef = useRef();
    const typeRef = useRef();
    const subTypeRef = useRef();
    console.log(relatedSelected)
    const submitHandler = () => {
        console.log(props.server)
        console.log(transactionType)
        console.log(quantityRef.current.value, priceRef.current.value)
        axios.post(props.server + 'portfolios/new/transaction/', {
            portfolio_code: portfolioData[0].portfolio_code,
            security: instrumentData.name,
            sec_group: instrumentData.group,
            transaction_type: transactionType,
            trade_date: dateRef.current.value,
            quantity: quantityRef.current.value,
            price: priceRef.current.value,
            currency: instrumentData.currency,
            transaction_link_code: relatedID,
            open_status: openRef.current.value,

        })
                .then(response => alert(response.data.response))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        setRelatedID('')
    };

    const getSecurity = () => {
        axios.get(props.server + 'instruments/get/instrument/', {
            params: {
                id: securityRef.current.value,
            }
        })
            .then(response => setInstrumentData(response.data[0]))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const relatedTransactionIDField = <div className={'entry-block'}>
        <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Related Transaction ID</Form.Label>
        <div style={{width: '100%', paddingRight: 15}}>
            <Form.Control value={relatedID} onChange={(e) => setRelatedID(e.target.value)} type="number"/>
        </div>
    </div>

    return (
        <div>
            <div style={{height: '610px', overflowY: 'scroll', padding: 5}}>

                <div style={{paddingLeft: 10, display: "flex"}}>
                    <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Related Transaction</Form.Label>
                    <div style={{padding: 10}}>
                        <input type="checkbox" onChange={(e) => {
                            setRelatedSelected(e.target.checked)
                            setRelatedID('')
                        }} />
                    </div>
                </div>

                {relatedSelected === true ? relatedTransactionIDField: ''}

                <div className={'entry-block'}>
                    <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Transaction Type</Form.Label>
                    <Form.Control onChange={(e) => setTransactionType(e.target.value)} as="select">
                        <option value={'Purchase'}>Purchase</option>
                        <option value={'Sale'}>Sale</option>
                    </Form.Control>
                </div>

                <div className={'entry-block'}>
                    <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Open/Closed</Form.Label>
                    <Form.Control ref={openRef} as="select">
                        <option value={'Open'}>Open</option>
                        <option value={'Closed'}>Closed</option>
                    </Form.Control>
                </div>

                <div className={'entry-block'}>
                    <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Security ID</Form.Label>
                    <div style={{display: "flex"}}>
                        <div style={{width: '100%', paddingRight: 15}}>
                            <Form.Control ref={securityRef} type="text"/>
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

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Sec Name</Form.Label>
                    <Form.Control value={instrumentData.name} type="text" disabled/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Sec Group</Form.Label>
                    <Form.Control value={instrumentData.group} type="text" disabled/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Sec Type</Form.Label>
                    <Form.Control value={instrumentData.type} type="text" disabled/>
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