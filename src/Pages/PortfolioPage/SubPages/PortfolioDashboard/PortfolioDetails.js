import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../../../MainCSS.css"
import React, {useEffect, useState} from "react";
import axios from "axios";

//CSS
import "./PortfolioDetails.css"
import Table from "react-bootstrap/Table";

const PortfolioDetails = (props) => {
    return (
        <Card className="card" style={{margin:'0px'}}>
            <Card.Title className="card-header-first">Portfolio Summary</Card.Title>
            <Card.Body>
                <div style={{height: '100%'}}>
                    <Table id={'cash-flow-table'}>
                        <tbody style={{height: '100%', overflow: 'scroll'}}>
                        <tr key={1}>
                            <td className={'table-row-text'}>{'Portfolio Name'}</td>
                            <td className={'table-row'}>{props.data[0]['portfolio_name']}</td>
                        </tr>
                        <tr key={2}>
                            <td className={'table-row-text'}>{'Portfolio Code'}</td>
                            <td className={'table-row'}>{props.data[0]['portfolio_code']}</td>
                        </tr>
                        <tr key={3}>
                            <td className={'table-row-text'}>{'Portfolio Type'}</td>
                            <td className={'table-row'}>{props.data[0]['portfolio_type']}</td>
                        </tr>
                        <tr key={4}>
                            <td className={'table-row-text'}>{'Manager'}</td>
                            <td className={'table-row'}>{'Pavlicsek Attila'}</td>
                        </tr>
                        <tr key={5}>
                            <td className={'table-row-text'}>{'Inception Date'}</td>
                            <td className={'table-row'}>{props.data[0]['inception_date']}</td>
                        </tr>
                        <tr key={6}>
                            <td className={'table-row-text'}>{'Currency'}</td>
                            <td className={'table-row'}>{props.data[0]['currency']}</td>
                        </tr>
                        <tr key={7}>
                            <td className={'table-row-text'}>{'Status'}</td>
                            <td className={'table-row'}>{'Funded'}</td>
                        </tr>
                        <tr key={8}>
                            <td className={'table-row-text'}>{'NAV'}</td>
                            <td className={'table-row'}>{'100.000'}</td>
                        </tr>
                        <tr key={9}>
                            <td className={'table-row-text'}>{'Available Cash'}</td>
                            <td className={'table-row'}>{'800'}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    );
};

export default PortfolioDetails;