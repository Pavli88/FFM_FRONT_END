import {useState, useRef, useContext} from "react";
import BrokerContext from "../../../context/broker-context";
import CustomModal from "../../../components/Modals/Modals";
import fetchAPI from "../../../config files/api";

const NewBrokerAccount = ({ show, close }) => {
    const { apiSupportedBrokers, fetchAccounts } = useContext(BrokerContext);
    const [env, setEnv] = useState('live');
    const [currency, setCurrency] = useState('USD');
    const [brokerName, setBrokerName] = useState('');  // State for selected broker name
    const accountNameRef = useRef();
    const accountNumberRef = useRef();
    const tokenRef = useRef();

    // Submit Handler
    const submitHandler = () => {
        if (!accountNameRef.current.value.trim()) {
            alert("Account Name is required.");
            accountNameRef.current.focus(); // Optionally focus the input
            return;
        }

        if (!accountNumberRef.current.value.trim()) {
            alert("Account Number is required.");
            accountNumberRef.current.focus(); // Optionally focus the input
            return;
        }

        if (!tokenRef.current.value.trim()) {
            alert("Token is required.");
            tokenRef.current.focus(); // Optionally focus the input
            return;
        }

        if (!brokerName) {
            alert("Broker has to be selected.");
            return;
        }
        fetchAPI.post('accounts/new_account/', {
            broker_name: brokerName,  // Use the selected broker
            account_number: accountNumberRef.current.value,
            account_name: accountNameRef.current.value,
            env: env,
            token: tokenRef.current.value,
            currency: currency,
        })
            .then(() => fetchAccounts())
            .catch((error) => {
                alert(error.response.data.message)
                console.error('Error Message:', error);
            });

        // Reset state after form submission
        setEnv('live');
        setCurrency('USD');
        setBrokerName('');
        close();
    };

    return (
        <CustomModal show={show} onClose={close} title={'New Transaction'}
                     footer={
                         <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={submitHandler}>
                             Save
                         </button>
                     }>
            <div style={{ height: '600px', overflowY: 'scroll', padding: 5 }}>
                {/* Broker Selection */}
                <div style={{ margin: 10 }}>
                    <label>Broker</label>
                    <select onChange={(e) => setBrokerName(e.target.value)}>
                        <option value="">Select Broker</option>
                        {apiSupportedBrokers.map((broker, index) => (
                            <option key={index} value={broker.broker_code}>
                                {broker.broker}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Account Name */}
                <div style={{ margin: 10 }}>
                    <label>Account Name</label>
                    <input ref={accountNameRef} type="text" />
                </div>

                {/* Account Number */}
                <div style={{ margin: 10 }}>
                    <label>Account Number</label>
                    <input ref={accountNumberRef} type="text" />
                </div>

                {/* Token */}
                <div style={{ margin: 10 }}>
                    <label>Token</label>
                    <input ref={tokenRef} type="text" />
                </div>

                {/* Environment */}
                <div style={{ margin: 10 }}>
                    <label>Environment</label>
                    <select onChange={(e) => setEnv(e.target.value)} value={env}>
                        <option value="live">Live</option>
                        <option value="demo">Demo</option>
                    </select>
                </div>

                {/* Currency */}
                <div style={{ margin: 10 }}>
                    <label>Currency</label>
                    <select onChange={(e) => setCurrency(e.target.value)} value={currency}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>

            </div>
        </CustomModal>
    );
};

export default NewBrokerAccount;