import BrokerContext from "../../../context/broker-context";
import {useContext, useState} from "react";
import {BsPencil, BsTrash} from "react-icons/bs";
import axios from "axios";
import ServerContext from "../../../context/server-context";
import './BrokerAccounts.css'

const BrokerAccounts = () => {
    const server = useContext(ServerContext).server;
    const { saveAccount, newAccount, accounts } = useContext(BrokerContext);

    const [editingId, setEditingId] = useState(null);

    const deleteAccount = (id) => {
        axios.post(`${server}accounts/delete/`, { id })
            .then((response) => {
                if (response.data === "Account is deleted") {
                    saveAccount(newAccount + 1);
                    alert(response.data);
                }
            })
            .catch((error) => console.error("Error:", error));
    };

    const editAccount = (id) => {
        setEditingId(id);
        console.log(`Editing account with ID: ${id}`);
    };

    return (
        <div className="card">
            <div className="card-header">Accounts</div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Broker</th>
                            <th>Name</th>
                            <th>Account ID</th>
                            <th>Token</th>
                            <th>Currency</th>
                            <th>Env</th>
                            <th>Margin</th>
                            <th>Margin %</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.broker_name}</td>
                                <td>{data.account_name}</td>
                                <td>{data.account_number}</td>
                                <td>{data.access_token}</td>
                                <td>{data.currency}</td>
                                <td>{data.env}</td>
                                <td>{data.margin_account ? "Margin Allowed" : "Margin Disabled"}</td>
                                <td>{data.margin_percentage}</td>
                                <td className="action-buttons">
                                    <button className=" edit-button" onClick={() => editAccount(data.id)}>
                                        <BsPencil />
                                    </button>
                                    <button className=" delete-button" onClick={() => deleteAccount(data.id)}>
                                        <BsTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BrokerAccounts;