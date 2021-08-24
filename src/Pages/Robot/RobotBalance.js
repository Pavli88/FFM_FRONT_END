import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';

import "../MainCSS.css"
import {useEffect, useState} from "react";
import axios from "axios";
import Chart from "react-apexcharts";

import BalanceChart from "./Charts/BalanceChart";
import DailyPnlChart from "./Charts/DailyPnlChart";
import RobotCashFlow from "./RobotCashFlow";

const RobotBalance = (props) => {

    const [balanceData, setBalanceData] = useState([]);
    const [cashflowData, setCashFlowData] = useState([]);
    const [pnlData, setPnlData] = useState([]);
    const [dateData, setDateData] = useState([]);

    // console.log(chartData)
    useEffect(() => {
            axios.get(props.server + 'robots/get_balance/', {
                params: {
                    robot: props.robot,
                    start_date: props.start_date,
                    end_date: props.end_date,
                }
            })
                .then(function(response){
                    const data = response['data'];
                    const balance_list = data.map(data => data['close_balance']);
                    const cf_list = data.map(data => data['cash_flow']);
                    const pnl_list = data.map(data => data['realized_pnl']);
                    const date_list = data.map(data => data['date']);

                    setBalanceData(balance_list);
                    setCashFlowData(cf_list);
                    setPnlData(pnl_list);
                    setDateData(date_list);
                })
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    const balanceChartTitle='Latest calculated balance on ' + dateData[dateData.length - 1] + ' was ' + balanceData[balanceData.length - 1]

    return (
        <Row style={{height: '300px', padding:'5px', margin:'5px', display: 'flex'}}>
            <Col xs={6} md={4} style={{height:'100%', paddingLeft:'0px'}}>
               <BalanceChart data={balanceData} title={balanceChartTitle}/>
                    {/*<Card.Title*/}
                    {/*    className="card-header-first">Latest calculated balance on {dateData[dateData.length - 1]} is {balanceData[balanceData.length - 1]}</Card.Title>*/}
            </Col>
            <Col xs={6} md={4} style={{height:'100%'}}>
                <DailyPnlChart data={pnlData}/>
            </Col>
            <Col xs={6} md={4} style={{height:'100%', paddingRight:'0px'}}>
                <RobotCashFlow data={cashflowData}/>
            </Col>
        </Row>
    );
};

export default RobotBalance;
