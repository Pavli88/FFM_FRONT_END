import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import RobotTransactionTableRow from "./RobotTransactionTableRow";

const RobotTransactionsTable = (props) => {
    const transactionRows = props.data.map(data =>
        <RobotTransactionTableRow quantity={data['quantity']} status={data['status']} pnl={data['pnl']}
                                  open_price={data['open_price']} close_price={data['close_price']}
                                  open_time={data['open_time']}
                                  close_time={data['close_time']} side={data['side']} broker_id={data['broker_id']}/>
    )
    return (
        <Card style={{width: '100%'}}>
            <div style={{height: '500px', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
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
                    <th style={{verticalAlign: "middle"}}></th>
                </tr>
                </thead>
                <tbody style={{height: '100%', overflow: 'scroll'}}>
                {transactionRows}
                </tbody>
            </Table>
            </div>
        </Card>
    );
};

export default RobotTransactionsTable;