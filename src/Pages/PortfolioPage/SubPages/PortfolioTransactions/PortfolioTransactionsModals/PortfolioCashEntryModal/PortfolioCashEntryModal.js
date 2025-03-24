import React, {useContext, useEffect, useState} from "react";
import DateContext from "../../../../../../context/date-context";
import Select from "react-select";
import PortfolioContext from "../../../../../../context/portfolio-context";
import CustomModal from "../../../../../../components/Modals/Modals";
import InputField from "../../../../../../components/InputField/InputField";
import fetchAPI from "../../../../../../config files/api";

const PortfolioCashEntryModal = ({ show, close }) => {
    const { selectedPortfolio, fetchPortfolios } = useContext(PortfolioContext);
    const { currentDate } = useContext(DateContext);
    const [currencies, setCurrencies] = useState([]);
    const [formData, setFormData] = useState({
        selectedCurrency: null,
        type: null,
        tradeDate: currentDate,
        quantity: 0
    });

    const handleChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const submitHandler = () => {
        const defaultCurrency = currencies.find(currency => currency.currency === selectedPortfolio.currency);
        const parameters = {
            portfolio_code: selectedPortfolio.portfolio_code,
            portfolio_id: selectedPortfolio.id,
            security: selectedPortfolio.multicurrency_allowed
                ? formData.selectedCurrency.id
                : defaultCurrency.id,
            quantity: parseFloat(formData.quantity),
            trade_date: formData.tradeDate,
            transaction_type: formData.type
        };

        console.log(parameters);

        fetchAPI.post('portfolios/transactions/new/', parameters)
            .then(response => alert(response.data))
            .catch((error) => console.error('Error Message:', error));

        if (selectedPortfolio.status === 'Not Funded') {
            fetchAPI.post('portfolios/update/portfolio/', {
                id: selectedPortfolio.id,
                status: "Funded"
            })
                .then(response => {
                    console.log(response.data.response);
                    fetchPortfolios();
                })
                .catch((error) => console.error('Error Message:', error));
        }

        close();
    };

    useEffect(() => {
        fetchAPI.get('instruments/get/instruments/', {
            params: {
                group: 'Cash',
                type: 'Cash'
            }
        })
            .then(response => setCurrencies(response.data))
            .catch(error => console.error("Error fetching currencies:", error));
    }, []);

    const transactionType = [
        { value: 'Subscription', label: 'Subscription' },
        { value: 'Redemption', label: 'Redemption' },
        { value: 'Commission', label: 'Commission' },
        { value: 'Financing', label: 'Financing' },
    ];

    const onlySubscription = [{ value: 'Subscription', label: 'Subscription' }];

    return (
        <CustomModal show={show} onClose={close} title={'New Cash'}
                     footer={
                         <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={submitHandler}>
                             Save
                         </button>
                     }>

            <div>
                <div className="block">
                    <label>Transaction Type</label>
                    <Select
                        style={{ height: '100%' }}
                        options={selectedPortfolio.status === 'Not Funded' ? onlySubscription : transactionType}
                        onChange={(e) => handleChange('type', e.value)}
                    />
                </div>

                {selectedPortfolio.multicurrency_allowed && (
                    <div className="block">
                        <label>Currency</label>
                        <Select
                            style={{ height: '100%' }}
                            options={currencies.map(data => ({
                                value: data.id,
                                label: data.currency
                            }))}
                            onChange={(e) =>
                                handleChange('selectedCurrency', { id: e.value, currency: e.label })
                            }
                        />
                    </div>
                )}

                <InputField
                    id="trade_date"
                    type="date"
                    value={formData.tradeDate}
                    onChange={(e) => handleChange('tradeDate', e.target.value)}
                    label="Transaction Date"
                    min={selectedPortfolio.inception_date}
                    required
                />

                <InputField
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                    label="Quantity"
                    min={0.0}
                    required
                />

                {selectedPortfolio.status === 'Not Funded' && (
                    <div style={{
                        color: "red",
                        border: "solid",
                        borderColor: 'red',
                        borderRadius: 10,
                        borderWidth: 1,
                        padding: 10
                    }}>
                        Portfolio is not funded. Please enter the initial cashflow of the fund.
                    </div>
                )}
            </div>
        </CustomModal>
    );
};
export default PortfolioCashEntryModal;