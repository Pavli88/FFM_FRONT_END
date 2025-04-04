import CustomModal from "../../../components/Modals/Modals";
import fetchAPI from "../../../config files/api";
import React, {useContext, useState, useEffect} from "react";
import BrokerContext from "../../../context/broker-context";
import AccountContext from "../context/account-context";
import InputField from "../../../components/InputField/InputField";

const EditAccount = ({show, close}) => {
    const {apiSupportedBrokers, fetchAccounts} = useContext(BrokerContext);
    const {selectedAccount} = useContext(AccountContext);

    const [formData, setFormData] = useState(selectedAccount);

    useEffect(() => {
        setFormData(selectedAccount);
    }, [selectedAccount]);

    const submitHandler = async () => {
        try {
            const response = await fetchAPI.put(`/accounts/${formData.id}/update/`, formData);
            fetchAccounts()
            close();
        } catch (error) {
            console.error('Error updating account:', error.response?.data || error.message);
            alert(error.response?.data?.error || 'Something went wrong!');
        }
    };

    const handleChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const brokers = apiSupportedBrokers.map((data) =>
        <option key={data.id} value={data.broker_code}>{data.broker}</option>
    )

    return (
        <CustomModal show={show} onClose={close} title={'Update Account'}
                     footer={
                         <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={submitHandler}>
                             Save
                         </button>
                     }>
            {formData && (
            <>
                <div className={'block'}>
                    <label>Brokers</label>
                    <select
                        value={formData.broker_name || ''}
                        onChange={(e) =>
                            setFormData(prevState => ({
                                ...prevState,
                                broker_name: e.target.value,
                            }))
                        }
                    >
                        <option value="">Select Broker</option>
                        {brokers}
                    </select>
                </div>

                <InputField
                    id="account_name"
                    type="text"
                    value={formData.account_name || ''}
                    onChange={(e) => handleChange('account_name', e.target.value)}
                    label="Account Name"
                    required
                />

                {/*<InputField*/}
                {/*    id="account_number"*/}
                {/*    type="text"*/}
                {/*    value={formData.account_number || ''}*/}
                {/*    onChange={(e) => handleChange('account_number', e.target.value)}*/}
                {/*    label="Account Number"*/}
                {/*    required*/}
                {/*/>*/}

                <InputField
                    id="token"
                    type="text"
                    value={formData.access_token || ''}
                    onChange={(e) => handleChange('access_token', e.target.value)}
                    label="Token"
                    required
                />
            </>
        )}

        </CustomModal>
    )
};
export default EditAccount;