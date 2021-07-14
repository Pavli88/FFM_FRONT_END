import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import "../MainCSS.css"
import {useEffect, useState} from "react";
import axios from "axios";

const RobotDetails = (props) => {

    const [robotData, setRobotData] = useState([props.default]);

    useEffect(() => {
            axios.get(props.server + 'robots/get_robot/'+props.robot)
                .then(response => response['data'].map(data=>data))
                .then(data=>setRobotData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Card className="card">
            <Card.Title className="card-header-first">Details</Card.Title>
            <Card.Body>
                <Row>
                    <Col>
                        <div style={{ display:'flex', width:'100%'}}>
                            <p>Strategy</p>
                            <p style={{position: 'absolute', right:'0px'}}>{robotData[0]['strategy']}</p>
                        </div>
                        <div style={{ display:'flex', width:'100%'}}>
                            <p>Security</p>
                            <p style={{position: 'absolute', right:'0px'}}>{robotData[0]['security']}</p>
                        </div>
                        <div style={{ display:'flex', width:'100%'}}>
                            <p>Inception Date</p>
                            <p style={{position: 'absolute', right:'0px'}}>{robotData[0]['inception_date']}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ display:'flex', width:'100%'}}>
                            <p>Broker</p>
                            <p style={{position: 'absolute', right:'0px'}}>{robotData[0]['broker']}</p>
                        </div>
                        <div style={{ display:'flex', width:'100%'}}>
                            <p>Account Number</p>

                        </div>
                         <p style={{position: 'absolute', left:'15px'}}>{robotData[0]['account_number']}</p>
                    </Col>
                </Row>
            </Card.Body>

        </Card>
    );
};

export default RobotDetails;