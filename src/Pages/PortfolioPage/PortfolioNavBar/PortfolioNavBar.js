import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Nav} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PortfolioPageContext from "../context/portfolio-page-context";
import {useContext, useRef, useState} from "react";
import './PortfolioNavBar.css'
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import ServerContext from "../../../context/server-context";
import { BsArrowRepeat } from 'react-icons/bs';

const PortfolioNavBar = (props) => {
    const server = useContext(ServerContext)['server'];
    const savePortfolioData = useContext(PortfolioPageContext).savePortfolioData
    const savePortfolioCode = useContext(PortfolioPageContext).savePortfolioCode
    const [loadStatus, setLoadStatus] = useState(false);
    const [textAnimation, setTextAnimation] = useState(0);
    const portfolioRef = useRef();

    // const fetchPortfolioData = (portfolio) => {
    //     axios.get(server + 'portfolios/get/portfolios/', {
    //         params: {
    //             portfolio_code: portfolioRef.current.value,
    //         }
    //     })
    //         .then(response => savePortfolioData(response.data))
    //         .catch((error) => {
    //             console.error('Error Message:', error);
    //         });
    // };

    const loadingButton = <div style={{position: "absolute", right: 5, height: '100%'}}>
        <button style={{border: "none", height: '100%', borderRadius: 8}} disabled>
            <div style={{display: "flex"}}>
                <div>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                </div>
                <div style={{padding: 2}}>
                    Loading...
                </div>
            </div>
        </button>
    </div>

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
                                <Button onClick={(e) => savePortfolioCode(portfolioRef.current.value)} style={{background: "white", color: "grey", borderColor: "grey"}}><BsArrowRepeat style={{fontSize: 20, fontWeight: "bold"}}/></Button>
                            </Col>
                            {/*<Col md="auto">*/}
                            {/*    <Button onClick={() => setTextAnimation(1)}>Get</Button>*/}
                            {/*</Col>*/}
                            {/*<div className={'portfolio-result-animation portfolio-result-found'}*/}
                            {/*     status={textAnimation}*/}
                            {/*     onAnimationEnd={() => setTextAnimation(0)}>*/}
                            {/*    test*/}
                            {/*</div>*/}
                            {loadStatus ? loadingButton: ''}
                        </Row>
                    </Col>
                </div>
            </Card>
        </div>
    )
};
export default PortfolioNavBar;