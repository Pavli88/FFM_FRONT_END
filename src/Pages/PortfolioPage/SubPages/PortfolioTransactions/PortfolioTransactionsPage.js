import PortfolioTransactions from "./PortfolioTransactions/PortfolioTransactions";
import './PortfolioTransactionsPage.css'
import PortfolioTransactionsFilter from "./PortfolioTransactionsFilter/PortfolioTransactionsFilter";
import {useContext, useEffect, useState} from "react";
import PortfolioPageContext from "../../context/portfolio-page-context";
import TransactionContext from "./context/transaction-context";
import axios from "axios";

const PortfolioTransactionsPage = (props) => {
    const [transactionsData, setTransactionsData] = useState([{}])
    const [newTransaction, setNewTransaction] = useState(0);
    const [parameters, setParameters] = useState();
    const [isInitialRender, setIsInitialRender] = useState(0);

    const fetchData = () => {
        axios.post(props.server + 'portfolios/get/transactions/', parameters)
            .then(response => setTransactionsData(response.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    useEffect(() => {
        if (isInitialRender === 0) {
            setIsInitialRender(isInitialRender + 1);  // Mark initial render as complete
        } else {
            // console.log('init')
            fetchData();
        }
    }, [parameters, isInitialRender]);

    return (
        <TransactionContext.Provider value={{
            newTransaction: newTransaction,
            saveNewTransaction: setNewTransaction,
        }}>
            <div style={{height: '100%', width: '100%', padding: 15}}>
                <div>
                    <PortfolioTransactionsFilter updateParams={(e) => setParameters(e)}/>
                </div>

                <div style={{height: 900}}>
                    <PortfolioTransactions data={transactionsData} server={props.server} fetch={() => setIsInitialRender(isInitialRender + 1)}/>
                </div>
            </div>
        </TransactionContext.Provider>
    );
};

export default PortfolioTransactionsPage;