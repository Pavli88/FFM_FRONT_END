import {useContext, useState} from "react";
import BrokerContext from "../../../context/broker-context";
import fetchAPI from "../../../config files/api";
import CustomModal from "../../../components/Modals/Modals";

const NewBrokerCredentials = ({ show, close }) => {
    const { apiSupportedBrokers, fetchBrokersCredentials } = useContext(BrokerContext);

    const [formData, setFormData] = useState({
        api_token: null,
        environment: null,
        broker: null,
        email: null,
        password: null,
    });

    const handleChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const submitHandler = () => {
        fetchAPI.post('accounts/credentials', formData)
            .then(() => fetchBrokersCredentials())
            .catch((error) => {
                alert(error.response.data.message)
                console.error('Error Message:', error);
            });

        // Reset state after form submission
        setFormData({
            api_token: null,
            environment: null,
            broker: null,
            email: null,
            password: null,
        });
        close();
    };

    return (
        <CustomModal show={show} onClose={close} title={'New Credential'}
                     footer={
                         <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={submitHandler}>
                             Save
                         </button>
                     }>
            <div style={{ height: '600px', overflowY: 'scroll', padding: 5 }}>
                {/* Broker Selection */}
                <div style={{ margin: 10 }}>
                    <label>Broker</label>
                    <select onChange={(e) => handleChange('broker', e.target.value)}>
                        <option value="">Select Broker</option>
                        {apiSupportedBrokers.map((broker, index) => (
                            <option key={index} value={broker.id}>
                                {broker.broker}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Token */}
                <div style={{ margin: 10 }}>
                    <label>Token</label>
                    <input  onChange={(e) => handleChange('api_token', e.target.value)} type="text" />
                </div>

                <div style={{ margin: 10 }}>
                    <label>Environment</label>
                    <select onChange={(e) => handleChange('environment', e.target.value)}>
                        <option value={''}>Select environment...</option>
                        <option value="Live">Live</option>
                        <option value="Demo">Demo</option>
                    </select>
                </div>

                <div style={{ margin: 10 }}>
                    <label>Email</label>
                    <input onChange={(e) => handleChange('email', e.target.value)} type="email" />
                </div>

                <div style={{ margin: 10 }}>
                    <label>Password</label>
                    <input onChange={(e) => handleChange('password', e.target.value)} type="password" />
                </div>

            </div>
        </CustomModal>
    );
};
export default NewBrokerCredentials;