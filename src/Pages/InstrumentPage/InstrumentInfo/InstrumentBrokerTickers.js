import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from "react";
import axios from "axios";
import { BsPlus, BsDash } from "react-icons/bs";
import InstrumentNewBrokerTicker from "./InstrumentNewBrokerTicker";

const InstrumentBrokerTickers = (props) => {
    const [showNewTickerModal, setShowNewTickerModal] = useState(false);
    const [tickers, setTickers] = useState([]);
    const [selectedTicker, setSelectedTicker] = useState();

    const tickerRows = tickers.map((data) => <tr key={data.id} onClick={()=>setSelectedTicker(data.id)}>
        <td>{data.source}</td>
        <td>{data.source_ticker}</td>
    </tr>)

    useEffect(() => {
            axios.get(props.server + 'instruments/get/broker/tickers/', {
                params: {
                    id: props.id
                }
            })
                .then(data => setTickers(data.data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
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

    return(
        <Card className="card main-layout">
            <Card.Header style={{paddingTop: 5, paddingBottom:5, paddingLeft:10, paddingRight:10, borderBottom: 0}}>
                <div style={{display:"flex"}}>
                    <div style={{width: '90%'}}><p style={{margin:0, height:'100%', verticalAlign: "middle"}}>Broker Tickers</p></div>
                    <div style={{margin:5}}>
                        <button style={{border:0}} onClick={() => setShowNewTickerModal(true)}><BsPlus style={{fontSize:24}}/></button>
                    </div>
                    <div style={{margin:5}}>
                        <button style={{border:0}} onClick={() => deleteTicker()}><BsDash style={{fontSize:24}}/></button>
                    </div>
                </div>
            </Card.Header>
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table style={{width: '100%'}}>
                    {/*<thead className="table-header-row">*/}
                    {/*<tr>*/}
                    {/*    <td style={{border: '0px', verticalAlign: "middle"}}>Broker</td>*/}
                    {/*    <td style={{border: '0px', verticalAlign: "middle"}}>Ticker</td>*/}
                    {/*</tr>*/}
                    {/*</thead>*/}
                    <tbody style={{height: '100%', overflow: 'scroll'}}>
                    {tickerRows}
                    </tbody>
                </Table>
            </div>
            <InstrumentNewBrokerTicker id={props.id} server={props.server} show={showNewTickerModal} hide={()=>setShowNewTickerModal(false)}/>
        </Card>
    )
};
export default InstrumentBrokerTickers;