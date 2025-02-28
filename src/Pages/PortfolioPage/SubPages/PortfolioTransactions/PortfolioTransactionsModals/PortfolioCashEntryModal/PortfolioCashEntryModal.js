import Modal from "react-bootstrap/Modal";
import axios from "axios";
import {useContext, useEffect, useRef, useState} from "react";
import DateContext from "../../../../../../context/date-context";
import Select from "react-select";
import ServerContext from "../../../../../../context/server-context";
import PortfolioContext from "../../../../../../context/portfolio-context";
import CustomModal from "../../../../../../components/Modals/Modals";

const PortfolioCashEntryModal = ( {show, close} ) => {
    const server = useContext(ServerContext).server;
    const portfolioData = useContext(PortfolioContext).selectedPortfolio;
    const { currentDate } = useContext(DateContext);
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [type, setType] = useState(null)
    const dateRef = useRef();
    const quantityRef = useRef();

    const submitHandler = () => {
        const parameters = {
            portfolio_code: portfolioData.portfolio_code,
            portfolio_id: portfolioData.id,
            security_id: selectedCurrency.id,
            transaction_type: type,
            trade_date: dateRef.current.value,
            quantity: quantityRef.current.value,
            currency: selectedCurrency.currency,
            ...(portfolioData.status === 'Not Funded' && {initial_cash: true})
        }

        axios.post(`${server}portfolios/new/transaction/`, parameters)
            .then(response => alert(response.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        close()
    };

    useEffect(() => {
        axios.post(`${server}instruments/get/instruments/`, {
            // name: '',
            currency: portfolioData.currency,
            type: 'Cash'
        }).then(response => setCurrencies(response.data))
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

                <div className="block">
                    <label>Date</label>
                    <input ref={dateRef} defaultValue={currentDate} type="date" min={portfolioData.inception_date}/>
                </div>

                <div className="block">
                    <label>Quantity</label>
                    <input ref={quantityRef} type="number" required min={0.0}/>
                </div>

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