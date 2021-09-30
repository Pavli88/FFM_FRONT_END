import Card from "react-bootstrap/Card";

import PortfolioBuy from "./PortfolioBuy";
import {useEffect, useState} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../PortfolioPage.css"
import "../MainCSS.css"

const PortfolioTransactions = (props) => {

    const [portTransData, setPortTransData] = useState([]);

    useEffect(() => {
            axios.get(props.server + 'portfolios/get_portfolio_transactions/' + props.portfolio)
                .then(response => response['data'].map((data) =>
                    <tr key={data[0]}>
                        <td style={{fontSize: 12, verticalAlign:"middle"}}>{data[1]}</td>
                        <td style={{fontSize: 12, verticalAlign:"middle"}}>{data[2]}</td>
                        <td style={{fontSize: 12, verticalAlign:"middle"}}>{data[3]}</td>
                        <td style={{fontSize: 12, verticalAlign:"middle"}}>{data[4]}</td>
                        <td style={{fontSize: 12, verticalAlign:"middle"}}>{data[5]}</td>
                        <td style={{fontSize: 12, verticalAlign:"middle"}}>{data[6]}</td>
                        <td style={{fontSize: 12, verticalAlign:"middle"}}>{data[7]}</td>
                        <td style={{fontSize: 12, verticalAlign:"middle"}}>{data[8]}</td>
                    </tr>
                ))
                .then(data => setPortTransData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Card className="card">
            <Card.Title className="card-header-first">Transactions</Card.Title>
            <Row style={{width:'100%', margin:'0px'}}>

            </Row>

            <div style={{height:'100%',overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                <thead className="table-header-first">
                <tr>
                    <td className="table-header-row">Portfolio</td>
                    <td className="table-header-row">Quantity</td>
                    <td className="table-header-row">Price</td>
                    <td className="table-header-row">Market Value</td>
                    <td className="table-header-row">Trade Date</td>
                    <td className="table-header-row">Instrument</td>
                    <td className="table-header-row">Instrument Type</td>
                    <td className="table-header-row">Source</td>
                </tr>
                </thead>
                <tbody >
                {portTransData}
                </tbody>
            </Table>
            </div>

        </Card>
    );
};

export default PortfolioTransactions;