import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, {useContext, useEffect, useRef, useState} from "react";
import DateContext from "../../../../../../context/date-context";
import Select from "react-select";
import ServerContext from "../../../../../../context/server-context";
import PortfolioContext from "../../../../../../context/portfolio-context";
import CustomModal from "../../../../../../components/Modals/Modals";
import InputField from "../../../../../../components/InputField/InputField";

const PortfolioCashEntryModal = ( {show, close} ) => {
    const server = useContext(ServerContext).server;
    const portfolioData = useContext(PortfolioContext).selectedPortfolio;
    const { currentDate } = useContext(DateContext);
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [type, setType] = useState(null)
    const [date, setDate] = useState(null);
    const [quantity, setQuantity] = useState(null);

    const submitHandler = () => {
        const parameters = {
            portfolio_code: portfolioData.portfolio_code,
            portfolio_id: portfolioData.id,
            security_id: selectedCurrency.id,
            transaction_type: type,
            trade_date: date,
            quantity: quantity,
            currency: selectedCurrency.currency,
            ...(portfolioData.status === 'Not Funded' && {initial_cash: true})
        }

        axios.post(`${server}portfolios/new/transaction/`, parameters,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}
            })
            .then(response => alert(response.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        close()
    };

    useEffect(() => {
        axios.get(`${server}instruments/get/instruments/`, {
            params: {  // ✅ Move parameters inside `params`
                // name: '',
                currency: portfolioData.currency,
                type: 'Cash'
            },
            headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}
        })
            .then(response => setCurrencies(response.data))
            .catch(error => console.error("Error fetching currencies:", error));
    }, [])

    const transactionType = [
        { value: 'Subscription', label: 'Subscription' },
        { value: 'Redemption', label: 'Redemption' },
        { value: 'Interest Paid', label: 'Interest Paid' },
        { value: 'Commission', label: 'Commission' },
        { value: 'Financing', label: 'Financing' },
    ]

    const onlySubscription = [{ value: 'Subscription', label: 'Subscription' }]

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
                    <Select style={{height: '100%'}}
                            options={portfolioData.status === 'Not Funded' ? onlySubscription : transactionType}
                            onChange={(e) => setType(e.value)}
                    >
                    </Select>
                </div>

                <div className="block">
                    <label>Currency</label>
                    <Select style={{height: '100%'}}
                            options={currencies.map(function (data) {
                                return {value: data.id, label: data.currency}
                            })}
                            onChange={(e) => setSelectedCurrency({id: e.value, currency: e.label})}
                    >
                    </Select>
                </div>
                <InputField
                    id="date"
                    type="date"
                    defaultValue={currentDate}
                    onChange={e => setDate(e.target.value)}
                    label="Date"
                    min={portfolioData.inception_date}
                />
                <InputField
                    id="quantity"
                    type="number"
                    onChange={e => setQuantity(e.target.value)}
                    label="Quantity"
                    min={0.0}
                />

                {portfolioData.status === 'Not Funded' &&
                    <div style={{
                        color: "red",
                        border: "solid",
                        borderColor: 'red',
                        borderRadius: 10,
                        borderWidth: 1,
                        padding: 10
                    }}>
                        Portfolio is not funded. Please enter the initial cashflow of the fund.
                    </div>}
            </div>
        </CustomModal>
    )
};
export default PortfolioCashEntryModal;