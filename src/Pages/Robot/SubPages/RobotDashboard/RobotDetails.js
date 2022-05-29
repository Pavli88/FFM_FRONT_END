import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import "../../../MainCSS.css"
import {useEffect, useState} from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import CardWidgetMiddle from "../../../../components/CardWidgetMiddle";

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
        <Row style={{height: '100px'}}>
            <Col style={{height: '100%'}}>
                <CardWidgetMiddle title={'Strategy'}>
                    <p style={{margin: 'auto', verticalAlign: 'middle', fontSize: 20}}>{robotData[0]['strategy']}</p>
                </CardWidgetMiddle>
            </Col>
            <Col style={{height: '100%'}}>
                <CardWidgetMiddle title={'Security'}>
                    <p style={{margin: 'auto', verticalAlign: 'middle', fontSize: 20}}>{robotData[0]['security']}</p>
                </CardWidgetMiddle>
            </Col>
            <Col style={{height: '100%'}}>
                <CardWidgetMiddle title={'Inception Date'}>
                    <p style={{
                        margin: 'auto',
                        verticalAlign: 'middle',
                        fontSize: 20
                    }}>{robotData[0]['inception_date']}</p>
                </CardWidgetMiddle>
            </Col>
            <Col style={{height: '100%'}}>
                <CardWidgetMiddle title={'Broker'}>
                    <p style={{margin: 'auto', verticalAlign: 'middle', fontSize: 20}}>{robotData[0]['broker']}</p>
                </CardWidgetMiddle>
            </Col>
            <Col style={{height: '100%'}}>
                <CardWidgetMiddle title={'Account Number'}>
                    <p style={{
                        margin: 'auto',
                        verticalAlign: 'middle',
                        fontSize: 20
                    }}>{robotData[0]['account_number']}</p>
                </CardWidgetMiddle>
            </Col>
            <Col style={{height: '100%'}}>
                <CardWidgetMiddle title={'Last Price'}>
                    <p style={{
                        margin: 'auto',
                        verticalAlign: 'middle',
                        fontSize: 20
                    }}>{Math.round(priceData['price'] * 100) / 100}</p>
                </CardWidgetMiddle>
            </Col>
            <Col style={{height: '100%'}}>
                <CardWidgetMiddle title={'Last Pricing Date'}>
                    <p style={{
                        margin: 'auto',
                        verticalAlign: 'middle',
                        fontSize: 20,
                        color: priceData['date'] < endDate ? 'red' : 'green'
                    }}>{priceData['date']}</p>
                </CardWidgetMiddle>
            </Col>
        </Row>
    );
};

export default RobotDetails;