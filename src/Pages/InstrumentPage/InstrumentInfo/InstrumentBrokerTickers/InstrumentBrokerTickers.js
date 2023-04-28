import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import { BsPlus, BsDash } from "react-icons/bs";
import InstrumentNewBrokerTicker from "./InstrumentNewBrokerTicker";

const InstrumentBrokerTickers = (props) => {
    const [showNewTickerModal, setShowNewTickerModal] = useState(false);
    const [tickers, setTickers] = useState([]);
    const [selectedTicker, setSelectedTicker] = useState();
    const isMounted = useRef(false);

    const tickerRows = tickers.map((data) => <tr key={data.id} onClick={()=>setSelectedTicker(data.id)}>
        <td>{data.source}</td>
        <td>{data.source_ticker}</td>
        <td>{data.margin}</td>
    </tr>)

    useEffect(() => {
        if (isMounted.current) {
            axios.get(props.server + 'instruments/get/broker/tickers/', {
                params: {
                    inst_code: props.id
                }
            })
                .then(data => setTickers(data.data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        } else {
            isMounted.current = true;
        }
        }, [props.id]
    );

    const deleteTicker = () => {
        axios.post(props.server + 'instruments/delete/broker/ticker/', {
            id: selectedTicker,
        })
            .then(response => alert(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    return (
        <div style={{width: 450, height: '100%', paddingLeft: 15}}>
            <Card style={{height: '100%'}}>
                <Card.Header
                    style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, borderBottom: 0}}>
                    <div style={{display: "flex"}}>
                        <div style={{padding: 5}}>Broker Tickers</div>
                        <div style={{display: 'flex', position: "absolute", right: 5}}>
                            <div style={{padding: 5}}>
                                <button className={'plus-minus-buttons'} onClick={() => setShowNewTickerModal(true)}><BsPlus
                                    style={{fontSize: 24}}/></button>
                            </div>
                            <div style={{padding: 5}}>
                                <button className={'plus-minus-buttons'} onClick={() => deleteTicker()}><BsDash
                                    style={{fontSize: 24}}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </Card.Header>
                <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <Table style={{width: '100%'}}>
                        <thead>
                        <tr>
                            <td>Broker</td>
                            <td>Ticker</td>
                            <td>Margin %</td>
                        </tr>
                        </thead>
                        <tbody style={{height: '100%', overflow: 'scroll'}}>
                        {tickerRows}
                        </tbody>
                    </Table>
                </div>
                <InstrumentNewBrokerTicker id={props.id} server={props.server} show={showNewTickerModal}
                                           hide={() => setShowNewTickerModal(false)}/>
            </Card>
        </div>
    )
};
export default InstrumentBrokerTickers;