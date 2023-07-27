import PositionExposure from "./PositionExposure/PositionExposure";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import ServerContext from "../../../../context/server-context";
import PortfolioPageContext from "../../context/portfolio-page-context";
import PortfolioDrawdown from "./PortfolioDrawdown/PortfolioDrawdown";


const PortfolioRiskPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const [exposureData, setExposureData] = useState({dates: [], series:[{name:'', data: []}]});
    const [drawDownData, setDrawDownData] = useState({'data': []});

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

    useEffect(() => {
        fetchExposures();
        fetchDrawdown();
    }, [])

    return (
        <div style={{height: '800px', width: '100%', padding: 15}}>
            <div style={{height:'50%'}}>
                <PositionExposure data={exposureData}/>
            </div>
            <div style={{height:'50%', paddingTop: 15}}>
                <PortfolioDrawdown data={drawDownData['data']} dates={drawDownData['dates']}/>
            </div>
        </div>
    );
};

export default PortfolioRiskPage;