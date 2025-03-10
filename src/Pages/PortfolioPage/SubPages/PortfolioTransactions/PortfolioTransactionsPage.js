import './PortfolioTransactionsPage.css'
import PortfolioTransactionsFilter from "./PortfolioTransactionsFilter/PortfolioTransactionsFilter";
import PortfolioTransactionsTable from "./PortfolioTransactionsTable/PortfolioTransactionsTable";
import {useState} from "react";
import TransactionContext from "./context/transaction-context";

const PortfolioTransactionsPage = (props) => {
    const [newTransaction, setNewTransaction] = useState(0);
    const [parameters, setParameters] = useState();
    const [transactions, setTransactions] = useState([]);

    return (
        <TransactionContext.Provider value={{
            transactions: transactions,
            saveTransactions: setTransactions,
            newTransaction: newTransaction,
            saveNewTransaction: setNewTransaction,
            queryParameters : parameters,
            saveQueryParameters: setParameters,
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