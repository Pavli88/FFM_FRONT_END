import Card from "react-bootstrap/Card";
import PortfolioTransactions from "./PortfolioTransactions/PortfolioTransactions";
import PortfolioCashEntry from "./PortfolioCashEntry/PortfolioCashEntry";
import PortfolioTransactionEntry from "./PortfolioTransactionEntry/PortfolioTransactionEntry";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import './PortfolioTransactionsPage.css'
import PortfolioTransactionsFilter from "./PortfolioTransactionsFilter/PortfolioTransactionsFilter";
import {useContext, useEffect} from "react";
import PortfolioPageContext from "../../context/portfolio-page-context";


const PortfolioTransactionsPage = (props) => {
    const saveSelectedSubPageURL = useContext(PortfolioPageContext).saveSelectedPageURL;
    const saveResponseData = useContext(PortfolioPageContext).saveResponseData;
    useEffect(() => {
        saveSelectedSubPageURL('portfolios/get/transactions/');
        saveResponseData([{}]);
        }, []
    );
    return (
        <div style={{display: 'flex', height: '800px'}}>
            <Card className={'transactions-entry-container'}>
                <Card.Header>Transaction Entry</Card.Header>
                <Tabs
                    defaultActiveKey="security"
                    id="profile-tab"
                    className="mb-3"
                    style={{paddingLeft: 10}}
                >
                    <Tab eventKey="security" title="Security">
                        <div>
                            <PortfolioTransactionEntry portfolio={props.portfolio} server={props.server}/>
                        </div>
                    </Tab>
                    <Tab eventKey="cash" title="Cash">
                        <div>
                            <PortfolioCashEntry/>
                        </div>
                    </Tab>
                </Tabs>
            </Card>
            <div className={'transactions-block-container'}>
                <PortfolioTransactionsFilter/>
                <PortfolioTransactions portfolio={props.portfolio} server={props.server}/>
            </div>
        </div>
    );
};

export default PortfolioTransactionsPage;