import Chart from "react-apexcharts";
import Card from "react-bootstrap/Card";
import {useEffect, useState} from "react";
import axios from "axios";

const PortfolioTransactionPnl = ( {unrealized, realized} ) => {
    // const data = props.data.map(data=>data.pnl)
    // const label = props.data.map(data=>data.name)
    const total = unrealized.map((value, index) => value + (realized[index] || 0))
    const chartConfig = {
        options: {
            chart: {
                toolbar: false,
                id: 'profits-chart',
                type: 'line'
            },
            // colors: [function(value){
            //     console.log(value)
            //     if (value["value"] < 0){
            //         return '#E32227'
            //     }else {
            //         return '#007500'
            //     }
            // }],
            xaxis: {
                // categories: label,
                labels: {
                    show: false,
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
                name: 'Unrealized',
                data: unrealized,
            },
            {
                name: 'Realized',
                data: realized,
            },
            {
                name: 'Total',
                data: total,
            },
        ]
    }
    const lastTotal = Math.round(total[total.length - 1] * 100) / 100
    const lastUnrel = Math.round(unrealized[unrealized.length - 1] * 100) / 100
    const lastRel = Math.round(realized[realized.length - 1] * 100) / 100
    return(
        <div className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <div className={'card-header'}>
                <div style={{display: 'flex'}}>
                    <div>
                        Cumulative Pnl
                    </div>
                    <div style={{position: 'absolute', right: 15, display: "flex"}}>
                        <div>
                            Realized
                        </div>
                        <span style={{
                            color: lastRel < 0 ? 'red' : 'green',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}>{lastRel}</span>
                        <div>
                            Unrealized
                        </div>
                        <span style={{
                            color: lastUnrel < 0 ? 'red' : 'green',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}>{lastUnrel}</span>
                        <div>
                            Total
                        </div>
                        <span style={{
                            color: lastTotal < 0 ? 'red' : 'green',
                            paddingLeft: 10
                        }}>{lastTotal}</span>
                    </div>
                </div>
            </div>
            <div style={{height: '100%'}}>
                <Chart
                    options={chartConfig.options}
                    series={chartConfig.series}
                    type={'line'}
                    width="100%"
                    height="100%"/>
            </div>
        </div>
    )
}
export default PortfolioTransactionPnl;