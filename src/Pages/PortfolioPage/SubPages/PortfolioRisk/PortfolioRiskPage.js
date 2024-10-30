import PositionExposure from "./PositionExposure/PositionExposure";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import ServerContext from "../../../../context/server-context";
import PortfolioPageContext from "../../context/portfolio-page-context";
import PortfolioDrawdown from "./PortfolioDrawdown/PortfolioDrawdown";
import PortfolioHoldingDrawdown from "./PortfolioHoldingDrawDown/PortfolioHoldingDrawDown";
import Chart from 'react-apexcharts';

const PieChart = ({ data, groupBy, value }) => {
    const groupData = (data, groupBy, value) => {
        return data.reduce((acc, curr) => {
            const existing = acc.find(item => item[groupBy] === curr[groupBy]);
            if (existing) {
                existing[value] += curr[value];
            } else {
                acc.push({[groupBy]: curr[groupBy], [value]: curr[value]});
            }
            return acc;
        }, []);
    };

    const groupedData = groupData(data, groupBy, value);
    const series = groupedData.map(item => Math.abs(item[value]));
    console.log(series)
    const labels = groupedData.map(item => item[groupBy]);

    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'pie',
        },
        labels: labels,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    });

    return (
        <div>
            <Chart options={chartOptions} series={series} type="pie" width="400"/>
        </div>
    );
}

const BarChart = ({ data, groupBy, value }) => {
    const groupData = (data, groupBy, value) => {
        return data.reduce((acc, curr) => {
            const existing = acc.find(item => item[groupBy] === curr[groupBy]);
            if (existing) {
                existing[value] += curr[value];
            } else {
                acc.push({[groupBy]: curr[groupBy], [value]: curr[value]});
            }
            return acc;
        }, []);
    };

    const groupedData = groupData(data, groupBy, value);
    const seriesData = groupedData.map(item => item[value]);
    const labels = groupedData.map(item => item[groupBy]);

    // Fix the structure of series
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'bar', // change to 'pie' if you're using a pie chart
        },
        series: [{
            name: 'Values', // a name for your series
            data: seriesData, // pass the seriesData here
        }],
        labels: labels,
        dataLabels: {
            enabled: false,  // Disable values on the bars
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    // Convert to percentage format
                    return (val * 100).toFixed(2) + '%';
                }
            },
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    });

    return (
        <div>
            <Chart options={chartOptions} series={chartOptions.series} type="bar" width="400"/>
        </div>
    );
}

const PortfolioRiskPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const currentHoldingData = useContext(PortfolioPageContext).currentHolding
    const [drawDownData, setDrawDownData] = useState({'data': []});
    const [holdingDrawDown, setHoldingDrawDown] = useState([]);

    const fetchDrawdown2 = async () => {
        const response = await axios.get(`${server}portfolios/get/drawdown/`, {
            params: {
                portfolio_code: portfoliCode
            }
        })
        setDrawDownData(response.data['drawdowns'])
    };

    const fetchNavData = async() => {
        const response = await axios.get(server + 'portfolios/get/nav/', {
            params: {
                date__gte: "2023-01-01",
                portfolio_code: portfoliCode
            }
        })
        setHoldingDrawDown(response.data)

    };

    const hD= holdingDrawDown.map(data => data['total'] === 0 ? 0: ((data['holding_nav'] / data['total']) -1) * 100)
    const hDDate = holdingDrawDown.map(data => data['date'])

    useEffect(() => {
        // fetchDrawdown();
        fetchNavData();
        fetchDrawdown2();
    }, [portfoliCode])

    return (
        <div style={{height: '100%', width: '100%', padding: 15, overflowY: 'scroll'}}>
            <p>Exposures</p>
            <div style={{display: "flex"}}>
                <div className={'card'}>
                    <div className={'card-header'}>
                        Currency Exposure
                    </div>
                    <PieChart data={currentHoldingData} groupBy="currency" value="weight"/>
                </div>
                <div className={'card'}>
                    <div className={'card-header'}>
                        Currency Exposure
                    </div>
                    <BarChart data={currentHoldingData} groupBy="currency" value="weight"/>
                </div>
                <div className={'card'}>
                    <div className={'card-header'}>
                        Instrument Exposure
                    </div>
                    <PieChart data={currentHoldingData} groupBy="name" value="weight"/>
                </div>
                <div className={'card'}>
                    <div className={'card-header'}>
                        Instrument Type Exposure
                    </div>
                    <PieChart data={currentHoldingData} groupBy="type" value="weight"/>
                </div>
            </div>

            <p>Drawdown</p>
            <div style={{height: 300, display: "flex", width: "100%", paddingBottom: 15}}>

                <div style={{width: "100%"}}>
                    <PortfolioHoldingDrawdown data={hD} dates={hDDate}/>
                </div>
                <div style={{width: "100%", paddingLeft: 15}}>
                    <PortfolioDrawdown data={drawDownData}/>
                </div>
            </div>
            {/*<PositionExposure server={server}/>*/}
        </div>
    );
};

export default PortfolioRiskPage;