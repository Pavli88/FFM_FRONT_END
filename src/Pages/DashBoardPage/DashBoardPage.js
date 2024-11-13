import axios from "axios";
import {useContext, useEffect, useState, useMemo} from "react";
import ServerContext from "../../context/server-context";
import DashBoardNavWidget from "./DashBoardNavWidget/DashBoardNavWidget";
import DateContext from "../../context/date-context";
import DashBoardTotalPnl from "./DashBoardTotalPnl/DashBoardTotalPnl";
import DashBoardPerformance from "./DashBoardPerformance/DashBoardPerformance";
import DashBoardMonthlyPnl from "./DashBoardMonthlyPnl/DashBoardMonthlyPnl";
import DashBoardHistoricNav from "./DashBoardHistoricNav/DashBoardHistoricNav";
import DashBoardTotalDrawdown from "./DashBoardTotalDrawdown/DashBoardTotalDrawdown";
import HoldingTable from "../../components/Tables/HoldingTable";
import {BarChartGrouped} from "../../components/Charts/BarCharts";
import {PositionExposures} from "../../components/Widgets/Risk/PositionExposures";
import PortfolioGroup from "../ProfilPage/PortfolioGroup/PortfolioGroup";

// Custom hook for fetching dashboard data
const useDashboardData = (server, currentDate) => {
    const [data, setData] = useState({
        portfolioNavData: [],
        groupedNav: [],
        totalPnl: [],
        performanceData: [],
        monthlyPnl: [],
        historicNav: [{}],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    portfolioNavRes,
                    groupedNavRes,
                    totalPnlRes,
                    performanceDataRes,
                    monthlyPnlRes,
                    historicNavRes,
                ] = await Promise.all([
                    axios.get(`${server}portfolios/get/portfolio_nav/`, { params: { date: currentDate } }),
                    axios.get(`${server}portfolios/get/grouped/portfolio_nav/`, { params: { date: currentDate } }),
                    axios.get(`${server}portfolios/get/total_pnl/`),
                    axios.get(`${server}portfolios/get/perf_dashboard/`, { params: { date: currentDate } }),
                    axios.get(`${server}portfolios/get/monthly_pnl/`),
                    axios.get(`${server}portfolios/get/historic_nav/`),
                ]);

                setData({
                    portfolioNavData: portfolioNavRes.data,
                    groupedNav: groupedNavRes.data,
                    totalPnl: totalPnlRes.data,
                    performanceData: performanceDataRes.data,
                    monthlyPnl: monthlyPnlRes.data,
                    historicNav: historicNavRes.data,
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, [server, currentDate]);

    return data;
};

const DashBoardPage = () => {
    const server = useContext(ServerContext).server;
    const currentDate = useContext(DateContext).currentDate;
    const [currentHolding, setCurrentHolding] = useState([]);

    // const {
    //     portfolioNavData,
    //     groupedNav,
    //     totalPnl,
    //     performanceData,
    //     monthlyPnl,
    //     historicNav,
    // } = useDashboardData(server, currentDate);
    //
    // // Memoized derived values
    // const navs = useMemo(() => portfolioNavData.map((data) => Math.round(data.total * 100) / 100), [portfolioNavData]);
    // const portCodes = useMemo(() => portfolioNavData.map((data) => data.portfolio_code), [portfolioNavData]);
    // const groupedNavs = useMemo(() => groupedNav.map((data) => Math.round(data.total * 100) / 100), [groupedNav]);
    // const portTypes = useMemo(() => groupedNav.map((data) => data.portfolio_type), [groupedNav]);

    // const positions = currentHolding.filter(record => !['Cash'].includes(record.group))
    // console.log(positions)
    return (
        <div className="page-container" style={{overflow: 'scroll'}}>

            <div style={{display: "flex"}}>
                <div style={{height: 500, width: 350, padding: 10}}>
                    <PortfolioGroup/>
                </div>

                <PositionExposures portfolioCodes={['SO1', 'BO1']} server={server}/>
            </div>





            {/*<div style={{margin: 10}}>*/}
            {/*    <p>NAV</p>*/}
            {/*</div>*/}

            {/*<div style={{display: "flex", margin: 10}}>*/}
            {/*    <div style={{width: '33%'}}>*/}
            {/*        <div style={{height: 200}}>*/}
            {/*            <DashBoardNavWidget x={navs} y={portCodes} title="Portfolios"/>*/}
            {/*        </div>*/}
            {/*        <div style={{height: 200}}>*/}
            {/*            <DashBoardNavWidget x={groupedNavs} y={portTypes} title="Portfolio Type"/>*/}
            {/*        </div>*/}

            {/*    </div>*/}

            {/*    <div style={{width: '33%'}}>*/}
            {/*        <div style={{height: 400}}>*/}
            {/*            <DashBoardHistoricNav data={historicNav}/>*/}
            {/*        </div>*/}

            {/*    </div>*/}

            {/*    <div style={{width: '33%'}}>*/}
            {/*        <div style={{height: 400}}>*/}
            {/*            <DashBoardTotalDrawdown data={historicNav}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div style={{margin: 10}}>*/}
            {/*    <p>Performance</p>*/}
            {/*</div>*/}


            {/*<div style={{margin: 10, display: "flex"}}>*/}
            {/*    <div style={{height: '50%', paddingTop: 15}}>*/}
            {/*        <DashBoardTotalPnl data={totalPnl}/>*/}
            {/*    </div>*/}
            {/*    <div style={{height: '50%', paddingTop: 15}}>*/}
            {/*        <DashBoardMonthlyPnl data={monthlyPnl}/>*/}
            {/*    </div>*/}
            {/*    <div style={{paddingBottom: 15}}>*/}
            {/*        <DashBoardPerformance data={performanceData}/>*/}
            {/*    </div>*/}
            {/*</div>*/}


            {/*<div style={{margin: 10}}>*/}
            {/*    <p>Exposure</p>*/}
            {/*</div>*/}

            {/*<div style={{margin: 15}}>*/}
            {/*    <HoldingTable data={[{}]}/>*/}
            {/*</div>*/}

        </div>
    );
};

export default DashBoardPage;