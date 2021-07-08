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

// Bootstrap
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import OptionLoader from "../components/Options";


const PortfolioPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];
    const portfolios = useContext(PortfolioContext)['portfolioData'];
    const [portfolio, setPortfolio] = useState(portfolios[0]['portfolio_code']);

    console.log(portfolios)
    const portfolioOptions = portfolios.map((record) =>
        <option key={record['id']} value={record['portfolio_code']}>{record['portfolio_name']}</option>)

    const portSelectHandler = (event) => {
        setPortfolio(event.target.value);
    };

    const portSelect = (port) => {
        setPortfolio(port);
    };

    return (
        <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '20px'}} fluid>
            <Row>
                <Col>
                    <Container className="border" style={{width: "100%", height: window.innerHeight}}>
                        <PortfolioDetails portOptions={portfolioOptions} portChange={portSelect}/>
                        <Holdings/>
                        <PortfolioNav portfolio={portfolio} server={server}/>
                    </Container>
                </Col>
                <Col>
                    <Container className="border" style={{height: '50%'}}>
                        <NewPortfolioForm server={server}/>
                    </Container>
                    <PortfolioTransactions portfolio={portfolio} server={server}/>
                    <PortfolioSettings/>

                </Col>
            </Row>
        </Container>
    );
};

export default PortfolioPage;