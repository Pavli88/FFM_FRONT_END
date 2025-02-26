import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {useContext, useRef, useState} from "react";
import DateContext from "../../../../../../context/date-context";
import PortfolioPageContext from "../../../../context/portfolio-page-context";

const PortfolioTransactionEntryModal = (props) => {
    const portfolioCode = useContext(PortfolioPageContext).portfolioCode;
    const portfolioData = useContext(PortfolioPageContext).portfolioData;
    const currentDate = useContext(DateContext).currentDate;
    const [transactionType, setTransactionType] = useState('Purchase');
    const [relatedID, setRelatedID] = useState('');
    const [instrumentData, setInstrumentData] = useState({});
    const [optionSelected, setOptionSelected] = useState(false);
    const [optionType, setOptionType] = useState("C");
    const [active, setActive] = useState(false);
    const [broker, setBroker] = useState('oanda');
    const dateRef = useRef();
    const quantityRef = useRef();
    const priceRef = useRef();
    const fxRef = useRef();
    const brokerIdRef = useRef();

    const submitHandler = async () => {
        const response = await axios.post(props.server + 'portfolios/new/transaction/', {
            portfolio_code: portfolioCode,
            security_id: instrumentData.id,
            transaction_type: transactionType,
            trade_date: dateRef.current.value,
            quantity: quantityRef.current.value,
            price: priceRef.current.value,
            currency: instrumentData.currency,
            is_active: active,
            open_status: 'Open',
            transaction_link_code: 0,
            option: optionSelected ? optionType : '',
            fx_rate: fxRef.current.value,
            broker: broker,
            broker_id: brokerIdRef.current.value
        })
        if (response.data.success){
            setTransactionType('Purchase')
            props.close()
            console.log('CLOSING')
        };
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
            <div className={'card-header'}>
                New Transaction
            </div>
            <div>
                <div style={{height: '600px', overflowY: 'scroll', padding: 5}}>

                    <div style={{display: "flex", margin: 5}}>
                        <div>
                            <span className={'input-label'}>Active Transaction</span>
                        </div>
                        <div style={{position: "absolute", right: 10}}>
                            <input type="checkbox" onChange={() => setActive(!active)}/>
                        </div>
                    </div>

                    <div style={{display: "flex", margin: 5}}>
                        <div>
                            <span className={'input-label'}>Option</span>
                        </div>
                        <div style={{position: "absolute", right: 10}}>
                            <input type="checkbox" onChange={(e) => {
                                setOptionSelected(e.target.checked)
                                setOptionType('C')
                            }}/>
                        </div>
                    </div>

                    <div style={{display: "flex", margin: 5}}>
                        <div>
                            <span className={'input-label'}>Security ID</span>
                        </div>

                        <div style={{position: "absolute", right: 10, display: "flex"}}>
                            <div>
                                <input value={relatedID}
                                       onChange={(e) => setRelatedID(e.target.value)}
                                       type="number"
                                       style={{width: 135}}/>
                            </div>
                            <div style={{paddingLeft: 15}}>
                                <button className={'normal-button'}
                                        style={{width: 50}}
                                        onClick={getSecurity}
                                >Get
                                </button>
                            </div>

                        </div>
                    </div>

                    <div style={{display: "flex", margin: 5}}>
                        <div>
                            <span className={'input-label'}>Transaction Type</span>
                        </div>
                        <div style={{position: "absolute", right: 10, width: 200}}>
                            <Form.Control onChange={(e) => setTransactionType(e.target.value)} as="select">
                                <option value={'Purchase'}>Purchase</option>
                                <option value={'Sale'}>Sale</option>
                            </Form.Control>
                        </div>
                    </div>


                    {optionSelected ? <div style={{display: "flex", margin: 5}}>
                        <div>
                            <span className={'input-label'}>Option Type</span>
                        </div>
                        <div style={{position: "absolute", right: 10, width: 200}}>
                            <Form.Control onChange={(e) => setOptionType(e.target.value)} as="select">
                                <option value={'C'}>Call</option>
                                <option value={'P'}>Put</option>
                            </Form.Control>
                        </div>
                    </div> : ""
                    }

                    <div style={{display: "flex", margin: 5}}>
                        <div>
                            <span className={'input-label'}>Security Name</span>
                        </div>
                        <div style={{position: "absolute", right: 10, width: 200}}>
                            <input value={instrumentData.name} type="text" disabled/>
                        </div>
                    </div>

                    <div style={{display: "flex", margin: 5}}>
                        <div>
                            <span className={'input-label'}>Security Group</span>
                        </div>
                        <div style={{position: "absolute", right: 10, width: 200}}>
                            <input value={instrumentData.group} type="text" disabled/>
                        </div>
                    </div>

                    <div style={{display: "flex", margin: 5}}>
                        <div>
                            <span className={'input-label'}>Currency</span>
                        </div>
                        <div style={{position: "absolute", right: 10, width: 200}}>
                            <input value={instrumentData.currency} type="text" disabled/>
                        </div>
                    </div>

                    <div style={{display: "flex", margin: 5}}>
                        <div>
                            <span className={'input-label'}>Date</span>
                        </div>
                        <div style={{position: "absolute", right: 10, width: 200}}>
                            <input ref={dateRef} defaultValue={currentDate} type="date"/>
                        </div>
                    </div>

                    <div style={{display: "flex", margin: 5}}>
                        <div>
                            <span className={'input-label'}>Quantity</span>
                        </div>
                        <div style={{position: "absolute", right: 10, width: 200}}>
                            <input ref={quantityRef} type="number"/>
                        </div>
                    </div>

                    <div style={{display: "flex", margin: 5}}>
                        <div>
                            <span className={'input-label'}>Price</span>
                        </div>
                        <div style={{position: "absolute", right: 10, width: 200}}>
                            <input ref={priceRef} type="number" min={0.0}/>
                        </div>
                    </div>

                    <div style={{display: "flex", margin: 5}}>
                        <div>
                            <span className={'input-label'}>FX Rate</span>
                        </div>
                        <div style={{position: "absolute", right: 10, width: 200}}>
                            <input ref={fxRef} type="number" defaultValue={1.0}/>
                        </div>
                    </div>

                    <div style={{display: "flex", margin: 5}}>
                        <div>
                            <span className={'input-label'}>Broker</span>
                        </div>
                        <div style={{position: "absolute", right: 10, width: 200}}>
                            <Form.Control onChange={(e) => setBroker(e.target.value)} as="select">
                                <option value={'oanda'}>Oanda</option>
                            </Form.Control>
                        </div>
                    </div>

                    <div style={{display: "flex", margin: 5}}>
                        <div>
                            <span className={'input-label'}>Broker ID</span>
                        </div>
                        <div style={{position: "absolute", right: 10, width: 200}}>
                            <input ref={brokerIdRef} type="number" defaultValue={1.0}/>
                        </div>
                    </div>
                </div>
            </div>
            <Modal.Footer>
                <button onClick={submitHandler} className={'save-button'}>Save</button>
            </Modal.Footer>
        </Modal>
    )
};
export default PortfolioTransactionEntryModal;