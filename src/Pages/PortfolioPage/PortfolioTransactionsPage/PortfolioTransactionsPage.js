import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PortfolioTransactions from "./PortfolioTransactions/PortfolioTransactions";
import PortfolioCashEntry from "./PortfolioCashEntry/PortfolioCashEntry";
import PortfolioTransactionEntry from "./PortfolioTransactionEntry/PortfolioTransactionEntry";

const PortfolioTransactionsPage = (props) => {
    return (
        <>
            <Row>
                <Col>
                    <PortfolioTransactionEntry/>
                </Col>
                <Col>
                    <PortfolioCashEntry/>
                </Col>
            </Row>
            <PortfolioTransactions portfolio={props.portfolio} server={props.server}/>
        </>
    );
};

export default PortfolioTransactionsPage;