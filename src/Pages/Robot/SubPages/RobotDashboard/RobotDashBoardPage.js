import CardWidgetMiddle from "../../../../components/CardWidgetMiddle";
import LineCharts from "../../../../components/Charts/LineCharts";
import RobotCashFlowTable from "./RobotCashFlowTable";
import RobotStatistics from "./RobotStatistics";
import RobotCashFlowChart from "./RobotCashFlowChart";
import RobotGeneralInformation from "./RobotGeneralInformation";
import RobotDrawDown from "../RobotRisk/RobotDrawDown";
import RobotReturn from "../RobotReturn/RobotReturn";

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
    const startDate = useContext(DateContext)['startDate'];
    const endDate = useContext(DateContext)['endDate'];
    const [balanceData, setBalanceData] = useState([]);
    const [pnlData, setPnlData] = useState([]);
    const [cashFlowData, setCashFlowData] = useState([]);
    const [dateData, setDateData] = useState([]);
    const [robotData, setRobotData] = useState([props.default]);
    const [priceData, setPriceData] = useState([]);
    const totalProfit = Math.round(pnlData.reduce((a, b) => a + b, 0) * 100) / 100
    const totalCashFlow = Math.round(cashFlowData.reduce((a, b) => a + b, 0) * 100) / 100
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
                    const cashFlowList = data.map(data => data['cash_flow']);
                    setBalanceData(balance_list);
                    setPnlData(pnl_list);
                    setDateData(date_list);
                    setCashFlowData(cashFlowList);
                })
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    const balanceChartDataSet = {
        series: [
            {
                name: "Balance",
                type: 'line',
                data: balanceData,
            },
            {
                name: "Cash Flow",
                type: 'bar',
                data: cashFlowData,
            }
        ],
        yaxis: [
            {
                min: Math.min(...balanceData),
                title: {
                    text: 'Balance',
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(2);
                    }
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Cash Flow',

                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(2);
                    }
                },
            }
        ],
        title: 'Balance',
        subTitle: Math.round(balanceData[balanceData.length - 1] * 100) / 100,
        pnl: Math.round((balanceData[balanceData.length-1]-balanceData[0])*100)/100,
        perReturn: Math.round(((balanceData[balanceData.length-1]-balanceData[0]-totalCashFlow)/balanceData[0])*10000)/100,
    }

    const balanceSubtitle =
        <Card.Subtitle className="mb-2 text-muted" style={{textAlign: 'left', fontSize: 40, paddingLeft: '15px'}}>
            <div>
                <div>
                    {balanceChartDataSet.subTitle + ' USD '}
                </div>
            </div>
        </Card.Subtitle>

    const robotGeneralInformation = {
        'strategy': robotData[0]['strategy'],
        'security': robotData[0]['security'],
        'inception_date': robotData[0]['inception_date'],
        'broker': robotData[0]['broker'],
        'account_number': robotData[0]['account_number'],
        'price': Math.round(priceData['price'] * 100) / 100,
        'date': priceData['date'],
        'end_date': endDate,
    }
    return (
        <Container fluid>
            <RobotGeneralInformation data={robotGeneralInformation}/>
            <Row style={{height:'80%', marginTop:'20px'}}>
                <Col style={{height: '100%'}}>
                    <Row style={{height:'50%'}}>
                        <Col>
                            <LineCharts metaData={balanceChartDataSet} subTitle={balanceSubtitle}/>
                        </Col>
                    </Row>
                    <Row style={{height:'50%', marginTop:'20px'}}>
                        <Col>
                            <RobotCashFlowTable server={props.server} robot={props.robot}/>
                        </Col>
                    </Row>
                </Col>
                <Col style={{height:'100%'}}>
                    <Row style={{height:'20%'}}>
                        <Col>
                            <CardWidgetMiddle title={'Profit'}>
                                <p className={'card-paragraph-profit'} style={{color: totalProfit > 0 ? 'darkgreen' : 'darkred',}}>{totalProfit}</p>
                            </CardWidgetMiddle>
                        </Col>
                        <Col>
                            <CardWidgetMiddle title={'Deposit'}>
                                {/*<p className={'card-paragraph'}>{profitSubtitle}</p>*/}
                            </CardWidgetMiddle>
                        </Col>
                        <Col>
                            <CardWidgetMiddle title={'Withdraw'}>
                                {/*<p className={'card-paragraph'}>{profitSubtitle}</p>*/}
                            </CardWidgetMiddle>
                        </Col>
                    </Row>
                    <Row style={{height:'80%', marginTop:'20px'}}>
                        <RobotStatistics server={props.server} robot={props.robot}/>
                    </Row>
                </Col>
                <Col style={{height:'100%'}}>
                    <Row style={{height:'50%'}}>
                        <Col>
                            <RobotReturn robot={props.robot} start_date={startDate} end_date={endDate}
                                     server={props.server}/>
                        </Col>
                    </Row>
                    <Row style={{height:'50%', marginTop:'20px'}}>
                        <Col>
                            <RobotDrawDown robot={props.robot} server={props.server}/>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
    );
};

export default RobotDashBoardPage;
