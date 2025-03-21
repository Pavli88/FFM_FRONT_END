import './PortfolioTransactionsFilter.css'
import {useContext, useEffect, useRef, useState} from "react";
import TransactionContext from "../context/transaction-context";
import DateContext from "../../../../../context/date-context";
import Select from "react-select";
import PortfolioContext from "../../../../../context/portfolio-context";
import fetchAPI from "../../../../../config files/api";
import InstrumentSearch from "../../../../../components/Search/InstrumentSearch/InstrumentSearch";
import InputField from "../../../../../components/InputField/InputField";
import ToogleSwitch from "../../../../../components/Buttons/SliderButton/ToogleSwitch";


const transactionOptions = [
    { value: "Purchase", label: "Purchase" },
    { value: "Sale", label: "Sale" },
    { value: "Subscription", label: "Subscription" },
    { value: "Redemption", label: "Redemption" },
    { value: "Commission", label: "Commission" },
    { value: "Financing", label: "Financing" },
];

const PortfolioTransactionsFilter = () => {
    const currentDate = useContext(DateContext).currentDate;
    const { selectedPortfolio } = useContext(PortfolioContext);
    const {saveTransactions, showFilter} = useContext(TransactionContext);


    const [formData, setFormData] = useState({
        portfolio_code: "",
        trade_date__gte: "",
        trade_date__lte: "",
        transaction_type: [],
        is_active: false,
        transaction_link_code: "",
        security_id: "",
    });

    useEffect(() => {
        if (selectedPortfolio) {
            setFormData((prev) => ({
                ...prev,
                portfolio_code: selectedPortfolio.portfolio_code,
                trade_date__gte: selectedPortfolio.inception_date,
                trade_date__lte: currentDate,
            }));
        }
    }, [selectedPortfolio, currentDate]);

    const handleInstrumentSelect = (instrument) => {
        setFormData(prevState => ({
            ...prevState,
            security_id: instrument.id
        }))
    };
    console.log(formData)
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSelectChange = (selectedOptions) => {
        setFormData((prev) => ({
            ...prev,
            transaction_type: selectedOptions.map((opt) => opt.value),
        }));
    };

    const fetchTransactionData = () => {
        // Remove empty fields before sending
        const filteredData = Object.fromEntries(
            Object.entries(formData).filter(
                ([_, v]) => v !== "" && v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0)
            )
        );

        fetchAPI
            .post('portfolios/get/transactions/', filteredData)
            .then((response) => saveTransactions(response.data))
            .catch((error) => console.error("Error fetching transactions:", error));
    };

    return (
        showFilter &&
        <div className="card">

            <div style={{display: "flex"}}>

                <div style={{paddingTop: 10, paddingBottom: 10}}>
                    <ToogleSwitch
                        label="Active"
                        isChecked={formData.is_active}
                        onToggle={() => handleInputChange({
                            target: {
                                name: 'is_active',
                                type: 'checkbox',
                                checked: !formData.is_active
                            }
                        })}
                    />
                </div>

                <div style={{width: 300}}>
                    <InputField
                        id="inv_id"
                        type="number"
                        name="trade_date__lte"
                        value={formData.transaction_link_code}
                        onChange={handleInputChange}
                        label="Inventory ID"
                        horizontal={true}
                        required
                    />
                </div>


                <div style={{display: "flex", width: 400}}>
                    <label>Instrument</label>
                    <InstrumentSearch onSelect={handleInstrumentSelect}/>
                </div>

                <div style={{display: "flex", width: 400}}>
                    <label>Transaction Type</label>
                    <div style={{width: 300}}>
                        <Select
                        isMulti
                        options={transactionOptions}
                        onChange={handleSelectChange}
                    />
                    </div>

                </div>

                <InputField
                    id="end_date"
                    type="date"
                    name="trade_date__gte"
                    value={formData.trade_date__gte}
                    onChange={handleInputChange}
                    label="From"
                    horizontal={true}
                    required
                />

                <InputField
                    id="end_date"
                    type="date"
                    name="trade_date__lte"
                    value={formData.trade_date__lte}
                    onChange={handleInputChange}
                    label="To"
                    horizontal={true}
                    required
                />
            </div>



                <button onClick={fetchTransactionData} className="normal-button">Search</button>

        </div>
    );
};

export default PortfolioTransactionsFilter;