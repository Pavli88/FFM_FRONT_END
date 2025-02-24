import HoldingsTable from "../../../../components/Tables/HoldingTable";
import {useContext} from "react";
import PortfolioPageContext from "../../context/portfolio-page-context";

const PortfolioHoldingsPage = () => {
    const portfolioCode = useContext(PortfolioPageContext).portfolioCode;
    return (
        <div style={{ padding: 20 }}>
            <HoldingsTable portfolioCode={[portfolioCode]}/>
        </div>
    );
};


export default PortfolioHoldingsPage;