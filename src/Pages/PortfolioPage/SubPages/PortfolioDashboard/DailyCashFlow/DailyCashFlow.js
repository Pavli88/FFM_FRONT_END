import ChartWidget from "../../../../../Widgets/Charts/ChartWidget";
import DailyCashFlowChartConfig from "./DailyCashFlowChartConfig";
import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";
import axios from "axios";
import {useState} from "react";

const DailyCashFlow = (props) => {
    const [data, setData] = useState({'data': [], 'series': []});
    const fetchData = async() => {
        const response = await axios.get(props.server + 'portfolios/daily_cashflow/')
        setData(response.data)
    };

    const x = {
        options: {
            chart: {
                toolbar: false,
                type: 'bar',
                stacked: true,
            },
            xaxis: {
                categories: data.dates,
                labels: {show: false},
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
            // title: {
            //     // text: "Total Drawdown",
            //     align: 'left',
            //     margin: 10,
            //     offsetX: 0,
            //     offsetY: 0,
            //     floating: false,
            //     style: {
            //         fontSize: '14px',
            //         fontWeight: 'bold',
            //         fontFamily: undefined,
            //         color: '#263238'
            //     },
            // },
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
            fill: {
                opacity: 1
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
        },
        series: data.series
        }

    return(
        <div style={{height: '400px'}}>
            <button onClick={fetchData}>Fetch</button>
            <Card className="card" style={{height: '100%', width: '100%', margin:'0px'}}>
            <Card.Header>{'test'}</Card.Header>
            <div style={{height:'100%'}}>
                <Chart
                options={x.options}
                series={x.series}
                type={'bar'}
                width="100%"
                height="100%"/>
            </div>
        </Card>
        </div>

    )
};
export default DailyCashFlow;