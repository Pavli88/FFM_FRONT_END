import CardWidgetMiddle from "../../../../components/CardWidgetMiddle";
import LineCharts from "../../../../components/Charts/LineCharts";
import RobotCashFlowTable from "./RobotCashFlowTable";
import RobotStatistics from "./RobotStatistics";
import RobotCashFlowChart from "./RobotCashFlowChart";
import RobotGeneralInformation from "./RobotGeneralInformation";
import RobotDrawDown from "../RobotRisk/RobotDrawDown";
import RobotReturn from "../RobotReturn/RobotReturn";
import RobotDailyReturns from "../RobotReturn/RobotDailyReturns";
import RobotBalance from "./RobotBalance";
import MonthlyReturnsChart from "../../../../components/Charts/MonthlyReturnsChart";

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
import serverContext from "../../../../context/server-context";


const RobotDashBoardPage = (props) => {
    const startDate = useContext(DateContext)['startDate'];
    const server = useContext(serverContext)['server'];
    const [balanceData, setBalanceData] = useState([]);
    const [cashFlowData, setCashFlowData] = useState([]);
    const totalCashFlow = Math.round(cashFlowData.reduce((a, b) => a + b, 0) * 100) / 100
    const dailyReturns = balanceData.map((data) => Math.round(data['ret']*10000)/100);
    const balances = balanceData.map((data) => data['close_balance']);
    const lastBalance = balances[balances.length-1];

    const [monthlyReturnData, setMonthlyReturnData] = useState([]);
    const monthlyReturns = monthlyReturnData.map((data) => data['ret']*100);
    const monthlyReturnDates = monthlyReturnData.map((data) => data['date']);

    useEffect(() => {
            axios.get(server + 'robots/get/monthly_returns/', {
                params: {
                    robot_id: props.robotData['id'],
                    date: startDate.slice(0, 7)
                }
            })
                .then(response => setMonthlyReturnData(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [ ,props.robotData, startDate]
    );

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
        <Container style={{height:'100%', padding:'0px'}} fluid>
            <RobotStatistics robot={props.robotData} server={props.server}
                             startDate={props.startDate}
                             endDate={props.endDate}/>
            <Row style={{height: '100%', width: '100%', margin: '5px'}}>
                <Col style={{height: '100%', paddingLeft: '0px'}} sm={8}>
                    <Row style={{height: '300px', padding: '0px'}}>
                        <Col style={{width: '50%', height: '100%', paddingLeft: '0px'}}>
                            <RobotGeneralInformation/>
                        </Col>
                        <Col style={{height: '100%', paddingRight: '0px'}}>
                            <RobotDailyReturns data={dailyReturns}/>
                        </Col>
                    </Row>
                    <Row style={{height: '300px', padding: '0px'}}>
                        <Col style={{height: '100%', paddingLeft: '0px'}}>
                            <RobotBalance data={balances} lastBalance={lastBalance}/>
                        </Col>
                        <Col style={{height: '100%', paddingRight: '0px'}}>
                            <RobotDrawDown robotData={props.robotData} server={props.server} startDate={props.startDate}
                                       endDate={props.endDate}/>
                        </Col>
                    </Row>
                    {/*    /!*<Col style={{height: '100%'}}>*!/*/}
                    {/*        /!*<RobotCashFlowChart robot={props.robot} server={props.server}/>*!/*/}
                    {/*    /!*</Col>*!/*/}
                    {/*</Row>*/}
                </Col>
                <Col style={{height: '100%', paddingRight:'0px'}} sm={4}>
                    <Row style={{height: '300px'}}>
                        <MonthlyReturnsChart returns={monthlyReturns} dates={monthlyReturnDates}/>
                    </Row>
                    <Row style={{height: '300px'}}>
                        <RobotReturn robot={props.robot} start_date={props.startDate} end_date={props.endDate}
                                         server={props.server}/>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default RobotDashBoardPage;
