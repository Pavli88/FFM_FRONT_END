import CardWithHeader from "../../../Widgets/Charts/CardWithHeader";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {useContext, useState, useRef} from "react";
import DateContext from "../../../context/date-context";
import TradeContext from "../context/trade-context";
import BrokerContext from "../../../context/broker-context";
import UserContext from "../../../context/user-context";

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

    const submitHandler = (event) => {
        if (sl === 0.0) {
            alert('Stop loss cannot be zero!')
        } else {
            axios.post(props.server + 'trade_page/new/transaction/', {
                portfolio_code: portCodeRef.current.value,
                security: instrumentData.id,
                transaction_type: sideRef.current.value,
                quantity: quantityRef.current.value,
                account_id: accountRef.current.value,
            })
                .then(response => {
                    alert(response.data.response)
                    saveNewTransactionID(response.data.transaction_id)
                })
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }
        ;
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
        <option key={data.id} value={data.id}>{data.account_name} | {data.account_number} | {data.env} | {data.currency}</option>
    )

    const getBrokerAccounts = () => {
        axios.get(props.server + 'accounts/get_accounts/', {
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

    return(
        <div style={{width: '100%', height: '100%', paddingLeft: 15}}>
            <CardWithHeader headerContent={'Trades Execuion'}>
            <div style={{width: '100%', height:'100%', overflow:"scroll"}}>
                <div style={{margin: 10}}>
                    <Form.Label>Portfolio Code</Form.Label>
                    <Form.Control ref={portCodeRef} type={'text'}/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label>Broker</Form.Label>
                    <Form.Control ref={brokerRef} onChange={getBrokerAccounts} as="select">
                        {brokers}
                    </Form.Control>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label>Account</Form.Label>
                    <Form.Control ref={accountRef} as="select">
                        {accounts}
                    </Form.Control>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5, paddingTop: 10}}>Security ID</Form.Label>
                    <div style={{display: "flex"}}>
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

                {(securityID > 0 && Object.keys(instrumentData).length === 0)  ? securityExists: ''}

                <div style={{margin: 10}}>
                    <Form.Label>Broker Ticker</Form.Label>
                    <Form.Control value={brokerTicker.source_ticker} type={'text'} disabled/>
                </div>

                {(Object.keys(brokerTicker).length === 0 && Object.keys(instrumentData).length > 0)  ? brokerTickerExist: ''}

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Sec Name</Form.Label>
                    <Form.Control value={instrumentData.name} type="text" disabled/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Sec Group</Form.Label>
                    <Form.Control value={instrumentData.group} type="text" disabled/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label style={{paddingBottom: 5}}>Currency</Form.Label>
                    <Form.Control value={instrumentData.currency} type="text" disabled/>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label>Side</Form.Label>
                    <Form.Control ref={sideRef} as="select">
                        <option value={'Purchase'}>Purchase</option>
                        <option value={'Sale'}>Sale</option>
                    </Form.Control>
                </div>

                <div style={{margin: 10}}>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control ref={quantityRef} type="number" min={0.0}/>
                </div>

                {/*<div style={{padding: '5px'}}>*/}
                {/*    <Form.Label>Stop Loss</Form.Label>*/}
                {/*    <Form.Control onChange={(e) => setSl(e.target.value)} type="number" min={0.0}/>*/}
                {/*</div>*/}
            </div>
            <div style={{margin: 10}}>
                <button className={'save-button'} onClick={submitHandler} style={{width: '100%'}}>
                    Execute
                </button>
            </div>
        </CardWithHeader>
        </div>
    )
};
export default TradeExecution;