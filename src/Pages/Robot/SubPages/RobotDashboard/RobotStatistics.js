import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Table from "react-bootstrap/Table";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";

// Context
import DateContext from "../../../../context/date-context";
import robotContext from "../../../../context/robot-context";
import serverContext from "../../../../context/server-context";

import PieChartFull from "../../../../components/Charts/PieChartFull";
import BarCharting from "../../../../components/Charts/BarCharting";

//CSS
import './RobotStatistics.css'

const RobotStatistics = (props) => {
    const [transactionData, setTransactionData] = useState([]);

    useEffect(() => {
            axios.get(props.server + 'robots/trades/', {
                params: {
                    robot: props.robot,
                    start_date: props.startDate,
                    end_date: props.endDate,
                }
            })
                .then(data => setTransactionData(data['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    let totalNumberOfTrades = transactionData.length;
    let totalNumberOfShortTradesList = [];
    let totalNumberOfLongTradesList = [];
    let winningLongTrades = [];
    let losingLongTrades = [];
    let winningShortTrades = [];
    let losingShortTrades = [];
    let winningTradesList = [];
    let losingTradesList = [];
    let totalWinner = 0;
    let totalLoser = 0;
    let totalLongWinner = 0;
    let totalShortWinner = 0;
    let totalLongLoser = 0;
    let totalShortLoser = 0;
    let totalPnl = 0;

    for (let i = 0; i < transactionData.length; i++) {
        totalPnl+=transactionData[i]['pnl'];
    };

    for (const val of transactionData) {
        if (val['quantity'] < 0){
            totalNumberOfShortTradesList.push(val['quantity']);
            if (val['pnl'] < 0){
                losingShortTrades.push(val['pnl']);
            }else{
                winningShortTrades.push(val['pnl']);
            };
        }else{
            totalNumberOfLongTradesList.push(val['quantity']);
            if (val['pnl'] < 0){
                losingLongTrades.push(val['pnl']);
            }else{
                winningLongTrades.push(val['pnl']);
            };
        };
        if (val['pnl'] < 0){
            losingTradesList.push(val['pnl']);
        }else{
            winningTradesList.push(val['pnl']);
        };
    };

    for (let i = 0; i < losingTradesList.length; i++) {
        totalLoser+=losingTradesList[i];
    };

    for (let i = 0; i < winningTradesList.length; i++) {
        totalWinner+=winningTradesList[i];
    };
    for (let i = 0; i < winningLongTrades.length; i++) {
        totalLongWinner+=winningLongTrades[i];
    };
    for (let i = 0; i < winningShortTrades.length; i++) {
        totalShortWinner+=winningShortTrades[i];
    };
    for (let i = 0; i < losingLongTrades.length; i++) {
        totalLongLoser+=losingLongTrades[i];
    };
    for (let i = 0; i < losingShortTrades.length; i++) {
        totalShortLoser+=losingShortTrades[i];
    };
    const avgLosingTrade = Math.round(((totalLoser / losingTradesList.length)) * 100) / 100
    const avgWinningTrade = Math.round(((totalWinner / winningTradesList.length)) * 100) / 100
    const winRatio = Math.round(((winningTradesList.length / transactionData.length)) * 10000) / 100
    const lossRatio = Math.round(((losingTradesList.length / transactionData.length)) * 10000) / 100


    return (
        <Row style={{height: '100%'}}>
            <Col style={{height: '100%', width: '50%'}}>
                <Row>
                    <PieChartFull data={[winRatio, lossRatio]}/>
                </Row>
                <Row>
                    <Card>
                        <Card.Body>
                            <Card.Title>Profit</Card.Title>
                            <Card.Text className={'card-text'}>
                                {Math.round(totalPnl * 100) / 100}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
                <Row>
                    <Card style={{height: '100%'}}>
                        <Card.Body>
                            <Card.Title>Profit Factor</Card.Title>
                            <Card.Text className={'card-text'}>
                                {Math.round((winRatio * avgWinningTrade) / (lossRatio * avgLosingTrade * -1) * 100) / 100}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
            <Col style={{height: '100%', width: '50%'}}>
                <Row>
                    <BarCharting horizontal={false} data={[avgWinningTrade, avgLosingTrade]}
                             title={'Avg Winning & Loosing '}/>
                </Row>
                <Row>
                    <Card>
                    <Card.Body>
                        <Card.Title>Payoff Ratio</Card.Title>
                        <Card.Text className={'card-text'}>
                            {Math.round((avgWinningTrade / (avgLosingTrade * -1)) * 100) / 100}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Row>
                <Row>
                    <Card>
                    <Card.Body>
                        <Card.Title>Total Trades</Card.Title>
                        <Card.Text className={'card-text'}>
                            {totalNumberOfTrades}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Row>
            </Col>
        </Row>
    );
};
export default RobotStatistics;



            {/*            <tbody style={{height: '100%', overflow: 'scroll'}}>*/}
            {/*            <tr key={0}>*/}
            {/*                <td className={'table-row-text'}>{'Profit'}</td>*/}
            {/*                <td className={'table-row'} style={{*/}
            {/*                    color: totalPnl > 0 ? 'green' : 'red'*/}
            {/*                }}>{Math.round(totalPnl * 100) / 100}</td>*/}
            {/*                <td className={'table-row'} style={{*/}
            {/*                    color: totalLongWinner + totalLongLoser > 0 ? 'green' : 'red'*/}
            {/*                }}>{Math.round((totalLongWinner + totalLongLoser) * 100) / 100}</td>*/}
            {/*                <td className={'table-row'} style={{*/}
            {/*                    color: totalShortWinner + totalShortLoser > 0 ? 'green' : 'red'*/}
            {/*                }}>{Math.round((totalShortWinner + totalShortLoser) * 100) / 100}</td>*/}
            {/*            </tr>*/}
            {/*            <tr key={2}>*/}
            {/*                <td className={'table-row-text'}>{'Number Winning Trades'}</td>*/}
            {/*                <td className={'table-row'}>{winningTradesList.length}</td>*/}
            {/*                <td className={'table-row'}>{winningLongTrades.length}</td>*/}
            {/*                <td className={'table-row'}>{winningShortTrades.length}</td>*/}
            {/*            </tr>*/}
            {/*            <tr key={3}>*/}
            {/*                <td className={'table-row-text'}>{'Number Losing Trades'}</td>*/}
            {/*                <td className={'table-row'}>{losingTradesList.length}</td>*/}
            {/*                <td className={'table-row'}>{losingLongTrades.length}</td>*/}
            {/*                <td className={'table-row'}>{losingShortTrades.length}</td>*/}
            {/*            </tr>*/}
            {/*            <tr key={4}>*/}
            {/*                <td className={'table-row-text'}>{'Profitable P&L'}</td>*/}
            {/*                <td className={'table-row'} style={{*/}
            {/*                    color: totalWinner > 0 ? 'green' : 'red'*/}
            {/*                }}>{Math.round(totalWinner * 100) / 100}</td>*/}
            {/*                <td className={'table-row'}>{Math.round(totalLongWinner * 100) / 100}</td>*/}
            {/*                <td className={'table-row'}>{Math.round(totalShortWinner * 100) / 100}</td>*/}
            {/*            </tr>*/}
            {/*            <tr key={5}>*/}
            {/*                <td className={'table-row-text'}>{'Losing P&L'}</td>*/}
            {/*                <td className={'table-row'} style={{*/}
            {/*                    color: totalLoser > 0 ? 'green' : 'red'*/}
            {/*                }}>{Math.round(totalLoser * 100) / 100}</td>*/}
            {/*                <td className={'table-row'}>{Math.round(totalLongLoser * 100) / 100}</td>*/}
            {/*                <td className={'table-row'}>{Math.round(totalShortLoser * 100) / 100}</td>*/}
            {/*            </tr>*/}
            {/*
            {/*            <tr key={10}>*/}
            {/*                <td className={'table-row-text'}>{'Profit Factor'}</td>*/}
            {/*                <td className={'table-row'}>{Math.round((winRatio*avgWinningTrade)/(lossRatio*avgLosingTrade*-1)*100)/100}</td>*/}
            {/*                <td className={'table-row'}>{'-'}</td>*/}
            {/*                <td className={'table-row'}>{'-'}</td>*/}
            {/*            </tr>*/}
            {/*            <tr key={11}>*/}
            {/*                <td className={'table-row-text'}>{'Payoff Ratio'}</td>*/}
            {/*                <td className={'table-row'}>{Math.round((avgWinningTrade/(avgLosingTrade*-1))*100)/100}</td>*/}
            {/*                <td className={'table-row'}>{'-'}</td>*/}
            {/*                <td style={{fontSize: 12, verticalAlign: "middle"}}>{'-'}</td>*/}
            {/*            </tr>*/}
            {/*            </tbody>*/}
            {/*        </Table>*/}
            {/*    </div>*/}
            {/*</Card>*/}