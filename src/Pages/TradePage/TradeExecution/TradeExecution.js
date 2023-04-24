import CardWithHeader from "../../../Widgets/Charts/CardWithHeader";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {useContext, useState, useRef} from "react";
import DateContext from "../../../context/date-context";
import TradeContext from "../context/trade-context";

const TradeExecution = (props) => {
    const saveNewTransactionID = useContext(TradeContext).saveNewTrnsactionID;
    const currentDate = useContext(DateContext).currentDate;
    const portCodeRef = useRef();
    const quantityRef = useRef();
    const [side, setSide] = useState('Purchase');
    const [sl, setSl] = useState(1);
    const [securityID, setSecurityID] = useState();
    const [instrumentData, setInstrumentData] = useState({});

    const submitHandler = (event) => {
        if (sl === 0.0) {
            alert('Stop loss cannot be zero!')
        } else {
            axios.post(props.server + 'trade_page/new/transaction/', {
                portfolio_code: portCodeRef.current.value,
                security: instrumentData.id,
                sec_group: instrumentData.group,
                transaction_type: side,
                trade_date: currentDate,
                quantity: quantityRef.current.value,
                currency: instrumentData.currency,
                transaction_link_code: '',
                open_status: 'Open',
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
            .then(response => setInstrumentData(response.data[0]))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    return(
        <div style={{width: '100%', paddingLeft: 15}}>
            <CardWithHeader headerContent={'Trades Execuion'}>
            <div style={{width: '100%', height:'100%'}}>
                <div style={{margin: 10}}>
                    <Form.Label>Portfolio Code</Form.Label>
                    <Form.Control ref={portCodeRef} type={'text'}/>
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
                    <Form.Control onChange={(e) => setSide(e.target.value)} as="select">
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