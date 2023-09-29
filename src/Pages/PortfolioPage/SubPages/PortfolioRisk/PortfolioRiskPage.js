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
    const [exposureData, setExposureData] = useState({dates: [], series:[{name:'', data: []}]});
    const [drawDownData, setDrawDownData] = useState({'data': []});
    const [holdingDrawDown, setHoldingDrawDown] = useState([]);

    const fetchExposures = async () => {
        const response = await axios.get(server + 'portfolios/get/exposures/', {
            params: {
                start_date: '2023-01-01',
                portfolio_code: portfoliCode
            }
        })
        setExposureData(response.data)
    };

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
        fetchExposures();
        fetchDrawdown();
        fetchNavData();
    }, [])

    return (
        <div style={{height: '800px', width: '100%', padding: 15}}>
            <div style={{height: '50%'}}>
                <PositionExposure data={exposureData}/>
            </div>
            <div style={{display: "flex", height: '50%', width: "100%"}}>
                <div style={{width: "100%",paddingTop: 15}}>
                    <PortfolioDrawdown data={drawDownData['data']} dates={drawDownData['dates']}/>
                </div>
                <div style={{width: "100%", paddingTop: 15, paddingLeft: 15}}>
                    <PortfolioHoldingDrawdown data={hD} dates={hDDate}/>
                </div>
            </div>
        </div>
    );
};

export default PortfolioRiskPage;