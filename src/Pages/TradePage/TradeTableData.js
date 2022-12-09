import axios from "axios";
import {useContext, useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

// Context
import EnvContext from "../../context/env-context";
import TradeContext from "./TradePageContext/TradePageContext";

const TradeTableData = (props) => {
    const lastTrade = useContext(TradeContext)['lastTrade'];
    const saveLastTrade = useContext(TradeContext)['saveLastTrade'];
    const environment = useContext(EnvContext)['environment']
    const [tradeData, setTradeData] = useState([])
    useEffect(() => {
            fetch(props.server + 'trade_page/get_open_trades/' + environment)
                .then(response => response.json())
                .then(data => setTradeData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [,lastTrade]
    );
    const CloseTrade = (brokerId, robotId, tradeId) => {
        axios.post(props.server + 'trade_page/close_trade/', {
            broker_id: brokerId,
            robot: robotId,
            trd_id: tradeId,
        })
            .then(response => {
                alert(response['data'])
                saveLastTrade(lastTrade + 1);
            })
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    const tradeDataRow = tradeData.map((record)=>
        <tr key={record['id']}>
            <td style={{fontSize: 12, verticalAlign:"middle" }}>{record['id']}</td>
            <td style={{fontSize: 12, verticalAlign:"middle" }}>{record['broker']}</td>
            <td style={{fontSize: 12, verticalAlign:"middle" }}>{record['broker_id']}</td>
            <td style={{fontSize: 12, verticalAlign:"middle"}}>{record['security']}</td>
            <td style={{fontSize: 12, verticalAlign:"middle"}}>{record['robot']}</td>
            <td style={{fontSize: 12, verticalAlign:"middle"}}>{record['quantity']}</td>
            <td style={{fontSize: 12, verticalAlign:"middle"}}>{record['open_price']}</td>
            <td><Button onClick={() => CloseTrade(record['broker_id'], record['robot'], record['id'])}>Close</Button></td>
        </tr>)
    return (
        <Card style={{width: '100%'}}>
            <Table>
                <thead style={{fontSize: 12}}>
                <tr>
                    <th style={{verticalAlign: "middle"}}>Platform ID</th>
                    <th style={{verticalAlign: "middle"}}>Broker</th>
                    <th style={{verticalAlign: "middle"}}>Broker ID</th>
                    <th style={{verticalAlign: "middle"}}>Security</th>
                    <th style={{verticalAlign: "middle"}}>Robot</th>
                    <th style={{verticalAlign: "middle"}}>Quantity</th>
                    <th style={{verticalAlign: "middle"}}>Price</th>
                    <th style={{verticalAlign: "middle"}}></th>
                </tr>
                </thead>
                <tbody style={{height: '100%', overflow: 'scroll'}}>
                {tradeDataRow}
                </tbody>
            </Table>

        </Card>
    );
};

export default TradeTableData;