import BrokerContext from "../../../context/broker-context";
import {useContext, useState} from "react";
import {BsPencil, BsTrash} from "react-icons/bs";
import NewBrokerAccount from "./NewBrokerAccount";
import NewCounterParty from "./NewCounterParty";
import fetchAPI from "../../../config files/api";
import AccountContext from "../context/account-context";
import EditAccount from "./EditAccount";

const BrokerAccounts = () => {
    const { apiNotSupportedBrokers, fetchAccounts, fetchBrokers, accounts } = useContext(BrokerContext);
    const { saveSelectedAccount } = useContext(AccountContext);
    const [showNewAccountModal, setShowNewAccountModal] = useState(false);
    const [showCounterPartyModal, setShowCounterPartyModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const deleteAccount = (id) => {
        fetchAPI.post('accounts/delete/', { id })
            .then(() => {
                fetchAccounts()})
            .catch((error) => console.error("Error:", error));
    };

    const deleteBroker = (id) => {
        fetchAPI.post('accounts/delete/broker/', { id })
            .then(() => {
                fetchBrokers()})
            .catch((error) => console.error("Error:", error));
    };

    const editAccount = (accountData) => {
        saveSelectedAccount(accountData);
        setShowEditModal(!showEditModal)
    };

    return (
        <div className="card">
            <div style={{display: "flex"}}>
                <div className="table-container" style={{width: 1000, paddingRight: 15}}>
                    <div className="card-header"
                         style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <span>Counterparty</span>
                        <div style={{ width: 400, display: 'flex', justifyContent: 'flex-end' }}>
                            <button className={'icon-button'} onClick={() => setShowCounterPartyModal(!showCounterPartyModal)}>Add</button>
                        </div>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th hidden>ID</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {apiNotSupportedBrokers.map((data) => (
                            <tr key={data.id}>
                                <td hidden>{data.id}</td>
                                <td>{data.broker}</td>
                                <td>{data.broker_code}</td>
                                <td>{data.type}</td>
                                <td className="action-buttons">
                                    <button className="icon-button" title={'Edit'}>
                                        <BsPencil size={20}/>
                                    </button>
                                    <button className="icon-button" onClick={() => deleteBroker(data.id)} title={'Delete'}>
                                        <BsTrash size={20}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="table-container" style={{width: '100%'}}>
                    <div className="card-header" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        Broker Accounts
                        <div style={{ width: 400, display: 'flex', justifyContent: 'flex-end' }}>
                            <button className={'icon-button'} onClick={() => setShowNewAccountModal(!showNewAccountModal)}>Add</button>
                        </div>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th hidden>ID</th>
                            <th>Broker</th>
                            <th>Name</th>
                            <th>Account ID</th>
                            <th>Token</th>
                            <th>Currency</th>
                            <th>Env</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {accounts.map((data) => (
                            <tr key={data.id}>
                                <td hidden>{data.id}</td>
                                <td>{data.broker_name}</td>
                                <td>{data.account_name}</td>
                                <td>{data.account_number}</td>
                                <td>{data.access_token}</td>
                                <td>{data.currency}</td>
                                <td>{data.env}</td>
                                <td className="action-buttons">
                                    <button className="icon-button" onClick={() => editAccount(data)}>
                                        <BsPencil size={20}/>
                                    </button>
                                    <button className="icon-button" onClick={() => deleteAccount(data.id)}>
                                        <BsTrash size={20}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <NewBrokerAccount show={showNewAccountModal} close={() => setShowNewAccountModal(!showNewAccountModal)}/>
            <NewCounterParty show={showCounterPartyModal} close={() => setShowCounterPartyModal(!showCounterPartyModal)}/>
            <EditAccount show={showEditModal} close={() => setShowEditModal(!showEditModal)}/>
        </div>
    );
};

export default BrokerAccounts;