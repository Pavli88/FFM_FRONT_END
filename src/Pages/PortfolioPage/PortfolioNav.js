import Card from "react-bootstrap/Card";
import NewPortCashFlow from "./NewPortCashFlow";


const PortfolioNav = (props) => {
    return (
        <Card style={{height: '200px'}}>
            <div style={{display: "flex", width: '50%'}}>
                <Card.Title>NAV</Card.Title>
            </div>
            <NewPortCashFlow portfolio={props.portfolio} server={props.server}/>

        </Card>
    );
};

export default PortfolioNav;