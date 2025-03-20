import './PortfolioTransactionsFilter.css'
import {useContext, useEffect, useRef, useState} from "react";
import TransactionContext from "../context/transaction-context";
import DateContext from "../../../../../context/date-context";
import Select from "react-select";
import PortfolioContext from "../../../../../context/portfolio-context";
import axios from "axios";
import ServerContext from "../../../../../context/server-context";


const PortfolioTransactionsFilter = (props) => {
    const server = useContext(ServerContext).server;
    const currentDate = useContext(DateContext).currentDate;
    const { selectedPortfolio } = useContext(PortfolioContext);
    const saveTransactions = useContext(TransactionContext).saveTransactions;

    const securityRef = useRef();
    const startDateRef = useRef();
    const endDateRef = useRef();
    const invRef = useRef();

    const [transactionType, setTransactionType] = useState([]);
    const [openStatus, setOpenStatus] = useState(false);
    const [parameters, setParameters] = useState({});

    // Function to construct parameters dynamically
    const updateParameters = () => {
        setParameters({
            portfolio_code: selectedPortfolio.portfolio_code, // Updates when portfolioCode changes
            trade_date__gte: startDateRef.current?.value || currentDate,
            trade_date__lte: endDateRef.current?.value || currentDate,
            transaction_type: transactionType.map(data => data["value"]),
            ...(openStatus && { is_active: openStatus }),
            ...(invRef.current?.value && { transaction_link_code: invRef.current.value }),
            ...(securityRef.current?.value && { security_id: securityRef.current.value })
        });
    };

    const fetchTransactionData = () => {
        axios.post(`${server}portfolios/get/transactions/`, parameters)
            .then(response => saveTransactions(response.data))
            .catch((error) => console.error('Error fetching transactions:', error));
    };

    useEffect(() => {
        updateParameters();
    }, [selectedPortfolio.portfolio_code]);

    const submitHandler = () => {
        fetchTransactionData();
    };

    return (
        <div className={"card"} style={{ padding: "5px", width: "100%" }}>
            <div className="search-bar" style={{ display: "flex", alignItems: "center", gap: "15px", flexWrap: "wrap" }}>
                <div className="search-item" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <label>Show Active</label>
                    <input
                        type="checkbox"
                        checked={openStatus}
                        onChange={() => {
                            setOpenStatus(!openStatus);
                            updateParameters();
                        }}
                    />
                </div>

                <div className="search-item" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <label>Inventory ID</label>
                    <input ref={invRef} type="number" style={{ width: 100 }} onChange={updateParameters} />
                </div>

                <div className="search-item" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <label>Security ID</label>
                    <input ref={securityRef} type="number" style={{ width: 100 }} onChange={updateParameters} />
                </div>

                <div className="search-item" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <label>Transaction Type</label>
                    <Select
                        isMulti
                        options={[
                            { value: "Purchase", label: "Purchase" },
                            { value: "Sale", label: "Sale" },
                            { value: "Subscription", label: "Subscription" },
                            { value: "Redemption", label: "Redemption" },
                            { value: "Commission", label: "Commission" },
                            { value: "Financing", label: "Financing" }
                        ]}
                        onChange={(e) => {
                            setTransactionType(e);
                            updateParameters();
                        }}
                    />
                </div>

                <div className="search-item" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <label>From</label>
                    <input ref={startDateRef} defaultValue={selectedPortfolio.inception_date} min={selectedPortfolio.inception_date} type="date" style={{ width: 200 }} onChange={updateParameters} />
                </div>

                <div className="search-item" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <label>To</label>
                    <input ref={endDateRef} defaultValue={currentDate} type="date" style={{ width: 200 }} onChange={updateParameters} />
                </div>

                <div>
                    <button onClick={submitHandler} className="normal-button">Search</button>
                </div>
            </div>
        </div>
    );
};
export default PortfolioTransactionsFilter;