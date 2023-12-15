import PositionExposure from "./PositionExposure/PositionExposure";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import ServerContext from "../../../../context/server-context";
import PortfolioPageContext from "../../context/portfolio-page-context";
import PortfolioDrawdown from "./PortfolioDrawdown/PortfolioDrawdown";
import PortfolioHoldingDrawdown from "./PortfolioHoldingDrawDown/PortfolioHoldingDrawDown";

const PortfolioRiskPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const [drawDownData, setDrawDownData] = useState({'data': []});
    const [holdingDrawDown, setHoldingDrawDown] = useState([]);

    const fetchDrawdown = async () => {
        const response = await axios.get(server + 'portfolios/get/drawdown/', {
            params: {
                start_date: '2023-01-01',
                portfolio_code: portfoliCode
            }
        })
        setDrawDownData(response.data)
    };

    const fetchNavData = async() => {
        const response = await axios.get(server + 'portfolios/get/nav/', {
            params: {
                date__gte: "2023-01-01",
                portfolio_code: portfoliCode
            }
        })
        setHoldingDrawDown(response.data)

    };

    const hD= holdingDrawDown.map(data => data['total'] === 0 ? 0: ((data['holding_nav'] / data['total']) -1) * 100)
    const hDDate = holdingDrawDown.map(data => data['date'])

    useEffect(() => {
        fetchDrawdown();
        fetchNavData();
    }, [portfoliCode])

    return (
        <div style={{height: '100%', width: '100%', padding: 15, overflowY: 'scroll'}}>
            <div style={{height: 300, display: "flex", width: "100%", paddingBottom: 15}}>
                <div style={{width: "100%"}}>
                    <PortfolioHoldingDrawdown data={hD} dates={hDDate}/>
                </div>
                <div style={{width: "100%", paddingLeft: 15}}>
                    <PortfolioDrawdown data={drawDownData['data']} dates={drawDownData['dates']}/>
                </div>
            </div>
            <PositionExposure server={server}/>
        </div>
    );
};

export default PortfolioRiskPage;