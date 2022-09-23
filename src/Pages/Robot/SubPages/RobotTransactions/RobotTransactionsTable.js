import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import React from "react";
import RobotTransactionUpdateModal from "./RobotTransactionUpdateModal";
import {useState} from "react";

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const RobotTransactionsTable = (props) => {
    const [selectedTransactionData, setSelectedTransactionData] = useState([]);
    const [modalStatus, setModalStatus] = useState(false);
    console.log(selectedTransactionData)
    const transactionRows = props.data.map(data =>
        <tr key={data['id']} onDoubleClick={() => {setSelectedTransactionData([
            data['id'],
            data['quantity'],
            data['status'],
            data['pnl'],
            data['open_price'],
            data['close_price'],
            data['open_time'],
            data['close_time'],
            data['side'],
            data['broker_id'],
            data['id']])
            setModalStatus(true)
        }
        }>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{data['quantity']}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{data['status']}</td>
                <td style={{fontSize: 14, verticalAlign: "middle", color: data['pnl'] < 0 ? '#E32227':'#007500'}}>{data['pnl']}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{data['open_price']}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{data['close_price']}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{data['open_time']}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{data['close_time']}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{data['side']}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{data['broker_id']}</td>
                <td style={{fontSize: 14, verticalAlign: "middle"}}>{data['id']}</td>
            </tr>
    );
    return (
        <Card className="card" style={{margin: '2px', height: '100%'}}>
            <Card.Title className="card-header-first">Transactions</Card.Title>
            <Card.Subtitle className="mb-2 text-muted"
                           style={{textAlign: 'left', fontSize: 10, paddingLeft: '15px'}}>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="transaction-table"
                    filename="transactions"
                    sheet="transactions"
                    buttonText="Export to Excel"/>
            </Card.Subtitle>
            <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '100%'}}>
                <Table id={'transaction-table'}>
                    <thead style={{fontSize: 12}}>
                    <tr>
                        <th style={{verticalAlign: "middle"}}>Quantity</th>
                        <th style={{verticalAlign: "middle"}}>Status</th>
                        <th style={{verticalAlign: "middle"}}>P&L</th>
                        <th style={{verticalAlign: "middle"}}>Open Price</th>
                        <th style={{verticalAlign: "middle"}}>Close Price</th>
                        <th style={{verticalAlign: "middle"}}>Open Time</th>
                        <th style={{verticalAlign: "middle"}}>Close Time</th>
                        <th style={{verticalAlign: "middle"}}>Side</th>
                        <th style={{verticalAlign: "middle"}}>Broker ID</th>
                        <th style={{verticalAlign: "middle"}}>ID</th>
                        <th style={{verticalAlign: "middle"}}></th>
                    </tr>
                    </thead>
                    <tbody style={{height: '100%', overflow: 'scroll'}}>
                    {transactionRows}
                    </tbody>
                </Table>
            </div>
            <RobotTransactionUpdateModal server={props.server} show={modalStatus} close={() => setModalStatus(false)}
                                         data={selectedTransactionData}/>
        </Card>
    );
};
export default RobotTransactionsTable;