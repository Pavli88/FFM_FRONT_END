import CustomModal from "../../../../../../components/Modals/Modals";
import {useContext, useMemo, useState} from "react";
import DateContext from "../../../../../../context/date-context";
import InstrumentSearch from "../../../../../../components/Search/InstrumentSearch/InstrumentSearch";
import ToogleSwitch from "../../../../../../components/Buttons/SliderButton/ToogleSwitch";
import BuySellButtonGroup from "../../../../../../components/Buttons/BuySellButtonGroup/BuySellButtonGroup";
import fetchAPI from "../../../../../../config files/api";
import BrokerContext from "../../../../../../context/broker-context";
import PortfolioContext from "../../../../../../context/portfolio-context";
import InputField from "../../../../../../components/InputField/InputField";

const PortfolioTransactionEntryModal = ({ show, close }) => {
    const { currentDate } = useContext(DateContext);
    const { selectedPortfolio } = useContext(PortfolioContext);
    const { accounts, brokerData } = useContext(BrokerContext);

    const [formData, setFormData] = useState({
        transactionType: 'Purchase',
        instrumentData: {},
        broker: '',
        active: false,
        trade_date: currentDate,
        quantity: 1,
        price: 1,
        fx_rate: 1.0,
        broker_id: '',
        account_id: ''
    });

    // Filters accounts dynamically based on the selected broker
    const filteredAccounts = useMemo(() => {
        return accounts.filter((account) => account.broker_name === formData.broker);
    }, [formData.broker, accounts]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => {
            let updatedValue = type === 'checkbox' ? checked : value;
            let updatedOptional = { ...prev.optional };

            if (name === 'broker_id' || name === 'active') {
                if (updatedValue !== '') {
                    updatedOptional[name === 'broker_id' ? 'broker_id' : 'is_active'] = updatedValue;
                } else {
                    delete updatedOptional[name === 'broker_id' ? 'broker_id' : 'is_active'];
                }
            }

            // Reset account_id when broker changes
            if (name === 'broker') {
                return {
                    ...prev,
                    [name]: updatedValue,
                    account_id: '', // Reset account when broker changes
                    optional: Object.keys(updatedOptional).length ? updatedOptional : {}
                };
            }

            return {
                ...prev,
                [name]: updatedValue,
                optional: Object.keys(updatedOptional).length ? updatedOptional : {}
            };
        });
    };

    const handleInstrumentSelect = (instrument) => {
        setFormData((prev) => ({ ...prev, instrumentData: instrument }));
    };

    const handleTransactionTypeChange = (value) => {
        setFormData((prev) => ({ ...prev, transactionType: value }));
    };

    const submitHandler = async () => {

        if (Object.keys(formData.instrumentData).length === 0) {
            alert("Please select an instrument.");
            return;
        }

        if (!formData.broker) {
            alert("Please select a broker.");
            return;
        }

        const parameters = {
            portfolio_code: selectedPortfolio.portfolio_code,
            portfolio_id: selectedPortfolio.id,
            security: formData.instrumentData.id,
            quantity: parseFloat(formData.quantity),
            price: parseFloat(formData.price),
            fx_rate: parseFloat(formData.fx_rate),
            trade_date: formData.trade_date,
            transaction_type: formData.transactionType,
            broker: formData.broker,
            optional: {
                ...formData.optional,
                account_id: formData.account_id || undefined,
                is_active: formData.active
            }
        };

        // console.log(parameters);
        const response = await fetchAPI.post('portfolios/transactions/new/', parameters);

        if (response.data.success) {
            setFormData({
                transactionType: 'Purchase',
                instrumentData: {},
                broker: '',
                active: false,
                trade_date: currentDate,
                quantity: '',
                price: '',
                fx_rate: 1.0,
                broker_id: '',
                account_id: '',
                optional: {}
            });
            close();
            console.log('CLOSING');
        }
    };

    const brokerOptions = useMemo(
        () => brokerData.map((data) => <option key={data.broker_code} value={data.broker_code}>{data.broker}</option>),
        [brokerData]
    );

    const accountOptions = useMemo(
        () => filteredAccounts.map((account) => (
            <option key={account.id} value={account.id}>
                {account.account_name} ({account.account_number})
            </option>
        )),
        [filteredAccounts]
    );

    return (
        <CustomModal show={show} onClose={close} title="New Transaction"
                     footer={
                         <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={submitHandler}>
                             Save
                         </button>
                     }>
            <div>
                <div style={{height: '600px', overflowY: 'scroll', padding: 15}}>
                    <div style={{display: "flex", justifyContent: "space-between", paddingTop: 10, paddingBottom: 10}}>
                        <label className="input-label">Portfolio</label>
                        <label className="input-label">{selectedPortfolio.portfolio_name} ({selectedPortfolio.portfolio_code})</label>
                    </div>

                    <div style={{paddingTop: 10, paddingBottom: 10}}>
                        <ToogleSwitch
                            label="Active"
                            isChecked={formData.active}
                            onToggle={() => handleChange({
                                target: {
                                    name: 'active',
                                    type: 'checkbox',
                                    checked: !formData.active
                                }
                            })}
                        />
                    </div>

                    <div className="block">
                        <label className="input-label">Instrument</label>
                        <InstrumentSearch onSelect={handleInstrumentSelect}/>
                    </div>

                    <BuySellButtonGroup side={formData.transactionType} change={handleTransactionTypeChange}/>

                    <InputField
                        id="trade_date"
                        type="date"
                        name="trade_date"
                        value={formData.trade_date}
                        onChange={handleChange}
                        label="Trade Date"
                        min={selectedPortfolio.inception_date}
                        required
                    />

                    <InputField
                        id="quantity"
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        label="Quantity"
                        min={0.0}
                        required
                    />

                    <InputField
                        id="price"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        label="Price"
                        min={0.0}
                        required
                    />

                    <InputField
                        id="fx_rate"
                        type="number"
                        name="fx_rate"
                        value={formData.fx_rate}
                        onChange={handleChange}
                        label="FX Rate"
                        min={0.0}
                        required
                    />


                    <div className="block">
                        <label className="input-label">Broker</label>
                        <select name="broker" value={formData.broker} onChange={handleChange}>
                            <option value="">Select Broker</option>
                            {brokerOptions}
                        </select>
                    </div>

                    <InputField
                        id="broker_id"
                        type="number"
                        name="broker_id"
                        onChange={handleChange}
                        label="Broker ID"
                        min={0.0}
                        required
                    />

                    {formData.broker && (
                        <div className="block">
                            <label className="input-label">Accounts</label>
                            <select name="account_id" value={formData.account_id} onChange={handleChange}>
                                <option value="">Select Account</option>
                                {accountOptions}
                            </select>
                        </div>
                    )}
                </div>
            </div>
        </CustomModal>
    );
};
export default PortfolioTransactionEntryModal;