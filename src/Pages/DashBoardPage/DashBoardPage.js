import axios from "axios";
import {useContext, useEffect, useState} from "react";
import ServerContext from "../../context/server-context";
import DashBoardNavWidget from "./DashBoardNavWidget/DashBoardNavWidget";
import DateContext from "../../context/date-context";

const DashBoardPage = () => {
    const server = useContext(ServerContext)['server'];
    const currentDate = useContext(DateContext).currentDate;
    const [portfolioNavData, setPortfolioNavData] = useState([]);
    const [groupedNav, setGroupedNav] = useState([]);
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

    useEffect(() => {
       fetchPortfolioNav();
       fetchPortfolioGroupedNav();
    }, [])

    const navs = portfolioNavData.map((data) => Math.round(data.total*100)/100)
    const portCodes = portfolioNavData.map((data) => data.portfolio_code)
    const groupedNavs = groupedNav.map((data) => Math.round(data.total*100)/100)
    const portTypes = groupedNav.map((data) => data.portfolio_type)
    return(
        <div className={'page-container'}>
            <DashBoardNavWidget x={navs} y={portCodes}/>
            <DashBoardNavWidget x={groupedNavs} y={portTypes}/>
        </div>
    )
};

export default DashBoardPage;