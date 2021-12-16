import PortfolioNav from "./PortfolioNav";
import CashHoldings from "./CashHolding";
import Holdings from "./Holdings";

const PortfolioHoldingsPage = (props) => {
    return (
        <>
            <h2>Portfolio Holdings</h2>
            <PortfolioNav/>
            <CashHoldings/>
            <Holdings/>
        </>
    );
};

export default PortfolioHoldingsPage;