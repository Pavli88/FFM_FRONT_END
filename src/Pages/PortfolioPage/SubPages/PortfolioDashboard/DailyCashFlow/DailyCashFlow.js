import ChartWidget from "../../../../../Widgets/Charts/ChartWidget";
import DailyCashFlowChartConfig from "./DailyCashFlowChartConfig";
import PortfolioPageContext from "../../../context/portfolio-page-context";
import Card from "react-bootstrap/Card";
import Chart from "react-apexcharts";
import axios from "axios";
import {useContext, useState} from "react";

const DailyCashFlow = (props) => {
    const portfolioData = useContext(PortfolioPageContext).portfolioData;
    // console.log(portfolioData)
    const [data, setData] = useState({'data': [], 'series': []});
    const fetchData = async() => {
        const response = await axios.get(props.server + 'portfolios/daily_cashflow/', {
            params: {
                portfolio_code: portfolioData[0].portfolio_code
            }
        })
        setData(response.data)
    };
    // console.log(data)
    const x = {
        options: {
            chart: {
                toolbar: false,
                type: 'bar',
                stacked: true,
            },
            xaxis: {
                categories: data.dates,
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

    return (
        <Card className="card" style={{height: '100%', width: '100%', margin: '0px'}}>
            <Card.Header>
                <div style={{display: 'flex'}}>
                    <div>
                        Cash Movements
                    </div>
                    <div>
                        <button onClick={fetchData}>Fetch</button>
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