import {useState, useContext, useMemo} from "react";
import './PortfolioTradeRoutingNew.css'
import fetchAPI from "../../../../../../config files/api";
import InstrumentSearch from "../../../../../../components/Search/InstrumentSearch/InstrumentSearch";
import CustomModal from "../../../../../../components/Modals/Modals";
import BrokerContext from "../../../../../../context/broker-context";
import PortfolioContext from "../../../../../../context/portfolio-context";

const PortfolioTradeRoutingNew = ({ show, close, fetch }) => {
    const { accounts, apiSupportedBrokers } = useContext(BrokerContext);
    const { selectedPortfolio } = useContext(PortfolioContext);

    const [formData, setFormData] = useState({
        portfolio_code: selectedPortfolio.portfolio_code,
        source: '',
        broker_account_id: '',
        inst_id: '',
    });

    const [formErrors, setFormErrors] = useState({
        selected_broker: false,
        broker_account_id: false,
        inst_id: false,
    });

    const brokerOptions = useMemo(
        () =>
            apiSupportedBrokers.map((data) => (
                <option key={data.broker_code} value={data.broker_code}>
                    {data.broker}
                </option>
            )),
        [apiSupportedBrokers]
    );

    const accountOptions = accounts.map((account) => (
        <option key={account.id} value={account.id}>
            {account.account_name} - {account.account_number} ({account.env}, {account.currency})
        </option>
    ));

    const handleBrokerChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            source: e.target.value,
        }));
    };

    const handleAccountChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            broker_account_id: e.target.value,
        }));
    };

    const handleInstrumentSelect = (instrument) => {
        setFormData((prev) => ({
            ...prev,
            inst_id: instrument?.id || '',
        }));
    };

    const submitHandler = async () => {
        const errors = {
            source: !formData.source,
            broker_account_id: !formData.broker_account_id,
            inst_id: !formData.inst_id,
        };

        setFormErrors(errors);

        const hasErrors = Object.values(errors).some((val) => val);
        if (hasErrors) return;

        // Submit if valid
        console.log('Submitting:', formData);

        try {
            const response = await fetchAPI.post('portfolios/new/trade_routing/', formData);
            fetch();
            alert(response.data.msg);
            close();
        } catch (error) {
            console.error('Error Message:', error);
            alert("Something went wrong. Please try again.");
        }
    };


    const footer = (
        <button className={'normal-button'} onClick={submitHandler}>
            Save
        </button>
    );

    return (
        <CustomModal show={show} onClose={close} title={'New Trade Routing'} footer={footer}>
            <div className="block">
                <label className="input-label">Instrument</label>
                <InstrumentSearch onSelect={handleInstrumentSelect} />
                {formErrors.inst_id && <p style={{ color: 'red' }}>Instrument is required</p>}
            </div>

            <div className="block">
                <label className="input-label">Broker</label>
                <select
                    name="broker"
                    value={formData.source}
                    onChange={handleBrokerChange}
                    style={{ borderColor: formErrors.source ? 'red' : undefined }}
                >
                    {/*<option value="">Select Broker</option>*/}
                    {brokerOptions}
                </select>
                {formErrors.source && <p style={{ color: 'red' }}>Broker is required</p>}
            </div>

            <div className="block">
                <label className="input-label">Account</label>
                <select
                    name="account"
                    value={formData.broker_account_id}
                    onChange={handleAccountChange}
                    style={{ borderColor: formErrors.broker_account_id ? 'red' : undefined }}
                >
                    <option value="">Select Account</option>
                    {accountOptions}
                </select>
                {formErrors.broker_account_id && <p style={{ color: 'red' }}>Account is required</p>}
            </div>
        </CustomModal>
    );
};
export default PortfolioTradeRoutingNew;