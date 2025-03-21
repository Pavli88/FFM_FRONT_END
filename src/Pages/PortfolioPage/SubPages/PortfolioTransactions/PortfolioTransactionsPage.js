import './PortfolioTransactionsPage.css'
import PortfolioTransactionsFilter from "./PortfolioTransactionsFilter/PortfolioTransactionsFilter";
import PortfolioTransactionsTable from "./PortfolioTransactionsTable/PortfolioTransactionsTable";
import {useState} from "react";
import TransactionContext from "./context/transaction-context";

const PortfolioTransactionsPage = () => {
    const [newTransaction, setNewTransaction] = useState(0);
    const [parameters, setParameters] = useState();
    const [transactions, setTransactions] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    console.log(showFilter)
    return (
        <TransactionContext.Provider value={{
            transactions: transactions,
            saveTransactions: setTransactions,
            newTransaction: newTransaction,
            saveNewTransaction: setNewTransaction,
            queryParameters : parameters,
            saveQueryParameters: setParameters,
            showFilter: showFilter,
            saveShowFilter: setShowFilter,
        }}>
            <div style={{padding: 20}}>
                <PortfolioTransactionsFilter/>

                <div style={{paddingTop: 15}}>
                    <PortfolioTransactionsTable/>
                </div>

            </div>
        </TransactionContext.Provider>
    );
};

export default PortfolioTransactionsPage;