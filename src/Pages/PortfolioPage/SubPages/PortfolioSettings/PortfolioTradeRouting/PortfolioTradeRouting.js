import {useContext, useEffect, useRef, useState} from "react";
import PortfolioTradeRoutingNew from "./PortfolioTradeRoutingNew/PortfolioTradeRoutingNew";
import Select from "react-select";
import {BsFillCaretRightFill, BsFillPauseFill, BsTrash, BsArrowRepeat, BsPlus} from "react-icons/bs";
import './PortfolioTradeRouting.css'
import Form from "react-bootstrap/Form";
import ServerContext from "../../../../../context/server-context";
import PortfolioPageContext from "../../../context/portfolio-page-context";
import axios from "axios";


const TradeRoute = (props) => {
    const server = useContext(ServerContext)['server'];
    const [data, setData] = useState(props.data);
    const [brokerAccounts, setBrokerAccounts] = useState([]);

    const brokerOptions = [
        { value: 'oanda', label: 'Oanda' },
        { value: 'tasty', label: 'Tasty Trade' },
    ];

    const updateRouting = async () => {
        const response = await axios.post(server + 'portfolios/update/trade_routing/', data)
    };

    const loadAccounts = async(broker) => {
        const response = await  axios.get(server + 'accounts/get/accounts/', {
            params: {
                broker_name: broker
            }
        })
        setBrokerAccounts(response.data)
    };

    const deleteRouting = async(id) => {
        const response = await axios.post(server + 'portfolios/delete/trade_routing/', {
            id: id
        })
        props.fetch();
    };

    const accounts = brokerAccounts.map((data) => ({value: data['id'], label: data['account_number']}))

    return (
        <tr>
            <td className={'table-row'}>
                {data.name}
            </td>
            <td className={'table-row'}>
                {data.source_ticker}
            </td>
            <td>
                <Select
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
                </Select>
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
                        <button className="action-button add-button"
                        onClick={() => {setData({...data, is_active: data.is_active === 1 ? 0 : 1})
                        }}> {data.is_active === 1 ?
                    <BsFillCaretRightFill/> : <BsFillPauseFill/>}</button>
                    </div>
                    <div style={{width: '33%', padding: 2}}>
                        <button className="action-button edit-button" onClick={() => updateRouting()}><BsArrowRepeat/></button>
                    </div>
                    <div style={{width: '33%', padding: 2}}>
                        <button className={'delete-button'} onClick={() => deleteRouting(data['id'])}><BsTrash/></button>
                    </div>
                </div>
            </td>
        </tr>
    );
};

const PortfolioTradeRouting = (props) => {
    const server = useContext(ServerContext)['server'];
    const portfolioCode = useContext(PortfolioPageContext).portfolioCode;
    const [newRoutingModalStatus, setNewRoutingModalStatus] = useState(false)
    const [tradeRoutes, setTradeRoutes] = useState([]);
    const records = tradeRoutes.map((data) => <TradeRoute data={data} fetch={() => fetchTradeRoutes()}/>)

    const fetchTradeRoutes = async () => {
        const response = await axios.get(server + 'portfolios/get/trade_routes/', {
            params: {
                portfolio_code: portfolioCode,
            }
        })
        setTradeRoutes(response.data)
    };

    useEffect(() => {
        fetchTradeRoutes();
    }, [portfolioCode])

    return (
        <div className={'portfolio-trade-routing-container'}>
            <div style={{overflow: "scroll", height: '620px'}}>
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
                            <button className={'normal-button'} onClick={() => setNewRoutingModalStatus(true)} style={{fontSize: 12}}>
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
            <PortfolioTradeRoutingNew show={newRoutingModalStatus} hide={() => {
                setNewRoutingModalStatus(false);
                fetchTradeRoutes();
            }}/>
        </div>

    )
};
export default PortfolioTradeRouting;