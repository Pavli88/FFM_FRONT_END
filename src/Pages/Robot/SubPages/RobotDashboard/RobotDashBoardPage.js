import CardWidgetMiddle from "../../../../components/CardWidgetMiddle";
import LineCharts from "../../../../components/Charts/LineCharts";
import RobotCashFlowTable from "./RobotCashFlowTable";
import RobotStatistics from "./RobotStatistics";
import RobotCashFlowChart from "./RobotCashFlowChart";
import RobotGeneralInformation from "./RobotGeneralInformation";
import RobotDrawDown from "../RobotRisk/RobotDrawDown";
import RobotReturn from "../RobotReturn/RobotReturn";
import RobotDailyReturns from "../RobotReturn/RobotDailyReturns";
import RobotMonthlyReturns from "../RobotReturn/RobotMonthlyReturns";
import RobotBalance from "./RobotBalance";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";

import {useContext, useEffect, useState} from "react";
import axios from "axios";
import DateContext from "../../../../context/date-context";
import Card from "react-bootstrap/Card";

//CSS
import './RobotDashBoardPage.css'

const RobotDashBoardPage = (props) => {
    const [balanceData, setBalanceData] = useState([]);
    const [cashFlowData, setCashFlowData] = useState([]);
    const totalCashFlow = Math.round(cashFlowData.reduce((a, b) => a + b, 0) * 100) / 100
    const dailyReturns = balanceData.map((data) => Math.round(data['ret']*10000)/100);
    const balances = balanceData.map((data) => data['close_balance']);
    const lastBalance = balances[balances.length-1];
    console.log(balanceData)
    useEffect(() => {
            axios.get(props.server + 'robots/get/balance/', {
                params: {
                    id: props.robotData['id'],
                    start_date: props.startDate,
                }
            })
                .then(response => setBalanceData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Container style={{height:'90%'}} fluid>
            <Row style={{height: '100%', width:'100%', margin:'5px'}}>
                <Col style={{height: '90%'}}>
                    <Row style={{height: '50%', margin: '0px', padding: '20px'}}>
                        {/*<RobotGeneralInformation/>*/}
                    </Row>
                    <Row style={{height: '50%'}}>
                        <Col style={{height: '100%'}}>
                            <RobotBalance robot={props.robot} server={props.server} startDate={props.startDate}
                                          endDate={props.endDate} data={balances} lastBalance={lastBalance}/>
                        </Col>
                        <Col style={{height: '100%'}}>
                            {/*<RobotCashFlowChart robot={props.robot} server={props.server}/>*/}
                        </Col>
                    </Row>
                </Col>
                <Col style={{height: '90%'}} >
                    <Row style={{height: '50%'}}>
                        {/*<RobotStatistics robot={props.robot} server={props.server} startDate={props.startDate} endDate={props.endDate}/>*/}
                    </Row>
                    <Row style={{height: '50%'}}>
                        {/*<RobotMonthlyReturns robot={props.robot} server={props.server}/>*/}
                    </Row>
                    {/*<Row style={{height: '50%'}}>*/}

                    {/*</Row>*/}
                </Col>
                <Col style={{height: '90%'}} >
                    <Row style={{height:'33%'}}>
                        {/*<RobotReturn robot={props.robot} start_date={props.startDate} end_date={props.endDate}*/}
                        {/*             server={props.server}/>*/}
                    </Row>
                    <Row style={{height:'33%'}}>
                        {/*<RobotDailyReturns robot={props.robot} start_date={props.startDate} end_date={props.endDate}*/}
                        {/*                   server={props.server} data={dailyReturns}/>*/}
                    </Row>
                    <Row style={{height:'33%'}}>
                        {/*<RobotDrawDown robot={props.robot} server={props.server} startDate={props.startDate} endDate={props.endDate}/>*/}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default RobotDashBoardPage;
