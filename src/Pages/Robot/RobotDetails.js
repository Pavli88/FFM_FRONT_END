import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import "../MainCSS.css"
import {useEffect, useState} from "react";
import axios from "axios";

const RobotDetails = (props) => {

    const [robotData, setRobotData] = useState([]);

    console.log(robotData)
    console.log(props.robot)

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
                            <p>Name</p>
                            <p style={{position: 'absolute', right:'0px'}}>Test</p>
                        </div>
                        <div style={{ display:'flex', width:'100%'}}>
                            <p>Strategy</p>
                            <p style={{position: 'absolute', right:'0px'}}>Test</p>
                        </div>
                        <div style={{ display:'flex', width:'100%'}}>
                            <p>Security</p>
                            <p style={{position: 'absolute', right:'0px'}}>Test</p>
                        </div>
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Card.Body>

        </Card>
    );
};

export default RobotDetails;