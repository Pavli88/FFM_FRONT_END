import PositionExposure from "./PositionExposure/PositionExposure";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import ServerContext from "../../../../context/server-context";
import PortfolioPageContext from "../../context/portfolio-page-context";

const PortfolioRiskPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const [exposureData, setExposureData] = useState({dates: [], series:[{name:'', data: []}]});

    const fetchExposures = async () => {
        const response = await axios.get(server + 'portfolios/get/exposures/', {
            params: {
                start_date: '2023-01-01',
                portfolio_code: portfoliCode
            }
        })
        setExposureData(response.data)
    };

    useEffect(() => {
        fetchExposures();
    }, [])

    return (
        <div style={{height: '800px', width: '100%', padding: 15}}>
            <PositionExposure data={exposureData}/>
        </div>
    );
};

export default PortfolioRiskPage;