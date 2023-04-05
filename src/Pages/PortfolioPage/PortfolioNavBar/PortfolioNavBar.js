import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Nav} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PortfolioPageContext from "../context/portfolio-page-context";
import {useContext, useRef} from "react";
const PortfolioNavBar = () => {
    const savePortfolio = useContext(PortfolioPageContext).savePortfolio;
    const portfolioRef = useRef();
    const fetchPortfolio = () => {
        savePortfolio(portfolioRef.current.value);
    };

    return(
        <Card style={{height: '50px', paddingTop: '0px', margin: '0px'}}>
            <Row style={{height:'100%', padding:'5px'}}>
                <Col style={{padding: '0px', height: '100%'}}>
                    <Row style={{padding: '0px', width: '100%', height: '100%'}}>
                        <Col md="auto" style={{paddingLeft: '5px'}}>
                            <Nav.Link href="#" disabled>
                                Portfolio Code
                            </Nav.Link>
                        </Col>
                        <Col md="auto">
                            <FormControl
                                size="sm"
                                className="me-2"
                                aria-label="Search"
                                style={{height: '100%'}}
                                ref={portfolioRef}
                            />
                        </Col>
                        <Col md="auto">
                            <Button onClick={fetchPortfolio}>Get</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
};
export default PortfolioNavBar;