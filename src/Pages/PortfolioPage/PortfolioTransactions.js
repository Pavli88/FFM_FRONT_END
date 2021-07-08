import Card from "react-bootstrap/Card";

import PortfolioBuy from "./PortfolioBuy";
import {useEffect, useState} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PortfolioTransactions = (props) => {

    const today = new Date();
    const date=today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();

    const [portTransData, setPortTransData] = useState([]);
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);

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
        <Card style={{height: '400px'}}>
            <Row>
                <Card.Title>Transactions</Card.Title>
                <PortfolioBuy portfolio={props.portfolio} server={props.server}/>
            </Row>


            <Row style={{width:'100%', margin:'0px'}}>
                <Col>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label style={{fontSize: 12, verticalAlign:"middle"}} column sm={2}>
                        From
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control style={{fontSize: 12}} type="date" onChange={startDateHandler}/>
                    </Col>
                </Form.Group>
                </Col>
                <Col>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label style={{fontSize: 12, verticalAlign:"middle"}} column sm={2}>
                        To
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control style={{fontSize: 12}} type="date" value={date} onChange={endDateHandler}/>
                    </Col>
                </Form.Group>
                </Col>

            </Row>


            <div style={{height:'100%',overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table >
                <thead>
                <tr>
                    <td style={{fontSize: 12, verticalAlign:"middle"}}>Portfolio</td>
                    <td style={{fontSize: 12, verticalAlign:"middle"}}>Quantity</td>
                    <td style={{fontSize: 12, verticalAlign:"middle"}}>Price</td>
                    <td style={{fontSize: 12, verticalAlign:"middle"}}>Market Value</td>
                    <td style={{fontSize: 12, verticalAlign:"middle"}}>Trade Date</td>
                    <td style={{fontSize: 12, verticalAlign:"middle"}}>Instrument</td>
                    <td style={{fontSize: 12, verticalAlign:"middle"}}>Instrument Type</td>
                    <td style={{fontSize: 12, verticalAlign:"middle"}}>Source</td>
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