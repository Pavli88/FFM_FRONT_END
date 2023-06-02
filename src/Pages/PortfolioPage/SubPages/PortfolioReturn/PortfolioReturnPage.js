import PortfolioTransactionPnl from "./PortfolioTransactionPnl/PortfolioTransactionPnl";
import CumulativePerformance from "./CumulativePerformance";
import {useContext, useEffect, useState} from "react";
import PortfolioPageContext from "../../context/portfolio-page-context";
import ServerContext from "../../../../context/server-context";
import axios from "axios";

const PortfolioReturnPage = () => {
    const server = useContext(ServerContext)['server'];
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const portfolioData = useContext(PortfolioPageContext).portfolioData;
    const [pnlData, setPnlData] = useState([{}]);
    const [navData, setNavData] = useState([{}])

    const pnlResults = pnlData.map((data) => data.realized_pnl);
    const returns = navData.map((data) => data.period_return)
    const returnsRounded = navData.map((data) => 1 + data.period_return)
    console.log(returnsRounded)
    const findCumulativeMultiply = arr => {
        let value = 1
        let list = []
        for (let i = 0; i < arr.length; i += 1) {
            value *= arr[i];
            list.push(value)
        }
        return list
    };

    const findCumulativeSum = arr => {
        const creds = arr.reduce((acc, val) => {
            let {sum, res} = acc;
            sum += val;
            res.push(sum);
            return {sum, res};
        }, {
            sum: 0,
            res: []
        });
        return creds.res;
    };

    const fetchData = async() => {
        const response = await axios.get(server + 'portfolios/get/transactions/pnl/', {
            params: {
                portfolio_code: portfoliCode
            }
        })
        setPnlData(response.data)
    };

    const fetchPerfData = async () => {
        const response = await axios.get(server + 'portfolios/get/nav/', {
            params: {
                date__gte: portfolioData.inception_date,
                portfolio_code: portfoliCode
            }
        })
        setNavData(response.data)
    };

    useEffect(()=>{
        fetchData();
        fetchPerfData();
    }, [portfoliCode])

    return (
        <div style={{height: '900px', width: '100%', padding: 15}}>
            <div style={{display: 'flex'}}>
                <div style={{width: '50%', height: 400}}>
                    <PortfolioTransactionPnl data={findCumulativeSum(pnlResults)}/>
                </div>
                <div style={{width: '50%', height: 400}}>
                    <CumulativePerformance data={navData} returns={findCumulativeMultiply(returnsRounded).map((data) => (data - 1)*100)}/>
                </div>
            </div>

        </div>
    );
};

export default PortfolioReturnPage;