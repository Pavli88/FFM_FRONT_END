import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import React from "react";
import RobotTransactionTableRow from "./RobotTransactionTableRow";
import RobotTransactionUpdateModal from "./RobotTransactionUpdateModal";
import RobotTransactionContext from "./RobotTransactionContext";
import {useState} from "react";

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const RobotTransactionsTable = (props) => {
    const [modalDataParameters, setModalDataParameters] = useState({'data': [], status: false});
    const transactionRows = props.data.map(data =>
        <RobotTransactionTableRow
            key={data['id']}
            quantity={data['quantity']}
            status={data['status']}
            pnl={data['pnl']}
            open_price={data['open_price']} close_price={data['close_price']}
            open_time={data['open_time']}
            close_time={data['close_time']}
            side={data['side']}
            broker_id={data['broker_id']}
            id={data['id']}
        />
    );
    console.log(modalDataParameters)
    return (
        <RobotTransactionContext.Provider value={{saveModalDataParameters: setModalDataParameters}}>
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
                <RobotTransactionUpdateModal server={props.server} show={modalDataParameters['status']} data={modalDataParameters['data']}/>
            </Card>
        </RobotTransactionContext.Provider>
    );
};
export default RobotTransactionsTable;