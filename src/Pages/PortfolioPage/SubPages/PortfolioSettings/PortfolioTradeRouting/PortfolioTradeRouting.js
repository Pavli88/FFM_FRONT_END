import {useContext, useEffect, useState} from "react";
import PortfolioTradeRoutingNew from "./PortfolioTradeRoutingNew/PortfolioTradeRoutingNew";
import './PortfolioTradeRouting.css'
import fetchAPI from "../../../../../config files/api";
import PortfolioContext from "../../../../../context/portfolio-context";
import TradeRoute from "./TradeRoute/TradeRoute";

const PortfolioTradeRouting = () => {
    const { selectedPortfolio } = useContext(PortfolioContext);
    const [showNewRouting, setShowNewRouting] = useState(false)
    const [tradeRoutes, setTradeRoutes] = useState([]);

    const records = tradeRoutes.map((data) => (
        <TradeRoute
            key={data.id}
            data={data}
            fetch={() => fetchTradeRoutes()}
        />
    ));

    const fetchTradeRoutes = async () => {

        const response = await fetchAPI.get('portfolios/get/trade_routes/', {
            params: {
                portfolio_code: selectedPortfolio.portfolio_code,
            }
        })
        setTradeRoutes(response.data)
    };

    useEffect(() => {
        fetchTradeRoutes();
    }, [selectedPortfolio])

    return (
        <div >
            <div >
                <table style={{width: '100%'}}>
                    <thead style={{width: '100%'}}>
                    <tr>
                        <th>
                            Security
                        </th>
                        <th>
                            Broker
                        </th>
                        <th>
                            Account
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            <button className={'normal-button'} onClick={() => setShowNewRouting(true)} style={{fontSize: 12}}>
                                New Routing
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody style={{width: '100%'}}>
                    {records}
                    </tbody>
                </table>
            </div>
            <PortfolioTradeRoutingNew
                show={showNewRouting}
                close={() => setShowNewRouting(!showNewRouting)}
                fetch={() => fetchTradeRoutes()}
            />
        </div>

    )
};
export default PortfolioTradeRouting;