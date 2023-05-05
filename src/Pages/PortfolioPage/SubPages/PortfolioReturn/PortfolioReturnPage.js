import PortfolioTransactionPnl from "./PortfolioTransactionPnl/PortfolioTransactionPnl";
import {useContext, useEffect, useState} from "react";
import PortfolioPageContext from "../../context/portfolio-page-context";
import ServerContext from "../../../../context/server-context";
import axios from "axios";

const PortfolioReturnPage = () => {
    const server = useContext(ServerContext)['server'];
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const [pnlData, setPnlData] = useState([{}]);

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
                    <PortfolioTransactionPnl data={pnlData}/>
                </div>
                <div>

                </div>
            </div>

        </div>
    );
};

export default PortfolioReturnPage;