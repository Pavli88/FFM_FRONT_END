import axios from "axios";
import {useContext, useEffect, useState} from "react";
import ServerContext from "../../context/server-context";
import DashBoardNavWidget from "./DashBoardNavWidget/DashBoardNavWidget";
import DateContext from "../../context/date-context";
import DashBoardTotalPnl from "./DashBoardTotalPnl/DashBoardTotalPnl";
import DashBoardPerformance from "./DashBoardPerformance/DashBoardPerformance";
import DashBoardMonthlyPnl from "./DashBoardMonthlyPnl/DashBoardMonthlyPnl";
import DashBoardHistoricNav from "./DashBoardHistoricNav/DashBoardHistoricNav";
import DashBoardTotalDrawdown from "./DashBoardTotalDrawdown/DashBoardTotalDrawdown";

const DashBoardPage = () => {
    const server = useContext(ServerContext)['server'];
    const currentDate = useContext(DateContext).currentDate;
    const [portfolioNavData, setPortfolioNavData] = useState([]);
    const [groupedNav, setGroupedNav] = useState([]);
    const [totalPnl, setTotalPnl] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);
    const [monthlyPnl, setMonthlyPnl] = useState([]);
    const [historicNav, setHistoricNav] = useState([{}]);

    const fetchPortfolioNav = async() => {
        const response = await axios.get(server + 'portfolios/get/portfolio_nav/', {
            params: {
                date: currentDate,
            }
        })
        setPortfolioNavData(response.data)
    };

    const fetchPortfolioGroupedNav = async() => {
        const response = await axios.get(server + 'portfolios/get/grouped/portfolio_nav/', {
            params: {
                date: currentDate,
            }
        })
        setGroupedNav(response.data)
    };

    const fetchPerfDashBoard = async() => {
        const response = await axios.get(server + 'portfolios/get/perf_dashboard/', {
            params: {
                date: currentDate,
            }
        })
        setPerformanceData(response.data)
    };

    const fetchTotalPnl = async() => {
        const response = await axios.get(server + 'portfolios/get/total_pnl/', )
        setTotalPnl(response.data)
    };

    const fetchMonthlyPnl = async() => {
        const response = await axios.get(server + 'portfolios/get/monthly_pnl/', )
        setMonthlyPnl(response.data)
    };

    const fetchHistoricNav = async() => {
        const response = await axios.get(server + 'portfolios/get/historic_nav/', )
        setHistoricNav(response.data)
    };

    useEffect(() => {
       fetchPortfolioNav();
       fetchPortfolioGroupedNav();
       fetchTotalPnl();
       fetchPerfDashBoard();
       fetchMonthlyPnl();
       fetchHistoricNav();
    }, [])


    const navs = portfolioNavData.map((data) => Math.round(data.total*100)/100)
    const portCodes = portfolioNavData.map((data) => data.portfolio_code)
    const groupedNavs = groupedNav.map((data) => Math.round(data.total*100)/100)
    const portTypes = groupedNav.map((data) => data.portfolio_type)
    return(
        <div className={'page-container'} style={{overflow: "scroll"}}>
            <div style={{display: "flex"}}>
                <div>
                    <DashBoardNavWidget x={navs} y={portCodes} title={'Portfolios'}/>
                    <DashBoardNavWidget x={groupedNavs} y={portTypes} title={'Portfolio Type'}/>
                </div>
                <div style={{height: 800}}>
                    <div style={{height: '50%', paddingTop: 15}}>
                         <DashBoardTotalPnl data={totalPnl}/>
                    </div>
                    <div style={{height: '50%', paddingTop: 15}}>
                        <DashBoardMonthlyPnl data={monthlyPnl}/>
                    </div>
                </div>
                <div style={{paddingLeft: 15}}>
                    <div style={{paddingBottom: 15}}>
                        <DashBoardPerformance data={performanceData}/>
                    </div>
                    <div style={{height: 400, paddingBottom: 5}}>
                        <DashBoardHistoricNav data={historicNav}/>
                    </div>
                    <div style={{height: 250}}>
                        <DashBoardTotalDrawdown data={historicNav}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashBoardPage;