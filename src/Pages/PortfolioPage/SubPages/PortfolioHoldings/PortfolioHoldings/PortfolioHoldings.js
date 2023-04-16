import {useState} from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

const PortfolioHoldings = () => {
    return (
        <Card className="card">
            <Card.Header>Holdings</Card.Header>
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                    <thead className="table-header-first">
                    <tr>
                        <td className="table-header-row">Starting Quantity</td>
                        <td className="table-header-row">Price</td>
                        <td className="table-header-row">Market Value</td>
                        <td className="table-header-row">Trade Date</td>
                        <td className="table-header-row">Instrument</td>
                        <td className="table-header-row">Instrument Type</td>
                        <td className="table-header-row">Source</td>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </Table>
            </div>
        </Card>
    );
};

export default PortfolioHoldings;