import React, {useState, useEffect, useContext} from "react";
import ServerContext from "./server-context";
import axios from "axios";

const PortfolioData = (props) => {

    const server = useContext(ServerContext)['server'];
    const [portfolioData, setPortfolioData] = useState([]);

    console.log(portfolioData)

    useEffect(() => {
            axios.get(server + 'portfolios/get_portfolio_data/')
                .then(response => setPortfolioData(response['data']))

                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        portfolioData
    );

};

const PortfolioContext = React.createContext({
    data: PortfolioData,
});

export default PortfolioContext;