import Card from "react-bootstrap/Card";
import PortfolioTransactions from "./PortfolioTransactions/PortfolioTransactions";
import PortfolioCashEntry from "./PortfolioCashEntry/PortfolioCashEntry";
import PortfolioTransactionEntry from "./PortfolioTransactionEntry/PortfolioTransactionEntry";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import './PortfolioTransactionsPage.css'
import PortfolioTransactionsFilter from "./PortfolioTransactionsFilter/PortfolioTransactionsFilter";
import {useContext, useEffect, useState} from "react";
import PortfolioPageContext from "../../context/portfolio-page-context";
import TransactionContext from "./context/transaction-context";
import axios from "axios";

const PortfolioTransactionsPage = (props) => {
    const [transactionsData, setTransactionsData] = useState([{}])
    const [newTransaction, setNewTransaction] = useState(0);

    const fetchData = (parameters) => {
        axios.get(props.server + 'portfolios/get/transactions/', parameters)
            .then(response => setTransactionsData(response.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    return (
        <TransactionContext.Provider value={{
            newTransaction: newTransaction,
            saveNewTransaction: setNewTransaction,
        }}>
            <div style={{height: '800px', width: '100%', padding: 15}}>
                <div>
                    <PortfolioTransactionsFilter fetch={fetchData}/>
                </div>
                <div style={{height: '700px', width: '100%', paddingTop: 15}}>
                    <PortfolioTransactions data={transactionsData} server={props.server} fetch={fetchData}/>
                </div>
            </div>
        </TransactionContext.Provider>
    );
};

export default PortfolioTransactionsPage;