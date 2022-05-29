import CardWidgetMiddle from "../../../../components/CardWidgetMiddle";
import LineCharts from "../../../../components/Charts/LineCharts";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";

import {useContext, useEffect, useState} from "react";
import axios from "axios";
import DateContext from "../../../../context/date-context";

const RobotDashBoardPage = (props) => {
    const startDate = useContext(DateContext)['startDate'];
    const endDate = useContext(DateContext)['endDate'];
    const [balanceData, setBalanceData] = useState([]);
    const [pnlData, setPnlData] = useState([]);
    const [dateData, setDateData] = useState([]);
    const [robotData, setRobotData] = useState([props.default]);
    const [priceData, setPriceData] = useState([]);

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

    // console.log(chartData)
    useEffect(() => {
            axios.get(props.server + 'robots/get_balance/', {
                params: {
                    robot: props.robot,
                    start_date: startDate,
                    end_date: endDate,
                }
            })
                .then(function(response){
                    const data = response['data'];
                    const balance_list = data.map(data => data['close_balance']);
                    const pnl_list = data.map(data => data['realized_pnl']);
                    const date_list = data.map(data => data['date']);

                    setBalanceData(balance_list);
                    setPnlData(pnl_list);
                    setDateData(date_list);
                })
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    console.log(pnlData)
    return (
        <Container fluid>
            <Row style={{height:'100px'}}>
                <Col style={{height:'100%'}}>
                    <CardWidgetMiddle title={'Strategy'}>
                        <p style={{margin:'auto', verticalAlign:'middle', fontSize:20}}>{robotData[0]['strategy']}</p>
                    </CardWidgetMiddle>
                </Col>
                <Col style={{height:'100%'}}>
                    <CardWidgetMiddle title={'Security'}>
                        <p style={{margin:'auto', verticalAlign:'middle', fontSize:20}}>{robotData[0]['security']}</p>
                    </CardWidgetMiddle>
                </Col>
                <Col style={{height:'100%'}}>
                    <CardWidgetMiddle title={'Inception Date'}>
                        <p style={{margin:'auto', verticalAlign:'middle', fontSize:20}}>{robotData[0]['inception_date']}</p>
                    </CardWidgetMiddle>
                </Col>
                <Col style={{height:'100%'}}>
                    <CardWidgetMiddle title={'Broker'}>
                        <p style={{margin:'auto', verticalAlign:'middle', fontSize:20}}>{robotData[0]['broker']}</p>
                    </CardWidgetMiddle>
                </Col>
                <Col style={{height:'100%'}}>
                    <CardWidgetMiddle title={'Account Number'}>
                        <p style={{margin:'auto', verticalAlign:'middle', fontSize:20}}>{robotData[0]['account_number']}</p>
                    </CardWidgetMiddle>
                </Col>
                <Col style={{height:'100%'}}>
                    <CardWidgetMiddle title={'Last Price'}>
                        <p style={{margin:'auto', verticalAlign:'middle', fontSize:20}}>{Math.round(priceData['price'] * 100) / 100}</p>
                    </CardWidgetMiddle>
                </Col>
                <Col style={{height:'100%'}}>
                    <CardWidgetMiddle title={'Last Pricing Date'}>
                        <p style={{margin:'auto', verticalAlign:'middle', fontSize:20, color: priceData['date'] < endDate ? 'red': 'green'}}>{priceData['date']}</p>
                    </CardWidgetMiddle>
                </Col>
            </Row>
            <Row style={{height:'400px', marginTop:'15px'}}>
                <Col sm={8} style={{height:'100%'}}>
                    <LineCharts data={balanceData} title={'Balance History'}/>
                </Col>
                <Col sm={4}>
                    <CardWidgetMiddle>

                    </CardWidgetMiddle>
                </Col>
            </Row>
            <Row style={{height:'200px',marginTop:'15px'}}>
                <Col style={{height:'100%'}}>
                    <CardWidgetMiddle title={'Last Balance'}>
                        <p style={{margin:'auto', verticalAlign:'middle', fontSize:40}}>{200}</p>
                    </CardWidgetMiddle>
                </Col>
                <Col>
                    <CardWidgetMiddle title={'Total Profit'}>

                    </CardWidgetMiddle>
                </Col>
                <Col>
                    <CardWidgetMiddle title={'Total CashFlow'}>

                    </CardWidgetMiddle>
                </Col>
            </Row>
        </Container>

    );
};

export default RobotDashBoardPage;
