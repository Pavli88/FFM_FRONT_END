import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {useContext, useRef, useState} from "react";
import DateContext from "../../../../../context/date-context";
import PortfolioPageContext from "../../../context/portfolio-page-context";

const PortfolioTransactionEntry = (props) => {
    const portfolioCode = useContext(PortfolioPageContext).portfolioCode;
    const portfolioData = useContext(PortfolioPageContext).portfolioData;
    const currentDate = useContext(DateContext).currentDate;
    const [transactionType, setTransactionType] = useState('Purchase');
    const [relatedID, setRelatedID] = useState('');
    const [instrumentData, setInstrumentData] = useState({});
    const [optionSelected, setOptionSelected] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState(false);
    const [optionType, setOptionType] = useState("C");
    const dateRef = useRef();
    const quantityRef = useRef();
    const priceRef = useRef();
    const fxRef = useRef();
    const brokerIdRef = useRef();

    const submitHandler = () => {
        axios.post(props.server + 'portfolios/save/transaction/', {
            portfolio_code: portfolioCode,
            security: instrumentData.id,
            sec_group: instrumentData.group,
            transaction_type: transactionType,
            trade_date: dateRef.current.value,
            quantity: quantityRef.current.value,
            price: priceRef.current.value,
            currency: instrumentData.currency,
            is_active: transactionStatus,
            open_status: transactionStatus ? 'Open' : 'Closed',
            transaction_link_code: 0,
            option: optionSelected ? optionType : '',
            fx_rate: fxRef.current.value,
            broker_id: brokerIdRef.current.value
        })
            .then(response => alert(response.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        setTransactionType('Purchase')
        props.close()
    };

    const getSecurity = () => {
        const url = 'instruments/get/instrument/'
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
        <Modal show={props.show} onHide={() => props.close()}>
            <Modal.Header closeButton>
                <Modal.Title>New Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{height: '600px', overflowY: 'scroll', padding: 5}}>

                    <div style={{display: 'flex'}}>
                        <div style={{paddingLeft: 10, display: "flex"}}>
                            <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Open Transaction</Form.Label>
                            <div style={{padding: 10}}>
                                <input type="checkbox" onChange={(e) => {
                                    setTransactionStatus(e.target.checked)
                                }}/>
                            </div>
                        </div>
                        <div style={{paddingLeft: 10, display: "flex"}}>
                            <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Option</Form.Label>
                            <div style={{padding: 10}}>
                                <input type="checkbox" onChange={(e) => {
                                    setOptionSelected(e.target.checked)
                                    setOptionType('C')
                                }}/>
                            </div>
                        </div>
                    </div>

                    <div className={'entry-block'}>
                        <Form.Label style={{
                            paddingBottom: 5,
                            paddingTop: 10
                        }}>Security ID</Form.Label>
                        <div style={{display: "flex"}}>
                            <div style={{width: '100%', paddingRight: 15}}>
                                <Form.Control value={relatedID} onChange={(e) => setRelatedID(e.target.value)}
                                              type="number"/>
                            </div>
                            <div style={{width: '60px'}}>
                                <button className={'normal-button'}
                                        style={{paddingTop: 7, paddingBottom: 7, paddingLeft: 7, paddingRight: 7}}
                                        onClick={getSecurity}
                                >Get
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={'entry-block'}>
                        <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Transaction Type</Form.Label>
                        <Form.Control onChange={(e) => setTransactionType(e.target.value)} as="select">
                            <option value={'Purchase'}>Purchase</option>
                            <option value={'Sale'}>Sale</option>
                        </Form.Control>
                    </div>


                    {optionSelected ? <div className={'entry-block'}>
                        <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Option Type</Form.Label>
                        <Form.Control onChange={(e) => setOptionType(e.target.value)} as="select">
                            <option value={'C'}>Call</option>
                            <option value={'P'}>Put</option>
                        </Form.Control>
                    </div> : ""
                    }

                    <div style={{margin: 10}}>
                        <Form.Label style={{paddingBottom: 5}}>Sec Name</Form.Label>
                        <Form.Control value={instrumentData.name}
                                      type="text" disabled/>
                    </div>

                    <div style={{margin: 10}}>
                        <Form.Label style={{paddingBottom: 5}}>Sec Group</Form.Label>
                        <Form.Control value={instrumentData.group}
                                      type="text" disabled/>
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

                    <div style={{margin: 10}}>
                        <Form.Label style={{paddingBottom: 5}}>FX Rate</Form.Label>
                        <Form.Control ref={fxRef} type="number" defaultValue={1.0}/>
                    </div>

                    <div style={{margin: 10}}>
                        <Form.Label style={{paddingBottom: 5}}>Broker ID</Form.Label>
                        <Form.Control ref={brokerIdRef} type="number" defaultValue={1.0}/>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={submitHandler} className={'normal-button'}>Save</button>
            </Modal.Footer>
        </Modal>
    )
};
export default PortfolioTransactionEntry;