import PortfolioHoldings from "./PortfolioHoldings/PortfolioHoldings";
import './PortfolioHoldingsPage.css'
const PortfolioHoldingsPage = (props) => {
    return (
        <div className={'port-holding-page-container'}>
            <PortfolioHoldings/>
        </div>
    );
};

export default PortfolioHoldingsPage;