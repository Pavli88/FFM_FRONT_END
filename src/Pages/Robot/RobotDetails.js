import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import "../MainCSS.css"
import {useEffect, useState} from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";

const RobotDetails = (props) => {

    const [robotData, setRobotData] = useState([props.default]);
    const [priceData, setPriceData] = useState([]);
    console.log(priceData)
    useEffect(() => {
            axios.get(props.server + 'robots/get_robot/'+props.robot)
                .then(response => response['data'].map(data=>data))
                .then(data=>setRobotData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    useEffect(() => {
            axios.get(props.server + 'robots/get_last_price/', {
                params: {
                    robot: props.robot,
                    start_date: props.start_date,
                    end_date: props.end_date,
                }
            })
                .then(function(response){
                    const data = response['data'];
                    setPriceData(data);
                })
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Row style={{height: '100px', padding: '5px', margin: '5px'}}>
            <Card className="card" style={{margin: '0px'}}>
                {/*<Card.Title className="card-header-first">Details</Card.Title>*/}
                <Card.Body style={{padding: '5px'}}>
                    <Row style={{height: '100%', width: '100%', margin: '0px'}}>
                        <Col style={{height: '100%'}}>
                            <Col style={{display: 'flex', width: '100%'}}>
                                <p>Strategy</p>
                                <p style={{position: 'absolute', right: '0px'}}>{robotData[0]['strategy']}</p>
                            </Col>
                            <Col style={{display: 'flex', width: '100%'}}>
                                <p>Security</p>
                                <p style={{position: 'absolute', right: '0px'}}>{robotData[0]['security']}</p>
                            </Col>
                        </Col>
                        <Col style={{height: '100%'}}>
                            <Col style={{display: 'flex', width: '100%'}}>
                                <p>Inception Date</p>
                                <p style={{position: 'absolute', right: '0px'}}>{robotData[0]['inception_date']}</p>
                            </Col>
                            <Col style={{display: 'flex', width: '100%'}}>
                                <p>Broker</p>
                                <p style={{position: 'absolute', right: '0px'}}>{robotData[0]['broker']}</p>
                            </Col>

                        </Col>
                        <Col style={{height: '100%'}}>
                            <Col style={{display: 'flex', width: '100%'}}>
                                <p>Account Number</p>
                                <p style={{position: 'absolute', right: '0px'}}>{robotData[0]['account_number']}</p>
                            </Col>
                            <Col style={{display: 'flex', width: '100%'}}>
                                <p>Last Price on {priceData['date']}</p>
                                <p style={{position: 'absolute', right: '0px'}}>{Math.round(priceData['price'] * 100) / 100}</p>
                            </Col>
                        </Col>
                    </Row>
                </Card.Body>

            </Card>
        </Row>
    );
};

export default RobotDetails;