import {useContext, useEffect, useState} from "react";

import ServerContext from "../context/server-context";
import EnvContext from "../context/env-context";
import PortfolioContext from "../context/portfolio-context";
import axios from "axios";

import NewPortfolioForm from "./PortfolioPage/NewPortfolioForm";
import PortfolioSettings from "./PortfolioPage/PortfolioSettings";
import Holdings from "./PortfolioPage/Holdings";
import PortfolioTransactions from "./PortfolioPage/PortfolioTransactions";
import PortfolioNav from "./PortfolioPage/PortfolioNav";
import PortfolioDetails from "./PortfolioPage/PortfolioDetails";
import PortfolioGroup from "./PortfolioPage/PortfolioGroup";
import PortfolioRisk from "./PortfolioPage/PortfolioRisk";
import PortfolioReturn from "./PortfolioPage/PortfolioReturn";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import OptionLoader from "../components/Options";

// CSS
import "./PortfolioPage.css"

import PortfolioBuy from "./PortfolioPage/PortfolioBuy";
import NewPortCashFlow from "./PortfolioPage/NewPortCashFlow";

const PortfolioPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];
    const portfolios = useContext(PortfolioContext)['portfolioData'];
    const [portfolio, setPortfolio] = useState(portfolios[0]['portfolio_code']);
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);

    console.log(portfolios)
    const portfolioOptions = portfolios.map((record) =>
        <option key={record['id']} value={record['portfolio_code']}>{record['portfolio_name']}</option>)

    const portSelectHandler = (event) => {
        setPortfolio(event.target.value);
    };

    const portSelect = (port) => {
        setPortfolio(port);
    };

    const startDateHandler = (event) => {
        setStartDate(event.target.value);
    };

    const endDateHandler = (event) => {
        setEndDate(event.target.value);
    };

    return (
        <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '20px'}} fluid>
            <Row>
                <Col style={{display: 'flex'}}>
                    <Row>
                        <Col>
                            <Form.Group as={Row}>
                                <Form.Label className="form-label-first" column sm={2}>
                                    Portfolio
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control onChange={portSelectHandler} as="select">
                                        {portfolioOptions}
                                    </Form.Control>

                                </Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Row}>
                                <Form.Label className="form-label-first" column sm={2}>
                                    From
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="date" onChange={startDateHandler}/>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Row}>
                                <Form.Label className="form-label-first" column sm={2}>
                                    To
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="date" onChange={endDateHandler}/>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <NewPortfolioForm server={server}/>
                        </Col>
                        <Col>
                            <NewPortCashFlow portfolio={portfolio} server={server}/>
                        </Col>
                        <Col>
                            <PortfolioBuy portfolio={portfolio} server={server}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row style={{height: '300px', padding: '5px'}}>
                        <Col style={{height: '100%'}}>
                            <PortfolioDetails portOptions={portfolioOptions} portChange={portSelect}/>
                        </Col>
                        <Col>
                            <PortfolioNav portfolio={portfolio} server={server}/>
                        </Col>
                    </Row>
                    <Row style={{height: '500px', padding: '5px'}}>
                        <Col>
                            <PortfolioRisk/>
                        </Col>
                    </Row>
                    <Row style={{height: '500px', padding: '5px'}}>
                        <Col>
                            <PortfolioReturn/>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row style={{height: '300px', padding: '5px'}}>
                        <Col style={{height: '100%'}}>
                            <PortfolioGroup/>
                        </Col>
                        <Col>
                            <PortfolioSettings/>
                        </Col>
                    </Row>
                    <Row style={{height: '500px', padding: '5px'}}>
                        <Col>
                            <Holdings/>
                        </Col>
                    </Row>
                    <Row style={{height: '500px', padding: '5px'}}>
                        <Col>
                            <PortfolioTransactions portfolio={portfolio} server={server}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default PortfolioPage;