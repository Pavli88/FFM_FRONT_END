import PositionExposure from "./PositionExposure/PositionExposure";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import ServerContext from "../../../../context/server-context";
import PortfolioPageContext from "../../context/portfolio-page-context";
import PortfolioDrawdown from "./PortfolioDrawdown/PortfolioDrawdown";

import Chart from 'react-apexcharts';
import DateContext from "../../../../context/date-context";

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


const CorrelationHeatmap = ({ server, params }) => {
    const [heatmapData, setHeatmapData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [debouncedParams, setDebouncedParams] = useState(params);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedParams(params);
        }, 1000); // Adjust the delay as needed

        return () => clearTimeout(handler); // Clear timeout if params changes again before delay
    }, [params]);

    useEffect(() => {

        axios.get(`${server}portfolios/get/position_correlation/`, {
            params: params
        })
        .then(response => {
            const matrix = response.data;

            // Format data for the heatmap
            const formattedData = Object.keys(matrix).map(asset => ({
                name: asset,
                data: Object.keys(matrix[asset]).map(key => ({
                    x: key,
                    y: matrix[asset][key]
                }))
            }));

            setHeatmapData(formattedData);
            setCategories(Object.keys(matrix)); // Set the x-axis categories
        })
        .catch(error => console.error("Error fetching correlation matrix:", error));
    }, [debouncedParams]);

    const chartOptions = {
        chart: {
            type: 'heatmap',
            toolbar: { show: false },
            height: '100%'
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                colorScale: {
                    ranges: [
                        { from: -1, to: -0.5, color: '#F15B46' },
                        { from: -0.5, to: 0, color: '#FEB019' },
                        { from: 0, to: 0.5, color: '#A9D8A5' },
                        { from: 0.5, to: 1, color: '#1E90FF' }
                    ]
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(2);
            },
            style: { colors: ['#000'] }
        },
        xaxis: {
            type: 'category',
            categories: categories // Use the updated categories from state
        },
        yaxis: {
            show: true
        },
        // title: {
        //     text: 'Asset Correlation Heatmap',
        //     align: 'center'
        // }
    };

    return (
        <div style={{height: '100%', width: '100%'}}>
            <Chart
                options={chartOptions}
                series={heatmapData}
                type="heatmap"
                height="100%"
                width="100%"
            />
        </div>
    );
};



const PortfolioRiskPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const currentDate = useContext(DateContext)['currentDate']
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const currentHoldingData = useContext(PortfolioPageContext).currentHolding
    const [drawDownData, setDrawDownData] = useState([]);
    const [correlPeriod, setCorrelPeriod] = useState(60);

    const fetchDrawdown = async () => {
        const response = await axios.get(`${server}portfolios/get/drawdown/`, {
            params: {
                portfolio_code: portfoliCode
            }
        })
        setDrawDownData(response.data['drawdowns'])
    };

    useEffect(() => {
        fetchDrawdown();
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
                <div style={{width: "100%", paddingLeft: 15}}>
                    <PortfolioDrawdown data={drawDownData}/>
                </div>
            </div>

            <p>Position Correlations</p>
            <div className={'card'} style={{height: 400, width: 400}}>
                <div className={'card-header'} style={{
                    justifyContent: 'space-between'
                }}>
                    <span>Position Correlation</span>
                    <div>
                        <input type={'number'} min={0} defaultValue={correlPeriod}
                               onChange={(e) => setCorrelPeriod(e.target.value)}/>
                    </div>
                </div>
                <CorrelationHeatmap server={server} params={{
                    portfolio_code: portfoliCode,
                period: correlPeriod,
                date: currentDate
            }}/>
            </div>

            {/*<PositionExposure server={server}/>*/}
        </div>
    );
};

export default PortfolioRiskPage;