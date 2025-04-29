import { BsEye, BsEyeSlash, BsPencil, BsTrash, BsPlus } from 'react-icons/bs';
import NewBrokerCredentials from "./NewBrokerCredentials";
import {useContext, useState} from "react";
import fetchAPI from "../../../config files/api";
import BrokerContext from "../../../context/broker-context";

const BrokerCredentials = () => {
    const {brokerCredentials, fetchBrokersCredentials} = useContext(BrokerContext);
    const [showModal, setShowModal] = useState(false);
    const [visiblePasswords, setVisiblePasswords] = useState({});

    const deleteCredential = (id) => {
        fetchAPI.delete('accounts/credentials', {
            data: {id}
        })
            .then(() => {
                fetchBrokersCredentials()
            })
            .catch((error) => console.error("Error:", error));
    };

    const togglePasswordVisibility = (id) => {
        setVisiblePasswords(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const editCrendential = (accountData) => {
        setShowModal(!showModal)
    };

    return (
        <div className="table-container" style={{width: '100%'}}>
            <div className="card-header"
                 style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                Broker Credentials
                <div style={{width: 400, display: 'flex', justifyContent: 'flex-end'}}>
                    <button className={'icon-button'}
                            onClick={() => setShowModal(!showModal)}><BsPlus size={20}
                                                                             title={'New Credentials'}
                    />
                    </button>
                </div>
            </div>
            <table>
                <thead>
                <tr>
                    <th hidden>ID</th>
                    <th>Broker</th>
                    <th>Environment</th>
                    <th>Api Token</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Expiry Date</th>
                </tr>
                </thead>
                <tbody>
               {brokerCredentials && brokerCredentials.length > 0 ? (
                        brokerCredentials.map((data) => (
                            <tr key={data.id}>
                                <td hidden>{data.id}</td>
                                <td>{data.broker?.broker || data.broker_name}</td>
                                <td>{data.environment}</td>
                                <td>{data.api_token}</td>
                                <td>{data.email}</td>

                                <td>
                                    {visiblePasswords[data.id] ? data.password : '••••••••'}
                                    <button
                                        onClick={() => togglePasswordVisibility(data.id)}
                                        style={{ marginLeft: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
                                    >
                                        {visiblePasswords[data.id] ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                                    </button>
                                </td>

                                <td>{data.expiry_date}</td>
                                <td className="action-buttons">
                                    <button className="icon-button" onClick={() => editCrendential(data)}>
                                        <BsPencil size={20} />
                                    </button>
                                    <button className="icon-button" onClick={() => deleteCredential(data.id)}>
                                        <BsTrash size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>No broker credentials available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <NewBrokerCredentials show={showModal} close={() => setShowModal(!showModal)}/>
        </div>
    )
}
export default BrokerCredentials;