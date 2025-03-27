import {useContext, useEffect, useMemo, useRef, useState} from "react";
import PortfolioTradeRoutingNew from "./PortfolioTradeRoutingNew/PortfolioTradeRoutingNew";
import Select from "react-select";
import {BsFillCaretRightFill, BsFillPauseFill, BsTrash, BsArrowRepeat, BsPlus} from "react-icons/bs";
import './PortfolioTradeRouting.css'
import Form from "react-bootstrap/Form";
import fetchAPI from "../../../../../config files/api";
import BrokerContext from "../../../../../context/broker-context";
import PortfolioPageContext from "../../../context/portfolio-page-context";
import PortfolioContext from "../../../../../context/portfolio-context";

const TradeRoute = (props) => {
    const [data, setData] = useState(props.data);
    const { accounts, apiSupportedBrokers } = useContext(BrokerContext);;
    const [brokerAccounts, setBrokerAccounts] = useState([]);

    const brokerOptions = useMemo(
        () =>
            apiSupportedBrokers.map((data) => (
                <option key={data.broker_code} value={data.broker_code}>
                    {data.broker}
                </option>
            )),
        [apiSupportedBrokers]
    );

    const updateRouting = async () => {
        const response = await fetchAPI.post('portfolios/update/trade_routing/', data)
    };

    const loadAccounts = async(broker) => {
        const response = await  fetchAPI.get('accounts/get/accounts/', {
            params: {
                broker_name: broker
            }
        })
        setBrokerAccounts(response.data)
    };

    const deleteRouting = async(id) => {
        const response = await fetchAPI.post('portfolios/delete/trade_routing/', {
            id: id
        })
        props.fetch();
    };

    const accountValues = accounts.map((data) => ({value: data['id'], label: data['account_number']}))

    return (
        <tr>
            <td className={'table-row'}>
                {data.name}
            </td>
            <td className={'table-row'}>
                {data.source_ticker}
            </td>
            <td>
                <select
                    // value={portfolioData.currency}
                    options={brokerOptions}
                    placeholder={data.source}
                    onChange={(e) => {
                        setData({
                            ...data,
                            source: e.value
                        })
                        loadAccounts(e.value)
                    }}
                >
                </select>
            </td>
            <td style={{width: 300}}>
                <Select
                    options={accounts}
                    placeholder={data.account_number}
                    onChange={(e) => setData({
                        ...data,
                        broker_account_id: e.value
                    })}
                >
                </Select>
            </td>
            <td>
                <Form.Control
                    type={'number'}
                    value={data.quantity}
                    onChange={(e) => setData({
                        ...data,
                        quantity: e.target.value
                    })}
                    min={0.0}
                />
            </td>
            <td>
                <div style={{display: 'flex'}}>
                    <div style={{width: '33%', padding: 2}}>
                        <button className="icon-button"
                        onClick={() => {setData({...data, is_active: data.is_active === 1 ? 0 : 1})
                        }}> {data.is_active === 1 ?
                    <BsFillCaretRightFill size={20}/> : <BsFillPauseFill size={20}/>}</button>
                    </div>
                    <div style={{width: '33%', padding: 2}}>
                        <button className="icon-button" onClick={() => updateRouting()}><BsArrowRepeat size={20}/></button>
                    </div>
                    <div style={{width: '33%', padding: 2}}>
                        <button className={'icon-button'} onClick={() => deleteRouting(data['id'])}><BsTrash size={20}/></button>
                    </div>
                </div>
            </td>
        </tr>
    );
};

const PortfolioTradeRouting = () => {
    const portfolioData = useContext(PortfolioContext).selectedPortfolio;
    const [showNewRouting, setShowNewRouting] = useState(false)
    const [tradeRoutes, setTradeRoutes] = useState([]);

    const records = tradeRoutes.map((data) => <TradeRoute data={data} fetch={() => fetchTradeRoutes()}/>)

    const fetchTradeRoutes = async () => {
        const response = await fetchAPI.get('portfolios/get/trade_routes/', {
            params: {
                portfolio_code: portfolioData.portfolio_code,
            }
        })
        setTradeRoutes(response.data)
    };

    useEffect(() => {
        fetchTradeRoutes();
    }, [portfolioData.portfolio_code])

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
                            Ticker
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
            <PortfolioTradeRoutingNew show={showNewRouting} close={() => setShowNewRouting(!showNewRouting)}/>
        </div>

    )
};
export default PortfolioTradeRouting;