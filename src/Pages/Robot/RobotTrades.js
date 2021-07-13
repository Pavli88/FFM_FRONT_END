import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Chart from "react-apexcharts";
import Col from 'react-bootstrap/Col';


import "../MainCSS.css"
import {useEffect, useState} from "react";
import axios from "axios";

const RobotTrades = (props) => {

    const [chartData, setChartData] = useState([]);

    console.log(chartData)

    let losingTradeNumber = 0;
    let winningTradeNumber = 0;
    let losingTrades = [];
    let winningTrades = [];

    for (const val of chartData) {
        if (val < 0) {
            losingTradeNumber=+losingTradeNumber+1;
            losingTrades.push(val);
        } else if (val > 0){
            winningTradeNumber=+winningTradeNumber+1;
            winningTrades.push(val);
        };

    };
    console.log(losingTradeNumber)
    console.log(winningTradeNumber)
    useEffect(() => {
            axios.get(props.server + 'robots/trades/'+props.robot)
                .then(response => response['data'].map(data=>data['pnl']))
                .then(data=>setChartData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );


    const chartOptions = {
        options: {
            chart: {
                toolbar: false,
                id: "basic-bar"
            },
            xaxis: {
                categories: [],
                labels: {show: false}
            },
            yaxis: [
                {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(0);
                        }
                    }
                }
            ],
            dataLabels: {
                enabled: false
            },

        },

        series: [
            {
                name: "series-1",
                data: chartData,
            }
        ]
    };

    // const a = cashFlow.map(data => data['cash_flow']);
    // console.log(a)

    return (
        <Card className="card">
            <Card.Title className="card-header-first">Trades</Card.Title>
            <Card.Body style={{padding: '0px'}}>
                <Row style={{height:'100%'}}>
                    <Col style={{height:'100%'}} sm={8}>
                        <div style={{padding: '0px', height: '100%'}}>
                            <Chart
                                options={chartOptions.options}
                                series={chartOptions.series}
                                type={'bar'}
                                width="100%"
                                height="100%"/>

                        </div>
                    </Col>
                    <Col sm={4}>
                        <h2>Statistics</h2>
                        <Row>
                            <Col>
                                <p>Total Trades</p>
                                <p>{losingTradeNumber + winningTradeNumber}</p>
                                <p>Winning Trades</p>
                                <p>{winningTradeNumber}</p>
                                <p>Loosing Trades</p>
                                <p>{losingTradeNumber}</p>
                                <p>Winning %</p>
                                <p>{(winningTradeNumber / (losingTradeNumber + winningTradeNumber)) * 100}</p>
                                <p>Loosing %</p>
                                <p>{(losingTradeNumber / (losingTradeNumber + winningTradeNumber)) * 100}</p>
                            </Col>
                            <Col>
                                <p>Average Winning Trade</p>
                                <p>{}</p>
                                <p>Average Losing Trade</p>
                                <p></p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
);
};

export default RobotTrades;