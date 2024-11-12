import {useContext, useEffect, useState} from "react";
import axios from "axios";
import ServerContext from "../../../../context/server-context";
import PortfolioPageContext from "../../context/portfolio-page-context";
import PortfolioDrawdown from "./PortfolioDrawdown/PortfolioDrawdown";
import {PieChartGrouped} from "../../../../components/Charts/PieCharts";
import {PositionExposures} from "../../../../components/Widgets/Risk/PositionExposures";

const PortfolioRiskPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const portfolioCode = useContext(PortfolioPageContext).portfolioCode;
    const currentHoldingData = useContext(PortfolioPageContext).currentHolding;
    const [drawDownData, setDrawDownData] = useState([]);

    const fetchDrawdown = async () => {
        const response = await axios.get(`${server}portfolios/get/drawdown/`, {
            params: {
                portfolio_code: portfolioCode
            }
        })
        setDrawDownData(response.data['drawdowns'])
    };

    useEffect(() => {
        fetchDrawdown();
    }, [portfolioCode])


    return (
        <div style={{height: '100%', width: '100%', padding: 15, overflowY: 'scroll'}}>
            <p>Exposures</p>
            <div style={{display: "flex"}}>

                <div className={'card'}>
                    <div className={'card-header'}>
                        Instrument Type Exposure
                    </div>
                    <PieChartGrouped data={currentHoldingData} groupBy="type" value="weight"/>
                </div>
            </div>

            <p>Drawdown</p>
            <div style={{height: 300, display: "flex", width: "100%", paddingBottom: 15}}>
                <div style={{width: "100%", paddingLeft: 15}}>
                    <PortfolioDrawdown data={drawDownData}/>
                </div>
            </div>

            <PositionExposures portfolioCodes={[portfolioCode]} server={server}/>

        </div>
    );
};

export default PortfolioRiskPage;