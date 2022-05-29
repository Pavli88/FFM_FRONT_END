import CardWidget from "../../../components/CardWidget";
import PieCharts from "../../../components/Charts/PieCharts";

// Bootstrap imports
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from "react";
import axios from "axios";

const BalanceDashBoard = (props) => {
    const [chData, setChData] =  useState([])//balanceData.map(data=>data['y'])
    const [labelData, setLabelData] =  useState([])//balanceData.map(data=>data['x'])
    const totalBalance = chData.reduce((a, b) => a + b, 0)

    useEffect(() => {
            axios.get(props.server + 'home/total_robot_balances_by_date/',)
                .then(function (response) {
                    setChData(response['data'].map(item => item['y']));
                    setLabelData(response['data'].map(item => item['x']))
                })
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Row style={{height: '300px', width: '100%', margin: '0px', padding: '0px'}}>
            <Col style={{height: '100%'}}>
                <CardWidget title={'Total Balance'}>
                    <h1 style={{margin:'auto', verticalAlign:'middle'}}>{Math.round(totalBalance * 100)/100}</h1>
                </CardWidget>
            </Col>
            <Col style={{height: '100%'}}>
                <PieCharts title={'Balance by Robots'} data={chData} labels={labelData}/>
            </Col>
        </Row>
    );
};

export default BalanceDashBoard;