import BrokerContext from "../../../context/broker-context";
import {useContext, useState} from "react";
import {BsPencil, BsTrash} from "react-icons/bs";
import axios from "axios";
import ServerContext from "../../../context/server-context";
import './BrokerAccounts.css'
import {ButtonGroupVertical} from "../../../components/Buttons/ButtonGroups";
import NewBrokerAccount from "./NewBrokerAccount";
import NewCounterParty from "./NewCounterParty";

const BrokerAccounts = () => {
    const server = useContext(ServerContext).server;
    const { apiNotSupportedBrokers, fetchAccounts, fetchBrokers, accounts } = useContext(BrokerContext);
    const [showNewAccountModal, setShowNewAccountModal] = useState(false);
    const [showCounterPartyModal, setShowCounterPartyModal] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const deleteAccount = (id) => {
        const token = localStorage.getItem("access");
        axios.post(`${server}accounts/delete/`, { id }, {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(() => {
                fetchAccounts()})
            .catch((error) => console.error("Error:", error));
    };

    const deleteBroker = (id) => {
        const token = localStorage.getItem("access");
        axios.post(`${server}accounts/delete/broker/`, { id }, {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(() => {
                fetchBrokers()})
            .catch((error) => console.error("Error:", error));
    };

    const editAccount = (id) => {
        setEditingId(id);
        console.log(`Editing account with ID: ${id}`);
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
                                    <button className=" edit-button" onClick={() => editAccount(data.id)}>
                                        <BsPencil/>
                                    </button>
                                    <button className=" delete-button" onClick={() => deleteBroker(data.id)}>
                                        <BsTrash/>
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
                                    <button className=" edit-button" onClick={() => editAccount(data.id)}>
                                        <BsPencil/>
                                    </button>
                                    <button className=" delete-button" onClick={() => deleteAccount(data.id)}>
                                        <BsTrash/>
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
        </div>
    );
};

export default BrokerAccounts;