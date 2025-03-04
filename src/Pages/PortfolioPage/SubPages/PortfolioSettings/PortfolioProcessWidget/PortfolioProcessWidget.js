import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import PortfolioTradeRouting from "../PortfolioTradeRouting/PortfolioTradeRouting";
import Card from "react-bootstrap/Card";
const PortfolioProcessWidget = (props) => {
    return (
        <div className={'card'}>

            <Card.Body>
                <Tabs defaultActiveKey="valuation">
                    <Tab eventKey="valuation" title="Valuation">
                        {props.valuation}
                    </Tab>
                    <Tab eventKey="total_return" title="Total Return">
                        {props.performance}
                    </Tab>
                    <Tab eventKey="attribution" title="Attribution">

                    </Tab>
                    <Tab eventKey="trade_routing" title="Trade Routing">
                        <PortfolioTradeRouting/>
                    </Tab>
                </Tabs>
            </Card.Body>
        </div>
    )
};
export default PortfolioProcessWidget;