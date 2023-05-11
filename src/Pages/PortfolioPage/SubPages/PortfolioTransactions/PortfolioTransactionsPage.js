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
    console.log(typeof transactionsData)
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
            <div style={{display: "flex", height: '800px', width: '100%', padding: 15}}>
                <div style={{height: '100%', width: '20%'}}>
                    <Card style={{height: '100%'}}>
                        <Card.Header>Search & Entry</Card.Header>
                        <Tabs
                            defaultActiveKey="search"
                            id="profile-tab"
                            style={{paddingLeft: 12, paddingTop: 5, marginBottom: 0}}
                        >
                            <Tab eventKey="search" title="Search">
                                <div>
                                    <PortfolioTransactionsFilter fetch={fetchData}/>
                                </div>
                            </Tab>
                            <Tab eventKey="security" title="Security">
                                <div>
                                    <PortfolioTransactionEntry portfolio={props.portfolio} server={props.server}/>
                                </div>
                            </Tab>
                            <Tab eventKey="cash" title="Cash">
                                <div>
                                    <PortfolioCashEntry portfolio={props.portfolio} server={props.server}/>
                                </div>
                            </Tab>
                        </Tabs>
                    </Card>
                </div>
                <div style={{height: '100%', width: '80%'}}>
                    <PortfolioTransactions data={transactionsData} server={props.server} fetch={fetchData}/>
                </div>
            </div>
        </TransactionContext.Provider>
    );
};

export default PortfolioTransactionsPage;