import PortfolioDetails from "./PortfolioDetails";
import PortfolioDescription from "./PortfolioDescreption";

const PortfolioDashBoardPage = (props) => {
    return (
        <>
            <PortfolioDetails portfolio={props.portfolio} server={props.server} default={props.default}/>
            <PortfolioDescription/>
        </>
    );
};

export default PortfolioDashBoardPage;