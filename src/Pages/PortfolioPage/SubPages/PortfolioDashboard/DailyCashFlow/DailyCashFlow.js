import ChartWidget from "../../../../../Widgets/Charts/ChartWidget";
import DailyCashFlowChartConfig from "./DailyCashFlowChartConfig";
import PortfolioPageContext from "../../../context/portfolio-page-context";
import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";
import axios from "axios";
import {useContext, useState} from "react";

const DailyCashFlow = (props) => {
    const dates = props.data.map((data) => data.date)
    const cash = props.data.map((data) => data.cash_val)
    const pos = props.data.map((data) => data.pos_val)
    const short_liab = props.data.map((data) => data.short_liab*-1)
    const margin = props.data.map((data) => data.margin)
    const nav = props.data.map((data) => data.total)

    const x = {
        options: {
            chart: {
                toolbar: false,
                stacked: true,
                type: 'bar',
                events: {
                    click(event, chartContext, config) {
            props.setHoldingDate(config.config.xaxis.categories[config.dataPointIndex])
        }
                }
            },
            xaxis: {
                categories: dates,
                type: 'date',
                labels: {show: true},
                axisBorder: {
                    show: false,
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
            yaxis: [
                {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(2);
                        }
                    },
                },
            ],
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
        },
        series: [
            {
                name: 'Cash',
                data: cash,
            },
             {
                name: 'Margin',
                data: margin,
            },
            {
                name: 'Asset Value',
                data: pos,
            },
            // {
            //     name: 'Short Liability',
            //     data: short_liab,
            // }
        ]
    }

    return (
        <Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <Card.Header>
                <div style={{display: 'flex'}}>
                    <div>
                        Nav Composition
                    </div>
                </div>
            </Card.Header>
            <div style={{height: '100%'}}>
                <Chart
                    options={x.options}
                    series={x.series}
                    type={'bar'}
                    width="100%"
                    height="100%"/>
            </div>
        </Card>
    )
};
export default DailyCashFlow;