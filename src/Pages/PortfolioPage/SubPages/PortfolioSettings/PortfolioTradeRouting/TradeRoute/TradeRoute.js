import {useContext, useState} from "react";
import BrokerContext from "../../../../../../context/broker-context";
import fetchAPI from "../../../../../../config files/api";
import {BsArrowRepeat, BsFillCaretRightFill, BsFillPauseFill, BsTrash} from "react-icons/bs";
import './TradeRoute.css';
import PortfolioContext from "../../../../../../context/portfolio-context";

const TradeRoute = ({ data, fetch }) => {
    const { selectedPortfolio } = useContext(PortfolioContext);
    const [formData, setData] = useState({
        id: data.id,
        portfolio_code : selectedPortfolio.portfolio_code,
        name: data.name,
        source: data.source,
        quantity: parseFloat(data.quantity),
        is_active: data.is_active,
        broker_account_id: parseFloat(data.broker_account_id)
    });
    const { accounts, apiSupportedBrokers } = useContext(BrokerContext);

    const brokerOptions = apiSupportedBrokers.map(broker => (
        <option key={broker.broker_code} value={broker.id}>
            {broker.broker}
        </option>
    ));

    const accountOptions = accounts.map(account => (
        <option key={account.id} value={account.id}>
            {account.account_name} - {account.account_number} ({account.env}, {account.currency})
        </option>
    ));

    const updateRouting = async () => {
        // await fetchAPI.post('portfolios/update/trade_routing/', formData);
    };

    const deleteRouting = async (id) => {
        await fetchAPI.post('portfolios/delete/trade_routing/', { id });
        fetch();
    };

    return (
        <tr className="trade-row">
            <td className="trade-cell"><label>{formData.name}</label></td>

            <td className="trade-cell">
                <div className="select-wrapper">
                    <select
                        className="styled-select"
                        value={formData.source || ''}
                        onChange={(e) => setData(prev => ({ ...prev, broker_account_id: e.target.value }))}
                    >
                        {brokerOptions}
                    </select>
                </div>
            </td>

            <td className="trade-cell">
                <div className="select-wrapper">
                    <select
                        className="styled-select"
                        value={formData.broker_account_id || ''}
                        onChange={(e) =>

                            setData(prev => ({
                                ...prev,
                                broker_account_id: e.target.value
                            }))
                        }
                    >
                        <option value="">Select Account</option>
                        {accountOptions}
                    </select>
                </div>
            </td>

            <td className="trade-cell">
                <input
                    className="styled-input"
                    type="number"
                    value={formData.quantity}
                    min={0}
                    onChange={(e) =>
                        setData(prev => ({
                            ...prev,
                            quantity: e.target.value
                        }))
                    }
                />
            </td>

            <td className="trade-cell">
                <div style={{display: "flex", gap: 10}}>
                    <button
                        className={`icon-button ${formData.is_active === 1 ? 'active' : 'inactive'}`}
                        title="Toggle Active"
                        onClick={() =>
                            setData(prev => ({
                                ...prev,
                                is_active: prev.is_active === 1 ? 0 : 1
                            }))
                        }
                    >
                        {formData.is_active === 1 ? <BsFillCaretRightFill size={20}/> : <BsFillPauseFill size={20}/>}
                    </button>
                    <button className="icon-button" title="Update" onClick={updateRouting}>
                        <BsArrowRepeat size={20}/>
                    </button>
                    <button className="icon-button" title="Delete" onClick={() => deleteRouting(formData.id)}>
                        <BsTrash size={20}/>
                    </button>
                </div>
            </td>
        </tr>
    );
};
export default TradeRoute;