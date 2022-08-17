import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Table from "react-bootstrap/Table";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import DateContext from "../../../../context/date-context";

import PieChartFull from "../../../../components/Charts/PieChartFull";

//CSS
import './RobotStatistics.css'

const RobotStatistics = (props) => {
    const [transactionData, setTransactionData] = useState([]);
    const startDate = useContext(DateContext)['startDate'];
    const endDate = useContext(DateContext)['endDate'];

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

    // console.log(totalPnl)
    // console.log(totalNumberOfShortTradesList)
    // console.log(losingTradesList)
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

    useEffect(() => {
            axios.get(props.server + 'robots/trades/', {
                params: {
                    robot: props.robot,
                    start_date: startDate,
                    end_date: endDate,
                }
            })
                .then(data => setTransactionData(data['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    return (
        <Col style={{height:'100%'}}>
            <Card className="card" style={{margin: '0px', height: '100%'}}>
                <Card.Title className="card-header-first">Transaction Statistics</Card.Title>
                <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '100%'}}>
                    <Table id={'cash-flow-table'}>
                        <thead>
                        <tr>
                            <th className={'table-header'}></th>
                            <th className={'table-header'}>All</th>
                            <th className={'table-header'}>Long</th>
                            <th className={'table-header'}>Short</th>
                        </tr>
                        </thead>
                        <tbody style={{height: '100%', overflow: 'scroll'}}>
                        <tr key={0}>
                            <td className={'table-row-text'}>{'Profit'}</td>
                            <td className={'table-row'} style={{
                                color: totalPnl > 0 ? 'green' : 'red'
                            }}>{Math.round(totalPnl * 100) / 100}</td>
                            <td className={'table-row'} style={{
                                color: totalLongWinner + totalLongLoser > 0 ? 'green' : 'red'
                            }}>{Math.round((totalLongWinner + totalLongLoser) * 100) / 100}</td>
                            <td className={'table-row'} style={{
                                color: totalShortWinner + totalShortLoser > 0 ? 'green' : 'red'
                            }}>{Math.round((totalShortWinner + totalShortLoser) * 100) / 100}</td>
                        </tr>
                        <tr key={2}>
                            <td className={'table-row-text'}>{'Number Winning Trades'}</td>
                            <td className={'table-row'}>{winningTradesList.length}</td>
                            <td className={'table-row'}>{winningLongTrades.length}</td>
                            <td className={'table-row'}>{winningShortTrades.length}</td>
                        </tr>
                        <tr key={3}>
                            <td className={'table-row-text'}>{'Number Losing Trades'}</td>
                            <td className={'table-row'}>{losingTradesList.length}</td>
                            <td className={'table-row'}>{losingLongTrades.length}</td>
                            <td className={'table-row'}>{losingShortTrades.length}</td>
                        </tr>
                        <tr key={4}>
                            <td className={'table-row-text'}>{'Profitable P&L'}</td>
                            <td className={'table-row'} style={{
                                color: totalWinner > 0 ? 'green' : 'red'
                            }}>{Math.round(totalWinner * 100) / 100}</td>
                            <td className={'table-row'}>{Math.round(totalLongWinner * 100) / 100}</td>
                            <td className={'table-row'}>{Math.round(totalShortWinner * 100) / 100}</td>
                        </tr>
                        <tr key={5}>
                            <td className={'table-row-text'}>{'Losing P&L'}</td>
                            <td className={'table-row'} style={{
                                color: totalLoser > 0 ? 'green' : 'red'
                            }}>{Math.round(totalLoser * 100) / 100}</td>
                            <td className={'table-row'}>{Math.round(totalLongLoser * 100) / 100}</td>
                            <td className={'table-row'}>{Math.round(totalShortLoser * 100) / 100}</td>
                        </tr>
                        <tr key={6}>
                            <td className={'table-row-text'}>{'Profitable Trades %'}</td>
                            <td className={'table-row'}>{winRatio}</td>
                            <td className={'table-row'}>{Math.round(((winningLongTrades.length / transactionData.length)) * 10000) / 100}</td>
                            <td className={'table-row'}>{Math.round(((winningShortTrades.length / transactionData.length)) * 10000) / 100}</td>
                        </tr>
                        <tr key={7}>
                            <td className={'table-row-text'}>{'Losing Trades %'}</td>
                            <td className={'table-row'}>{lossRatio}</td>
                            <td className={'table-row'}>{Math.round(((losingLongTrades.length / transactionData.length)) * 10000) / 100}</td>
                            <td className={'table-row'}>{Math.round(((losingShortTrades.length / transactionData.length)) * 10000) / 100}</td>
                        </tr>
                        <tr key={8}>
                            <td className={'table-row-text'}>{'Avg Winning Trade'}</td>
                            <td className={'table-row'}>{avgWinningTrade}</td>
                            <td className={'table-row'}>{Math.round(((totalLongWinner / totalNumberOfLongTradesList.length)) * 100) / 100}</td>
                            <td className={'table-row'}>{Math.round(((totalShortWinner / totalNumberOfShortTradesList.length)) * 100) / 100}</td>
                        </tr>
                        <tr key={9}>
                            <td className={'table-row-text'}>{'Avg Losing Trade'}</td>
                            <td className={'table-row'}>{avgLosingTrade}</td>
                            <td className={'table-row'}>{Math.round(((totalLongLoser / totalNumberOfTrades)) * 100) / 100}</td>
                            <td className={'table-row'}>{Math.round(((totalShortLoser / totalNumberOfTrades)) * 100) / 100}</td>
                        </tr>
                        <tr key={10}>
                            <td className={'table-row-text'}>{'Profit Factor'}</td>
                            <td className={'table-row'}>{Math.round((winRatio*avgWinningTrade)/(lossRatio*avgLosingTrade*-1)*100)/100}</td>
                            <td className={'table-row'}>{'-'}</td>
                            <td className={'table-row'}>{'-'}</td>
                        </tr>
                        <tr key={11}>
                            <td className={'table-row-text'}>{'Payoff Ratio'}</td>
                            <td className={'table-row'}>{Math.round((avgWinningTrade/(avgLosingTrade*-1))*100)/100}</td>
                            <td className={'table-row'}>{'-'}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{'-'}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </Card>
        </Col>
    );
};
export default RobotStatistics;