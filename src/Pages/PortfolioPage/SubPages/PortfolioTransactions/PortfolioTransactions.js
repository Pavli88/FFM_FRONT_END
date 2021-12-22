import Card from "react-bootstrap/Card";

import PortfolioBuy from "../../PortfolioBuy";
import {useEffect, useState} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../../../PortfolioPage.css"
import "../../../MainCSS.css"

const PortfolioTransactions = (props) => {
     // Date variables
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const [startDate, setStartDate] = useState(firstDay.toISOString().substr(0,10));
    const [endDate, setEndDate] = useState(date.toISOString().substr(0,10));

    const [portTransData, setPortTransData] = useState([]);

    const startDateHandler = (event) => {
        setStartDate(event.target.value);
    };
    const endDateHandler = (event) => {
        setEndDate(event.target.value);
    };

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
            <Row style={{width: '100%', margin: '0px'}}>
                <Col sm={2}>
                    <Card.Title className="card-header-first">Transactions</Card.Title>
                </Col>
                <Col sm={10} style={{display:'flex'}}>
                    <Col>
                        <Form.Group as={Row} style={{margin:'0px', padding:'5px'}}>
                        <Form.Label className="form-label-first" column sm={2}>
                            From
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="date" onChange={startDateHandler}
                                          defaultValue={firstDay.toISOString().substr(0, 10)}/>
                        </Col>
                    </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Row} style={{margin:'0px', padding:'5px'}}>
                        <Form.Label className="form-label-first" column sm={2}>
                            To
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="date" onChange={endDateHandler}
                                          defaultValue={date.toISOString().substr(0, 10)}/>
                        </Col>
                    </Form.Group>
                    </Col>
                </Col>
            </Row>
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
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
                    <tbody>
                    {portTransData}
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};

export default PortfolioTransactions;