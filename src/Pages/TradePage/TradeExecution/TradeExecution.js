import Form from "react-bootstrap/Form";
import axios from "axios";
import {useContext, useState, useRef} from "react";
import DateContext from "../../../context/date-context";
import TradeContext from "../context/trade-context";
import BrokerContext from "../../../context/broker-context";
import UserContext from "../../../context/user-context";
import Modal from "react-bootstrap/Modal";

const TradeExecution = (props) => {
    const saveNewTransactionID = useContext(TradeContext).saveNewTrnsactionID;
    const currentDate = useContext(DateContext).currentDate;
    const user = useContext(UserContext).user;
    const portCodeRef = useRef();
    const quantityRef = useRef();
    const brokerRef = useRef();
    const accountRef = useRef();
    const sideRef = useRef();
    const [sl, setSl] = useState(1);
    const [securityID, setSecurityID] = useState();
    const [instrumentData, setInstrumentData] = useState({});
    const [brokerTicker, setBrokerTicker] = useState({});
    const [accountsData, setAccountsData] = useState([{}]);

    const submitHandler = async(event) => {
        if (sl === 0.0) {
            alert('Stop loss cannot be zero!')
        } else {
            const response = await axios.post(props.server + 'trade_page/new/signal/', {
                portfolio_code: portCodeRef.current.value,
                account_id: accountRef.current.value,
                security_id: instrumentData.id,
                transaction_type: sideRef.current.value,
                quantity: quantityRef.current.value,
                manual: true,

            })
            props.update();

        };
    };

    const getSecurity = () => {
        axios.get(props.server + 'instruments/get/instrument/', {
            params: {
                id: securityID,
            }
        })
            .then(response => setInstrumentData(response.data[0] === undefined ? {}: response.data[0]))
            .catch((error) => {
                console.error('Error Message:', error);
            });

        axios.get(props.server + 'instruments/get/broker/tickers/', {
            params: {
                inst_code: securityID,
                source: brokerRef.current.value,
            }
        })
            .then(response => setBrokerTicker(response.data[0] === undefined ? {}: response.data[0]))
            .catch((error) => {
                console.error('Error Message:', error);
            });

    };

    const brokers = useContext(BrokerContext).brokerData.map((data) =>
        <option key={data.id} value={data.broker_code}>{data.broker}</option>
    )

    const accounts = accountsData.map((data, index) =>
        <option key={data.id} value={data.id}>{data.account_number}</option>
    )

    const getBrokerAccounts = () => {
        axios.get(props.server + 'accounts/get/accounts/', {
            params: {
                broker_name: brokerRef.current.value,
                owner: user,
            }
        })
            .then(response => setAccountsData(response.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const brokerTickerExist = <div style={{margin: 10, color: 'red'}}>
        Ticker is not assigned for this broker on the security
    </div>

    const securityExists = <div style={{margin: 10, color: 'red'}}>
        Security ID does not exist
    </div>

    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>New Trade</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display: "flex", margin: 5}}>
                    <div>
                        <span className={'input-label'}>Portfolio Code</span>
                    </div>
                    <div style={{position: "absolute", right: 10, width: 250}}>
                        <input ref={portCodeRef} type="text"/>
                    </div>
                </div>

                <div style={{display: "flex", margin: 5}}>
                    <div>
                        <span className={'input-label'}>Broker</span>
                    </div>
                    <div style={{position: "absolute", right: 10, width: 250}}>
                        <Form.Control ref={brokerRef} onChange={getBrokerAccounts} as="select">
                            {brokers}
                        </Form.Control>
                    </div>
                </div>

                <div style={{display: "flex", margin: 5}}>
                    <div>
                        <span className={'input-label'}>Account</span>
                    </div>
                    <div style={{position: "absolute", right: 10, width: 250}}>
                        <Form.Control ref={accountRef} as="select">
                            {accounts}
                        </Form.Control>
                    </div>
                </div>

                <div style={{display: "flex", margin: 5}}>
                    <div>
                        <span className={'input-label'}>Instrument ID</span>
                    </div>

                    <div style={{position: "absolute", right: 10, width: 250, display: "flex"}}>
                        <div style={{width: '100%', paddingRight: 15}}>
                            <Form.Control onChange={(e) => setSecurityID(e.target.value)}
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

                {(securityID > 0 && Object.keys(instrumentData).length === 0) ? securityExists : ''}

                <div style={{display: "flex", margin: 5}}>
                    <div>
                        <span className={'input-label'}>Broker Ticker</span>
                    </div>
                    <div style={{position: "absolute", right: 10, width: 250}}>
                        <input value={brokerTicker.source_ticker} type="text" disabled/>
                    </div>
                </div>

                {(Object.keys(brokerTicker).length === 0 && Object.keys(instrumentData).length > 0) ? brokerTickerExist : ''}

                <div style={{display: "flex", margin: 5}}>
                    <div>
                        <span className={'input-label'}>Security Name</span>
                    </div>
                    <div style={{position: "absolute", right: 10, width: 250}}>
                        <input value={instrumentData.name} type="text" disabled/>
                    </div>
                </div>

                <div style={{display: "flex", margin: 5}}>
                    <div>
                        <span className={'input-label'}>Security Group</span>
                    </div>
                    <div style={{position: "absolute", right: 10, width: 250}}>
                        <input value={instrumentData.group} type="text" disabled/>
                    </div>
                </div>

                <div style={{display: "flex", margin: 5}}>
                    <div>
                        <span className={'input-label'}>Currency</span>
                    </div>
                    <div style={{position: "absolute", right: 10, width: 250}}>
                        <input value={instrumentData.currency} type="text" disabled/>
                    </div>
                </div>

                <div style={{display: "flex", margin: 5}}>
                    <div>
                        <span className={'input-label'}>Trade side</span>
                    </div>
                    <div style={{position: "absolute", right: 10, width: 250}}>
                        <Form.Control ref={sideRef} as="select">
                            <option value={'Purchase'}>Purchase</option>
                            <option value={'Sale'}>Sale</option>
                        </Form.Control>
                    </div>
                </div>

                <div style={{display: "flex", margin: 5}}>
                    <div>
                        <span className={'input-label'}>Quantity</span>
                    </div>
                    <div style={{position: "absolute", right: 10, width: 250}}>
                        <input ref={quantityRef} type="number" min={0.0}/>
                    </div>
                </div>

            </Modal.Body>
            <div style={{margin: 10}}>
                <button className={'save-button'} onClick={submitHandler} style={{width: '100%'}}>
                    Execute
                </button>
            </div>
        </Modal>
    )
};
export default TradeExecution;