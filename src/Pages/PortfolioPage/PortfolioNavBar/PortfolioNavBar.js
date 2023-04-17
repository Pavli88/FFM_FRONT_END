import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Nav} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PortfolioPageContext from "../context/portfolio-page-context";
import {useContext, useRef} from "react";
import './PortfolioNavBar.css'

const PortfolioNavBar = (props) => {
    const portfolioRef = useRef();
    const fetchPortfolio = () => {
        props.fetch(portfolioRef.current.value);
    };
    return (
        <div className={'portnav-bar-main'}>
            <Card>
                <div style={{height: '100%', padding: '5px'}}>
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
                </div>
            </Card>
        </div>
    )
};
export default PortfolioNavBar;