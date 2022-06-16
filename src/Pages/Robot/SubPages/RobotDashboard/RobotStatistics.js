import Card from "react-bootstrap/Card";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Table from "react-bootstrap/Table";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import DateContext from "../../../../context/date-context";

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
        <Card className="card" style={{margin: '2px', height: '100%'}}>
                <Card.Title className="card-header-first">Statistics</Card.Title>
                <div style={{overflowY: 'scroll', overflowX: 'hidden', height:'100%'}}>
                    <Table id={'cash-flow-table'}>
                        <thead style={{fontSize: 12}}>
                        <tr>
                            <th style={{verticalAlign: "middle"}}></th>
                            <th style={{verticalAlign: "middle"}}>All</th>
                            <th style={{verticalAlign: "middle"}}>Long</th>
                            <th style={{verticalAlign: "middle"}}>Short</th>
                        </tr>
                        </thead>
                        <tbody style={{height: '100%', overflow: 'scroll'}}>
                        <tr key={0}>
                            <td style={{fontSize: 12, verticalAlign: "middle", textAlign:'left'}}>{'Profit'}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle", color: totalPnl > 0 ? 'green' : 'red'}}>{Math.round(totalPnl*100)/100}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle", color: totalLongWinner+totalLongLoser > 0 ? 'green' : 'red'}}>{Math.round((totalLongWinner+totalLongLoser)*100)/100}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle", color: totalShortWinner+totalShortLoser > 0 ? 'green' : 'red'}}>{Math.round((totalShortWinner+totalShortLoser)*100)/100}</td>
                        </tr>
                        <tr key={1}>
                            <td style={{fontSize: 12, verticalAlign: "middle", textAlign:'left'}}>{'Total Trades Closed'}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{totalNumberOfTrades}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{totalNumberOfLongTradesList.length}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{totalNumberOfShortTradesList.length}</td>
                        </tr>
                        <tr key={2}>
                            <td style={{fontSize: 12, verticalAlign: "middle", textAlign:'left'}}>{'Number Winning Trades'}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{winningTradesList.length}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{winningLongTrades.length}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{winningShortTrades.length}</td>
                        </tr>
                        <tr key={3}>
                            <td style={{fontSize: 12, verticalAlign: "middle", textAlign:'left'}}>{'Number Losing Trades'}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{losingTradesList.length}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{losingLongTrades.length}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{losingShortTrades.length}</td>
                        </tr>
                        <tr key={4}>
                            <td style={{fontSize: 12, verticalAlign: "middle", textAlign:'left'}}>{'Profitable P&L'}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle", color: totalWinner > 0 ? 'green' : 'red'}}>{Math.round(totalWinner*100)/100}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{Math.round(totalLongWinner*100)/100}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{Math.round(totalShortWinner*100)/100}</td>
                        </tr>
                        <tr key={5}>
                            <td style={{fontSize: 12, verticalAlign: "middle", textAlign:'left'}}>{'Losing P&L'}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle", color: totalLoser > 0 ? 'green' : 'red'}}>{Math.round(totalLoser*100)/100}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{Math.round(totalLongLoser*100)/100}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{Math.round(totalShortLoser*100)/100}</td>
                        </tr>
                        <tr key={6}>
                            <td style={{fontSize: 12, verticalAlign: "middle", textAlign:'left'}}>{'Profitable Trades %'}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{Math.round(((winningTradesList.length/transactionData.length))*10000)/100}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{Math.round(((winningLongTrades.length/transactionData.length))*10000)/100}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{Math.round(((winningShortTrades.length/transactionData.length))*10000)/100}</td>
                        </tr>
                        <tr key={7}>
                            <td style={{fontSize: 12, verticalAlign: "middle", textAlign:'left'}}>{'Losing Trades %'}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{Math.round(((losingTradesList.length/transactionData.length))*10000)/100}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{Math.round(((losingLongTrades.length/transactionData.length))*10000)/100}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{Math.round(((losingShortTrades.length/transactionData.length))*10000)/100}</td>
                        </tr>
                        <tr key={8}>
                            <td style={{fontSize: 12, verticalAlign: "middle", textAlign:'left'}}>{'Avg Winning Trade'}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{Math.round(((totalWinner/totalNumberOfTrades))*100)/100}</td>
                            <td style={{
                                fontSize: 12,
                                verticalAlign: "middle"
                            }}>{Math.round(((totalLongWinner/totalNumberOfTrades))*100)/100}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{Math.round(((totalShortWinner/totalNumberOfTrades))*100)/100}</td>
                        </tr>
                        <tr key={9}>
                            <td style={{fontSize: 12, verticalAlign: "middle", textAlign:'left'}}>{'Avg Losing Trade'}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{Math.round(((totalLoser/totalNumberOfTrades))*100)/100}</td>
                            <td style={{
                                fontSize: 12,
                                verticalAlign: "middle"
                            }}>{Math.round(((totalLongLoser/totalNumberOfTrades))*100)/100}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{Math.round(((totalShortLoser/totalNumberOfTrades))*100)/100}</td>
                        </tr>
                        <tr key={10}>
                            <td style={{fontSize: 12, verticalAlign: "middle", textAlign:'left'}}>{'Profit Factor'}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{1}</td>
                            <td style={{
                                fontSize: 12,
                                verticalAlign: "middle",
                                color: 10 > 0 ? 'green' : 'red'
                            }}>{10}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{10}</td>
                        </tr>
                        <tr key={11}>
                            <td style={{fontSize: 12, verticalAlign: "middle", textAlign:'left'}}>{'Profit Factor'}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{1}</td>
                            <td style={{
                                fontSize: 12,
                                verticalAlign: "middle",
                                color: 10 > 0 ? 'green' : 'red'
                            }}>{10}</td>
                            <td style={{fontSize: 12, verticalAlign: "middle"}}>{10}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </Card>
    );
};
export default RobotStatistics;