import {useContext, useEffect, useState} from "react";

import ServerContext from "../context/server-context";
import EnvContext from "../context/env-context";
import PortfolioContext from "../context/portfolio-context";
import axios from "axios";

import NewPortfolioForm from "./PortfolioPage/NewPortfolioForm";
import PortfolioTable from "../components/Tables/PortfolioTable";
import PortfolioBuy from "./PortfolioPage/PortfolioBuy";
import NewPortCashFlow from "./PortfolioPage/NewPortCashFlow";
import PortfolioSettings from "./PortfolioPage/PortfolioSettings";
import Holdings from "./PortfolioPage/Holdings";

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

    return (
        <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '20px'}} fluid>
            <Row>
                <Col>
                    <Container className="border" style={{width: "100%", height: window.innerHeight}}>

                        <Card style={{height: '200px'}}>
                            <div style={{display: "flex", width: '50%'}}>
                                <Card.Title>Portfolio</Card.Title>
                                <Form.Control onChange={portSelectHandler} as="select">
                                    {portfolioOptions}
                                </Form.Control>
                            </div>
                        </Card>
                        <Card style={{height: '200px'}}>
                            <NewPortCashFlow portfolio={portfolio} server={server}/>
                            <PortfolioBuy portfolio={portfolio} server={server}/>
                        </Card>

                        <Holdings/>
                    </Container>
                </Col>
                <Col>
                    <Container className="border" style={{height: '50%'}}>
                        <NewPortfolioForm server={server}/>
                    </Container>
                    <Card>
                        <Card.Header as="h5">

                        </Card.Header>
                        <PortfolioTable server={server}/>
                    </Card>

                    <PortfolioSettings/>
                </Col>
            </Row>
        </Container>
    );
};

export default PortfolioPage;