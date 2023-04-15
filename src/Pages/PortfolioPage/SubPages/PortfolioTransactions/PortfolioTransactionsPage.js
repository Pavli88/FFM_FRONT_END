import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";

import PortfolioTransactions from "./PortfolioTransactions/PortfolioTransactions";
import PortfolioCashEntry from "./PortfolioCashEntry/PortfolioCashEntry";
import PortfolioTransactionEntry from "./PortfolioTransactionEntry/PortfolioTransactionEntry";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const PortfolioTransactionsPage = (props) => {
    return (
        <div style={{display: 'flex', height: '800px'}}>
            <Card style={{width: '400px', height: '100%'}}>
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
            <div>
                <PortfolioTransactions portfolio={props.portfolio} server={props.server}/>
            </div>
        </div>
    );
};

export default PortfolioTransactionsPage;