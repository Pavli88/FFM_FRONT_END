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
import MultiSelect from "../../../../../components/Selects/MultiSelect";

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
    const { saveTransactions, showFilter } = useContext(TransactionContext);

    const [formData, setFormData] = useState({
        portfolio_code: "",
        trade_date__gte: "",
        trade_date__lte: "",
        transaction_type: [],
        is_active: null,
        transaction_link_code: "",
        security_id: "",
    });
    console.log(formData)
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
        setFormData(prev => ({
            ...prev,
            security_id: instrument.id
        }));
    };

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
        const filteredData = Object.fromEntries(
            Object.entries(formData).filter(
                ([_, v]) => v !== "" && v !== null && !(Array.isArray(v) && v.length === 0)
            )
        );

        fetchAPI
            .post('portfolios/get/transactions/', filteredData)
            .then((response) => saveTransactions(response.data))
            .catch((error) => console.error("Error fetching transactions:", error));
    };
    const [selectedOptions, setSelectedOptions] = useState([]);
    return (
        showFilter && (
            <div>
                <div className="filter-row">

                    <div className="filter-item">
                        <InputField
                            id="inv_id"
                            type="number"
                            name="transaction_link_code"
                            value={formData.transaction_link_code}
                            onChange={handleInputChange}
                            label="Inventory ID"
                            horizontal={false}
                        />
                    </div>

                    <div className="filter-item">
                        <label className="filter-label">Instrument</label>
                        <InstrumentSearch onSelect={handleInstrumentSelect} />
                    </div>

                    <div className="filter-item" style={{marginBottom: 5}}>
                        <label className="filter-label">Transaction Type</label>
                        <Select
                            isMulti
                            options={transactionOptions}
                            onChange={handleSelectChange}
                        />
                    </div>

      {/*              <div className="filter-item" style={{marginBottom: 5}}>*/}
      {/*                  <label className="filter-label">Transaction Type</label>*/}
      {/*                  <MultiSelect*/}
      {/*  options={transactionOptions}*/}
      {/*  selected={selectedOptions}*/}
      {/*  onChange={handleSelectChange}*/}
      {/*/>*/}
      {/*              </div>*/}

                    <div className="filter-item">
                        <InputField
                            id="start_date"
                            type="date"
                            name="trade_date__gte"
                            value={formData.trade_date__lte}
                            onChange={handleInputChange}
                            label="Start Date"
                            horizontal={false}
                        />
                    </div>

                    <div className="filter-item">
                        <InputField
                            id="end_date"
                            type="date"
                            name="trade_date__lte"
                            value={formData.trade_date__lte}
                            onChange={handleInputChange}
                            label="End Date"
                            horizontal={false}
                        />
                    </div>

                     <div style={{marginBottom: 5}}>
                        <ToogleSwitch
                            label="Active"
                            horizontal={false}
                            isChecked={formData.is_active === true}
                            onToggle={() => handleInputChange({
                                target: {
                                    name: 'is_active',
                                    type: 'checkbox',
                                    checked: formData.is_active ? null : true
                                }
                            })}
                        />
                    </div>

                    <div style={{marginBottom: 20}}>
                        <button onClick={fetchTransactionData} className="normal-button">Search</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default PortfolioTransactionsFilter;