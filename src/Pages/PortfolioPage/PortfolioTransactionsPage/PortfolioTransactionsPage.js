import PortfolioTransactions from "./PortfolioTransactions";

const PortfolioTransactionsPage = (props) => {
    return (
        <>
            <PortfolioTransactions portfolio={props.portfolio} server={props.server}/>
        </>
    );
};

export default PortfolioTransactionsPage;