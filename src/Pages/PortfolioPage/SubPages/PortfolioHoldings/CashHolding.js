import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../../../MainCSS.css"
import Chart from "react-apexcharts";
import {useEffect, useState} from "react";
import axios from "axios";

const CashHoldings = (props) => {
    const date = new Date();

    // Loading cash holding data
    const [chData, setChData] = useState([{'amount': 0, 'currency': 'USD'}]);
    console.log(chData)
    useEffect(() => {
            axios.get(props.server + 'portfolios/get_cash_holdings/', {
                params: {
                    portfolio: props.portfolio,
                    date: date.toISOString().substr(0,10),
                }
            })
                .then(response => response['data'].map(data=>data))
                .then(data=>setChData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    return (
        <Card className="card" style={{margin: '0px'}}>
            <Card.Title className="card-header-first">Cash Holdings</Card.Title>
            <Card.Subtitle className="text-muted">on {date.toISOString().substr(0,10)}</Card.Subtitle>
            <Card.Body style={{padding: '0px'}}>
                <Row style={{margin:'0px', padding: '15px', display:'block'}}>
                    <h2>{chData[0]['amount']}</h2>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default CashHoldings;