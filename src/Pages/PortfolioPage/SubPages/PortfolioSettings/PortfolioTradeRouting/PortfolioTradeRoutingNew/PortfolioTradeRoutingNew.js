import {useState, useContext, useMemo} from "react";
import './PortfolioTradeRoutingNew.css'
import fetchAPI from "../../../../../../config files/api";
import InstrumentSearch from "../../../../../../components/Search/InstrumentSearch/InstrumentSearch";
import CustomModal from "../../../../../../components/Modals/Modals";
import BrokerContext from "../../../../../../context/broker-context";
import PortfolioPageContext from "../../../../context/portfolio-page-context";

const PortfolioTradeRoutingNew = ({ show, close }) => {
    const { accounts, apiSupportedBrokers } = useContext(BrokerContext);
    const { portfolioCode } = useContext(PortfolioPageContext);

    const [formData, setFormData] = useState({
        portfolioCode: portfolioCode,
        selectedBroker: null,
        selectedAccount: null,
        selectedInstrument: null,
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
        setFormData((prevState) => ({
            ...prevState,
            selectedBroker: e.target.value,
        }));
    };

    const handleAccountChange = (e) => {
        const selectedId = e.target.value;
        const selectedAccount = accounts.find((acc) => acc.id.toString() === selectedId);
        setFormData((prevState) => ({
            ...prevState,
            selectedAccount: selectedAccount || null,
        }));
    };

    const handleInstrumentSelect = (instrument) => {
        setFormData((prevState) => ({
            ...prevState,
            selectedInstrument: instrument.id,
        }));
    };

    const submitHandler = (event) => {
        event.preventDefault();
        fetchAPI
            .post('portfolios/new/trade_routing/', formData)
            .then((data) => alert(data.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const footer = (
        <button className={'normal-button'} onClick={submitHandler}>
            Save
        </button>
    );

    return (
        <CustomModal show={show} onClose={close} title={'New Trade Routing'} footer={footer}>
            <div className={'block'}>
                <label>Instrument</label>
                <InstrumentSearch onSelect={handleInstrumentSelect} />
            </div>

            <div className="block">
                <label className="input-label">Broker</label>
                <select name="broker" value={formData.selectedBroker} onChange={handleBrokerChange}>
                    <option value="">Select Broker</option>
                    {brokerOptions}
                </select>
            </div>

            <div className="block">
                <label className="input-label">Account</label>
                <select name="account" value={formData.selectedAccount?.id || ''} onChange={handleAccountChange}>
                    <option value="">Select Account</option>
                    {accountOptions}
                </select>
            </div>
        </CustomModal>
    );
};

export default PortfolioTradeRoutingNew;