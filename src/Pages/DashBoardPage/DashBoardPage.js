import axios from "axios";
import {useContext, useEffect, useState} from "react";
import ServerContext from "../../context/server-context";
import DashBoardNavWidget from "./DashBoardNavWidget/DashBoardNavWidget";
import DateContext from "../../context/date-context";
import DashBoardTotalPnl from "./DashBoardTotalPnl/DashBoardTotalPnl";
import DashBoardPerformance from "./DashBoardPerformance/DashBoardPerformance";

const DashBoardPage = () => {
    const server = useContext(ServerContext)['server'];
    const currentDate = useContext(DateContext).currentDate;
    const [portfolioNavData, setPortfolioNavData] = useState([]);
    const [groupedNav, setGroupedNav] = useState([]);
    const [totalPnl, setTotalPnl] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);

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

    useEffect(() => {
       fetchPortfolioNav();
       fetchPortfolioGroupedNav();
       fetchTotalPnl();
       fetchPerfDashBoard();
    }, [])

    const navs = portfolioNavData.map((data) => Math.round(data.total*100)/100)
    const portCodes = portfolioNavData.map((data) => data.portfolio_code)
    const groupedNavs = groupedNav.map((data) => Math.round(data.total*100)/100)
    const portTypes = groupedNav.map((data) => data.portfolio_type)
    return(
        <div className={'page-container'}>
            <div style={{display: "flex"}}>
                <div>
                    <DashBoardNavWidget x={navs} y={portCodes} title={'Portfolios'}/>
                    <DashBoardNavWidget x={groupedNavs} y={portTypes} title={'Portfolio Type'}/>
                </div>
                <div>
                    <DashBoardTotalPnl data={totalPnl}/>
                </div>
                <div style={{paddingLeft: 15}}>
                    <DashBoardPerformance data={performanceData}/>
                </div>
            </div>
        </div>
    )
};

export default DashBoardPage;