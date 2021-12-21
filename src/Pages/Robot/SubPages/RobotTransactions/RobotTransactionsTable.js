import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

const RobotTransactionsTable = (props) => {

    return (
        <Card style={{width: '100%'}}>
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
                {/*{tradeDataRow}*/}
                </tbody>
            </Table>
        </Card>
    );
};

export default RobotTransactionsTable;