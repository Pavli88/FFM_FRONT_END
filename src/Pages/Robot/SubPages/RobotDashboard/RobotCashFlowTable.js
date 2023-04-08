import Table from "react-bootstrap/Table";
import React, {useContext, useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

const RobotCashFlowTable = (props) => {
    const [cashFlowData, setCashFlowData] = useState();
    useEffect(() => {
        axios.get(props.server + 'robots/robot_cash_flow/' + props.robot)
            .then(response => response['data'].map(data => <tr key={data['id']}>
                <td style={{fontSize: 12, verticalAlign: "middle"}}>{data['id']}</td>
                <td style={{fontSize: 12, verticalAlign: "middle", color: data['cash_flow'] > 0 ? 'green':'red'}}>{data['cash_flow']}</td>
                <td style={{fontSize: 12, verticalAlign: "middle"}}>{data['date']}</td>
            </tr>)).then(data=>setCashFlowData(data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        }, [props]
    );
    return (
        <Card className="card" style={{margin: '2px', height: '100%'}}>
                <Card.Title className="card-header-first">Cash Flow</Card.Title>
            <Card.Subtitle className="mb-2 text-muted" style={{textAlign:'left', fontSize: 10, paddingLeft:'15px'}}>
            </Card.Subtitle>
                <div style={{overflowY: 'scroll', overflowX: 'hidden', height:'100%'}}>
                    <Table id={'cash-flow-table'}>
                        <thead style={{fontSize: 12}}>
                        <tr>
                            <th style={{verticalAlign: "middle"}}>ID</th>
                            <th style={{verticalAlign: "middle"}}>Cash Flow</th>
                            <th style={{verticalAlign: "middle"}}>Date</th>
                        </tr>
                        </thead>
                        <tbody style={{height: '100%', overflow: 'scroll'}}>
                        {cashFlowData}
                        </tbody>
                    </Table>
                </div>
            </Card>
    );
};
export default RobotCashFlowTable;