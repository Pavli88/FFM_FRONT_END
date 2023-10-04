import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CardWithHeader from "../../../../../Widgets/Charts/CardWithHeader";
import PortfolioTradeRouting from "../PortfolioTradeRouting/PortfolioTradeRouting";
import Card from "react-bootstrap/Card";
const PortfolioProcessWidget = (props) => {
    return (
        <Card style={{height: '100%'}}>
            <Card.Header>
                Process Setup
            </Card.Header>
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
        </Card>
    )
};
export default PortfolioProcessWidget;