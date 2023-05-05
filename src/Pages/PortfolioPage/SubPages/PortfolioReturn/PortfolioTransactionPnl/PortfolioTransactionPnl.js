import Chart from "react-apexcharts";
import Card from "react-bootstrap/Card";
import {useEffect, useState} from "react";
import axios from "axios";

const PortfolioTransactionPnl = (props) => {
    const data = props.data.map(data=>data.pnl)
    const label = props.data.map(data=>data.name)

    const chartConfig = {
        options: {
            chart: {
                toolbar: false,
                id: 'pofits-chart',
                type: 'bar'
            },
            colors: [function (value) {
                if (value['value'] < 0) {
                    return '#E32227'
                } else {
                    return '#007500'
                }
            }],
            xaxis: {
                categories: label,
                labels: {
                    show: true,
                    style: {
                        colors: [],
                        fontSize: '8px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
                axisBorder: {
                    show: true,
                    color: '#78909C',
                    height: 1,
                    width: '100%',
                    offsetX: 0,
                    offsetY: 0
                },
                axisTicks: {
                    show: false,
                    borderType: 'solid',
                    color: '#78909C',
                    height: 6,
                    offsetX: 0,
                    offsetY: 0
                },
            },
            title: {
                // text: "Outstanding P&L",
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: '#263238'
                },
            },
            yaxis: [
                {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(2);
                        }
                    },
                }
            ],
            dataLabels: {
                enabled: false
            },
        },
        series: [
            {
                name: 'Profit',
                data: data
            },
        ]
    }
    return(
        <Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <Card.Header>
                <div style={{display: 'flex'}}>
                    <div>
                        Transaction Pnl
                    </div>
                </div>
            </Card.Header>
            <div style={{height: '100%'}}>
                <Chart
                    options={chartConfig.options}
                    series={chartConfig.series}
                    type={'bar'}
                    width="100%"
                    height="100%"/>
            </div>
        </Card>
    )
}
export default PortfolioTransactionPnl;