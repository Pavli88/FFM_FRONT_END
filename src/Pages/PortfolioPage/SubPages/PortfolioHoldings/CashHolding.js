import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../../../MainCSS.css"
import Chart from "react-apexcharts";
import {useEffect, useState} from "react";
import axios from "axios";

const CashHoldings = (props) => {
    console.log(props.data)
    // const chartData = props.data.map((item)=>);


    return (
        <Card className="card" style={{margin: '0px'}}>
            <Card.Title className="card-header-first">Cash Holdings</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            <Card.Body style={{padding: '0px'}}>
                <Row style={{width:'100%', margin:'0px'}}>
                    <h5>2000</h5>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default CashHoldings;