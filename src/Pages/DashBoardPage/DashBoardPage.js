import axios from "axios";
import {useContext, useEffect, useState, useMemo} from "react";
import ServerContext from "../../context/server-context";
import DashBoardNavWidget from "./DashBoardNavWidget/DashBoardNavWidget";
import DateContext from "../../context/date-context";
import {BarChartGrouped, StackedBarChart} from "../../components/Charts/BarCharts";
import {PieChart} from "../../components/Charts/PieCharts";
import {PositionExposures} from "../../components/Widgets/Risk/PositionExposures";
import PortfolioGroup from "../ProfilPage/PortfolioGroup/PortfolioGroup";
import {cumulativeSum} from "../../calculations/cumulative";
import PortfolioTransactionPnl
    from "../PortfolioPage/SubPages/PortfolioReturn/PortfolioTransactionPnl/PortfolioTransactionPnl";
import TradingMetrics from "../../calculations/tradeMetrics";

// Custom hook for fetching dashboard data
const useDashboardData = (server, currentDate) => {
    const [data, setData] = useState({
        portfolioNavData: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    portfolioNavRes
                ] = await Promise.all([
                    axios.post(`${server}portfolios/get/nav/`,  {
                        portfolio_code__in : ['SO1', 'BO1']
                    }),
                ]);

                setData({
                    portfolioNavData: portfolioNavRes.data,
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, [server, currentDate]);

    return data;
};

const transformPortfolioData = (dateRecords) => {
    const portfolioMap = {};

    dateRecords.forEach(({ records }) => {
        records.forEach(({ portfolio_code, holding_nav }) => {
            // Skip invalid holding_nav
            if (holding_nav == null || isNaN(holding_nav)) return;

            // If portfolio_code is not in the map, initialize it
            if (!portfolioMap[portfolio_code]) {
                portfolioMap[portfolio_code] = [];
            }

            // Push the holding_nav value to the portfolio's data array
            portfolioMap[portfolio_code].push(holding_nav);
        });
    });

    // Convert the map to the desired array format
    return Object.entries(portfolioMap).map(([name, data]) => ({ name, data }));
};

const transformSummedData = (dateRecords, fieldMapping) => {
    const fieldMap = {};

    // Initialize the field map with empty arrays for each field
    fieldMapping.values.forEach((field) => {
        fieldMap[field] = [];
    });

    dateRecords.forEach(({ records }) => {
        // Initialize a temporary sum object for the current date
        const tempSum = {};
        fieldMapping.values.forEach((field) => {
            tempSum[field] = 0;
        });

        // Sum up the specified fields across all records for the current date
        records.forEach((record) => {
            fieldMapping.values.forEach((field) => {
                if (record[field] != null && !isNaN(record[field])) {
                    tempSum[field] += record[field];
                }
            });
        });

        // Append the computed sums to the respective field's data array
        fieldMapping.values.forEach((field, index) => {
            fieldMap[field].push(tempSum[field]);
        });
    });

    // Convert the map to the desired array format using the labels
    return fieldMapping.values.map((field, index) => ({
        name: fieldMapping.labels[index],
        data: fieldMap[field],
    }));
};

const DashBoardPage = () => {
    const server = useContext(ServerContext).server;
    const currentDate = useContext(DateContext).currentDate;
    const [currentHolding, setCurrentHolding] = useState([]);

    const {
        portfolioNavData,
    } = useDashboardData(server, currentDate);
    // console.log(portfolioNavData)
    // // Memoized derived values
    // const navs = useMemo(() => portfolioNavData.map((data) => Math.round(data.total * 100) / 100), [portfolioNavData]);
    // const portCodes = useMemo(() => portfolioNavData.map((data) => data.portfolio_code), [portfolioNavData]);
    // const groupedNavs = useMemo(() => groupedNav.map((data) => Math.round(data.total * 100) / 100), [groupedNav]);
    // const portTypes = useMemo(() => groupedNav.map((data) => data.portfolio_type), [groupedNav]);

    const data = transformPortfolioData(portfolioNavData)
    const summedData = transformSummedData(portfolioNavData, {labels: ['Positions', 'Cash', 'Margin'], values: ['pos_val', 'cash_val', 'margin']})
    const summedPnl = transformSummedData(portfolioNavData, {labels: ['Realized', 'Unrealized'], values: ['pnl', 'unrealized_pnl']})
    const labels = portfolioNavData.map((d) => d.date)
    const lastRecordData = portfolioNavData.length > 0 ? portfolioNavData[portfolioNavData.length - 1]['records']: []
    const portfolios = lastRecordData.map((d) => d.portfolio_code)
    const navValues = lastRecordData.map((d) => d.holding_nav)
    const realizedPnl = summedPnl[0]['data']
    const unrealizedPnl = summedPnl[1]['data']
    // console.log(summedPnl)
    // console.log(cumulativeUnrealized)
    return (
        <div >

            <div style={{display: "flex"}}>
                <div style={{height: 500, width: 350, padding: 10}}>
                    <PortfolioGroup/>
                </div>

                <div>
                    <div style={{padding: 10}}>
                        <div style={{
                            borderTop: "1px solid  #e5e8e8 ",
                            borderBottom: "1px solid  #e5e8e8 ",
                            padding: "5px",
                            display: "flex",
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{fontWeight: "bold"}}>NAV</span>

                        </div>
                        <div style={{display: "flex", height: 350, marginTop: 10}}>
                            <div className={'card'} style={{flex: 1, marginRight: 5}}>
                                <StackedBarChart data={data} labels={labels} yName={'NAV'}/>
                            </div>

                            <div className={'card'} style={{flex: 1, marginRight: 5, marginLeft: 5}}>
                                <StackedBarChart data={summedData} labels={labels} yName={'NAV'}/>
                            </div>
                            <div className={'card'} style={{height: '100%', marginLeft: 5}}>
                                <PieChart values={navValues} labels={portfolios}/>
                            </div>
                        </div>
                    </div>
                    <PositionExposures portfolioCodes={['SO1', 'BO1']} server={server}/>

                    <div style={{padding: 10}}>
                        <div style={{
                            borderTop: "1px solid  #e5e8e8 ",
                            borderBottom: "1px solid  #e5e8e8 ",
                            padding: "5px",
                            display: "flex",
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{fontWeight: "bold"}}>Performance</span>

                        </div>
                        <div style={{display: "flex", height: 350, marginTop: 10}}>
                            <div className={'card'} style={{flex: 1, marginRight: 5}}>
                                <StackedBarChart data={summedPnl} labels={labels} yName={'Profit & Loss'}/>
                            </div>
                            {/*<div style={{flex: 1, height: 350, marginLeft: 10}}>*/}
                            {/*    <PortfolioTransactionPnl*/}
                            {/*        total={cumulativeUnrealizedPnl}*/}
                            {/*        unrealized={cumulativeUnrealizedPnl}*/}
                            {/*        realized={cumulativeRealizedPnl}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <div style={{height: 350, marginLeft: 10, width: 300}}>
                                <TradingMetrics profits={realizedPnl}
                                                maxUnrealized={Math.min(...unrealizedPnl)}/>
                            </div>
                            {/*<div className={'card'} style={{flex: 1, marginRight: 5, marginLeft: 5}}>*/}
                            {/*    <StackedBarChart data={summedData} labels={labels} yName={'NAV'}/>*/}
                            {/*</div>*/}
                            {/*<div className={'card'} style={{height: '100%', marginLeft: 5}}>*/}
                            {/*    <PieChart values={navValues} labels={portfolios}/>*/}
                            {/*</div>*/}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default DashBoardPage;