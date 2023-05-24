import PortfolioTransactionPnl from "./PortfolioTransactionPnl/PortfolioTransactionPnl";
import {useContext, useEffect, useState} from "react";
import PortfolioPageContext from "../../context/portfolio-page-context";
import ServerContext from "../../../../context/server-context";
import axios from "axios";

const PortfolioReturnPage = () => {
    const server = useContext(ServerContext)['server'];
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const [pnlData, setPnlData] = useState([{}]);
    console.log(pnlData)

    const pnlResults = pnlData.map((data) => data.realized_pnl);
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
    console.log(findCumulativeSum(pnlResults));

    const fetchData = async() => {
        const response = await axios.get(server + 'portfolios/get/transactions/pnl/', {
            params: {
                portfolio_code: portfoliCode
            }
        })
        setPnlData(response.data)
    };

    useEffect(()=>{
        fetchData();
    }, [portfoliCode])

    return (
        <div style={{height: '900px', width: '100%', padding: 15}}>
            <div style={{display: 'flex'}}>
                <div style={{width: '50%', height: 400}}>
                    <PortfolioTransactionPnl data={findCumulativeSum(pnlResults)}/>
                </div>
                <div>

                </div>
            </div>

        </div>
    );
};

export default PortfolioReturnPage;