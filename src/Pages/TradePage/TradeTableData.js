import {useContext, useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import TradeTableRow from "./TradeTableRow";


const TradeTableData = (props) => {

    const [tradeData, setTradeData] = useState([])

    // Fetching robot risk data from database
    useEffect(() => {
            fetch(props.server + 'trade_page/get_open_trades/' + props.env)
                .then(response => response.json())
                .then(data => setTradeData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    const tradeDataRow = tradeData.map((record)=>
        <TradeTableRow
            server={props.server}
            key={record['id']}
            id={record['id']}
            broker_id={record['broker_id']}
            security={record['security']}
            robot={record['robot']}
            quantity={record['quantity']}
            price={record['open_price']}/>)

    return (
        <Card style={{width: '100%'}}>
            <Table>
                <thead style={{fontSize: 12}}>
                <tr>
                    <th style={{verticalAlign: "middle"}}>Platform ID</th>
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