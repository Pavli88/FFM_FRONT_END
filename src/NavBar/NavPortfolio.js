import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";

// Context
import PortfolioContext from "../context/portfolio-context";
import {useContext} from "react";

const NavPortfolio = () => {
    const portfolios = useContext(PortfolioContext)['portfolios'];
    console.log(portfolios)
    const selectPortfolio = useContext(PortfolioContext)['selectPortfolio'];
    const portfolioOptions = portfolios.map((record) =>
        <Dropdown.Item key={record['id']} eventKey={record['portfolio_name']}>{record['portfolio_name']}</Dropdown.Item>);
    return(
        <Row>
            <Col style={{width: '100%'}}>
                <Dropdown onSelect={(robot) => selectPortfolio(robot)}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Portfolio
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {portfolioOptions}
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    );
};
export default NavPortfolio;