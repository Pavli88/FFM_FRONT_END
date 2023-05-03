import DailyCashFlow from "./DailyCashFlow/DailyCashFlow";

const PortfolioDashBoardPage = (props) => {

    return (
        <div style={{width: '100%', height: '100%', margin: '0px'}}>
           <DailyCashFlow server={props.server}/>
        </div>
    );
};

export default PortfolioDashBoardPage;