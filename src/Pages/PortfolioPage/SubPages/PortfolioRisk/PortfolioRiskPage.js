import PositionExposure from "./PositionExposure/PositionExposure";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import ServerContext from "../../../../context/server-context";
import PortfolioPageContext from "../../context/portfolio-page-context";
import PortfolioDrawdown from "./PortfolioDrawdown/PortfolioDrawdown";
import {BarChartGrouped} from "../../../../components/Charts/BarCharts";
import Chart from 'react-apexcharts';
import DateContext from "../../../../context/date-context";
import holdingTable from "../../../../components/Tables/HoldingTable";

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




const CorrelationHeatmap = ({ data }) => {
    const [heatmapData, setHeatmapData] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const matrix = data;

        // Format data for the heatmap
        const formattedData = Object.keys(matrix).map(asset => ({
            name: asset,
            data: Object.keys(matrix[asset]).map(key => ({
                x: key,
                y: matrix[asset][key]
            }))
        }));

        setHeatmapData(formattedData);
        setCategories(Object.keys(matrix));
    }, [data]);


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
    const currentDate = useContext(DateContext)['currentDate'];
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const currentHoldingData = useContext(PortfolioPageContext).currentHolding;

    const [drawDownData, setDrawDownData] = useState([]);
    const [correlPeriod, setCorrelPeriod] = useState(60);
    const [d, setD] = useState({});

    const fetchDrawdown = async () => {
        const response = await axios.get(`${server}portfolios/get/drawdown/`, {
            params: {
                portfolio_code: portfoliCode
            }
        })
        setDrawDownData(response.data['drawdowns'])
    };

    const fetchExposures = async () => {
        const response = await axios.post(`${server}portfolios/get/position_exposures/`, {
                        portfolio_code: [portfoliCode],
                        period: correlPeriod,
                        date: currentDate
                    })
        setD(response.data)
    };

    // Debounce the correlPeriod
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchExposures();
        }, 1000);
        return () => clearTimeout(handler);
    }, [correlPeriod, portfoliCode]);

    useEffect(() => {
        fetchDrawdown();
    }, [portfoliCode])

    const positions = currentHoldingData.filter(record => !['Cash'].includes(record.group))

    return (
        <div style={{height: '100%', width: '100%', padding: 15, overflowY: 'scroll'}}>
            <p>Exposures</p>
            <div style={{display: "flex"}}>

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

            <p>Position Risk Exposure</p>

            <div style={{display: "flex"}}>

                <div className={'card'} style={{height: 400, width: 400}}>
                    <div className={'card-header'}>
                        Position Exposure
                    </div>
                    <BarChartGrouped data={positions} groupBy="name" value="weight"/>
                </div>

                <div className={'card'} style={{height: 400, width: 400}}>
                    <div className={'card-header'}>
                        Position Exposure Concentration
                    </div>
                    <PieChart data={positions} groupBy="name" value="weight"/>
                </div>

                <div className={'card'} style={{height: 400, width: 400}}>
                    <div className={'card-header'} style={{
                        justifyContent: 'space-between'
                    }}>
                        <span>Position Correlation (Days)</span>
                        <div>
                            <input type={'number'}
                                   min={0}
                                   defaultValue={correlPeriod}
                                   onChange={(e) => setCorrelPeriod(e.target.value)}
                                   style={{width: 150}}
                            />
                        </div>
                    </div>
                    <CorrelationHeatmap data={d}/>
                </div>

            </div>


            {/*<PositionExposure server={server}/>*/}
        </div>
    );
};

export default PortfolioRiskPage;