import PortfolioDetails from "./PortfolioDetails";
import PortfolioDescription from "./PortfolioDescreption";
import CashHoldings from "../PortfolioHoldings/CashHolding";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const PortfolioDashBoardPage = (props) => {
    return (
        <Row style={{width: '100%', height:'100%', margin:'0px'}}>
            <Row style={{width: '50%', height: '400px', background:'red', margin:'0px'}}>
                <Col>
                    <PortfolioDetails portfolio={props.portfolio} server={props.server} default={props.default}/>
                </Col>
                <Col>
                    <PortfolioDescription/>
                </Col>
            </Row>
            <Row style={{width: '50%', height:'400px', background:'blue', margin:'0px'}}>
                <Col>
                    <CashHoldings/>
                </Col>
                <Col>

                </Col>
            </Row>
            <Row style={{width: '100%', height:'400px', background:'blue', margin:'0px'}}>

            </Row>
        </Row>
    );
};

export default PortfolioDashBoardPage;