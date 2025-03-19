import {useContext, useEffect, useRef, useState} from "react";
import DateContext from "../../../../../../context/date-context";
import Select from "react-select";
import PortfolioContext from "../../../../../../context/portfolio-context";
import CustomModal from "../../../../../../components/Modals/Modals";
import fetchAPI from "../../../../../../config files/api";

const PortfolioCashEntryModal = ( {show, close} ) => {
    const { selectedPortfolio, fetchPortfolios } = useContext(PortfolioContext);
    const { currentDate } = useContext(DateContext);
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [type, setType] = useState(null)
    const dateRef = useRef();
    const quantityRef = useRef();

    const submitHandler = () => {
        const defaultCurrency = currencies.find(currency => currency.currency === selectedPortfolio.currency);
        const parameters = {
            portfolio_code: selectedPortfolio.portfolio_code,
            portfolio_id: selectedPortfolio.id,
            security: selectedPortfolio.multicurrency_allowed ? selectedCurrency.id : defaultCurrency.id,
            quantity: parseFloat(quantityRef.current.value),
            trade_date: dateRef.current.value,
            transaction_type: type
        }
        console.log(parameters)
        fetchAPI.post('portfolios/transactions/new/', parameters)
            .then(response => alert(response.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });

        if (selectedPortfolio.status === 'Not Funded') {
            fetchAPI.post('portfolios/update/portfolio/', {
                id: selectedPortfolio.id,
                status: "Funded"
            })
                .then(response => {
                    console.log(response.data.response);
                    fetchPortfolios();
                })
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }

        // close()
    };

    useEffect(() => {
        fetchAPI.get('instruments/get/instruments/', {
            params: {  // ✅ Move parameters inside `params`
                group: 'Cash',
                type: 'Cash'
            }
        })
            .then(response => setCurrencies(response.data))
            .catch(error => console.error("Error fetching currencies:", error));
    }, [])

    const transactionType = [
        { value: 'Subscription', label: 'Subscription' },
        { value: 'Redemption', label: 'Redemption' },
        // { value: 'Interest Paid', label: 'Interest Paid' },
        { value: 'Commission', label: 'Commission' },
        { value: 'Financing', label: 'Financing' },
    ]

    const onlySubscription = [{ value: 'Subscription', label: 'Subscription' }]
    console.log(currencies)
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
                            options={selectedPortfolio.status === 'Not Funded' ? onlySubscription : transactionType}
                            onChange={(e) => setType(e.value)}
                    >
                    </Select>
                </div>

                {
                    selectedPortfolio.multicurrency_allowed && <div className="block">
                    <label>Currency</label>
                    <Select style={{height: '100%'}}
                            options={currencies.map(function (data) {
                                return {value: data.id, label: data.currency}
                            })}
                            onChange={(e) => setSelectedCurrency({id: e.value, currency: e.label})}
                    >
                    </Select>
                </div>
                }


                <div className="block">
                    <label>Date</label>
                    <input ref={dateRef} defaultValue={currentDate} type="date" min={selectedPortfolio.inception_date}/>
                </div>

                <div className="block">
                    <label>Quantity</label>
                    <input ref={quantityRef} type="number" required min={0.0}/>
                </div>

                {selectedPortfolio.status === 'Not Funded' &&
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