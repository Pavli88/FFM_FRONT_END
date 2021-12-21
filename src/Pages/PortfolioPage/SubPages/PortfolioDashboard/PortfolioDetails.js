import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../../../MainCSS.css"
import {useEffect, useState} from "react";
import axios from "axios";

const PortfolioDetails = (props) => {

    const [portData, setPortData] = useState([props.default]);

    useEffect(() => {
            axios.get(props.server + 'portfolios/get_portfolio_data/'+ props.portfolio)
                .then(response => response['data'].map(data=>data))
                .then(data=>setPortData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Card className="card" style={{margin:'0px'}}>
            <Card.Title className="card-header-first">Portfolio Details</Card.Title>
            <Card.Body>
                <Row>
                    <Col>
                        <div style={{ display:'flex', width:'100%'}}>
                            <p>Portfolio Code</p>
                            <p style={{position: 'absolute', right:'20px'}}>{portData[0]['portfolio_code']}</p>
                        </div>
                        <div style={{ display:'flex', width:'100%'}}>
                            <p>Type</p>
                            <p style={{position: 'absolute', right:'20px'}}>{portData[0]['portfolio_type']}</p>
                        </div>
                        <div style={{ display:'flex', width:'100%'}}>
                            <p>Base Currency</p>
                            <p style={{position: 'absolute', right:'20px'}}>{portData[0]['currency']}</p>
                        </div>
                        <div style={{ display:'flex', width:'100%'}}>
                            <p>Inception Date</p>
                            <p style={{position: 'absolute', right:'20px'}}>{portData[0]['inception_date']}</p>
                        </div>
                        <div style={{display: 'flex', width: '100%'}}>
                        <p>Status</p>
                        <p style={{position: 'absolute', right: '20px'}}>{portData[0]['status']}</p>
                    </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default PortfolioDetails;