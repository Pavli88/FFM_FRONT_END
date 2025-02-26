import HoldingsTable from "../../../../components/Tables/HoldingTable";
import {useContext} from "react";
import PortfolioContext from "../../../../context/portfolio-context";

const PortfolioHoldingsPage = () => {
    const portfolioCode = useContext(PortfolioContext).selectedPortfolio.portfolio_code;
    return (
        <div style={{ padding: 20 }}>
            <HoldingsTable portfolioCode={[portfolioCode]}/>
        </div>
    );
};


export default PortfolioHoldingsPage;