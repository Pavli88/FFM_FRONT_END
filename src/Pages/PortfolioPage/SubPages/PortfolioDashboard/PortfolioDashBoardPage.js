import DailyCashFlow from "./DailyCashFlow/DailyCashFlow";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import PortfolioPageContext from "../../context/portfolio-page-context";
import PortfolioHoldings from "../PortfolioHoldings/PortfolioHoldings/PortfolioHoldings";

const PortfolioDashBoardPage = (props) => {
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const [navData, setNavData] = useState([{}])
    const [holdingDate, setHoldingDate] = useState();
    const [holdingData, setHoldingdata] = useState([{}])

    const fetchData = async() => {
        const response = await axios.get(props.server + 'portfolios/get/nav/', {
            params: {
                date__gte: '2023-01-01',
                portfolio_code: portfoliCode
            }
        })
        setNavData(response.data)
    };

    const fetchHoldingData = async() => {
        const response = await axios.get(props.server + 'portfolios/get/holding/', {
            params: {
                date: holdingDate,
                portfolio_code: portfoliCode
            }
        })
        setHoldingdata(response.data)
    };

    useEffect(() => {
        fetchData()
    }, [portfoliCode])

    useEffect(() => {
        fetchHoldingData()
    }, [holdingDate])

    return (
        <div style={{width: '100%', height: '100%', margin: '0px', padding: 15}}>
            <div style={{height: 300, width: '100%', display: 'flex'}}>
                <div style={{width: '100%', height: '100%'}}>
                    <DailyCashFlow server={props.server} data={navData}
                                   setHoldingDate={(date) => setHoldingDate(date)}/>
                </div>

            </div>
            <div style={{paddingTop: 15}}>
                <PortfolioHoldings data={holdingData}/>
            </div>
        </div>
    );
};

export default PortfolioDashBoardPage;