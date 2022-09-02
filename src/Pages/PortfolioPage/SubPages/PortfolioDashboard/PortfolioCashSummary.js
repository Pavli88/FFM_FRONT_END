import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Chart from "react-apexcharts";
import axios from "axios";
import React, {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";

//CSS
import "./PortfolioCashSummary.css"

const PortfolioCashSummary = (props) => {
    const cashHoldingData = props.data.map((data) => <tr key={data['id']}>
        <td className={'table-row-name'}>{data['currency']}</td>
        <td className={'table-row-value'}>{data['amount']}</td>
    </tr>);
    return (
        <Card className="card" style={{margin: '0px'}}>
            <Card.Title className="card-header-first">Available Cash</Card.Title>
            <Card.Body>
                <div style={{height: '100%'}}>
                    <Table id={'cash-flow-table'}>
                        <tbody style={{height: '100%', overflow: 'scroll'}}>
                        {cashHoldingData}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    );
};
export default PortfolioCashSummary;