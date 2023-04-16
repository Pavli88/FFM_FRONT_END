import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import './PortfolioTransactions.css'
import PortfolioPageContext from "../../../context/portfolio-page-context";

const PortfolioTransactions = (props) => {
    const responseData = useContext(PortfolioPageContext).responseData;
    const portTransData = responseData.map((data) => <tr key={data.id}>
        <td>{data.id}</td>
        <td>{data.portfolio_code}</td>
        <td>{data.quantity}</td>
        <td>{data.price}</td>
        <td>{data.mv}</td>
        <td>{data.currency}</td>
        <td>{data.trading_cost}</td>
        <td>{data.transaction_type}</td>
        <td>{data.transaction_link_code}</td>
        <td>{data.created_on}</td>
        <td>{data.trade_date}</td>
        <td>{data.is_active}</td>
        <td>{data.security}</td>
    </tr>)

    return (
        <Card className={'transactions-container'}>
            <Card.Header>Transactions</Card.Header>
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                    <thead className="table-header-first">
                    <tr>
                        <td className="table-header-row">ID</td>
                        <td className="table-header-row">Portfolio Code</td>
                        <td className="table-header-row">Quantity</td>
                        <td className="table-header-row">Price</td>
                        <td className="table-header-row">Market Value</td>
                        <td className="table-header-row">Currency</td>
                        <td className="table-header-row">Cost</td>
                        <td className="table-header-row">Transaction Type</td>
                        <td className="table-header-row">Related Transaction</td>
                        <td className="table-header-row">Created On</td>
                        <td className="table-header-row">Trade Date</td>
                        <td className="table-header-row">Active</td>
                        <td className="table-header-row">Security</td>
                    </tr>
                    </thead>
                    <tbody>
                    {portTransData}
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};

export default PortfolioTransactions;