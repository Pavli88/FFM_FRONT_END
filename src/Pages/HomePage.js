import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PerfDashBoard from "./HomePage/PerfDashBoard";
import {useContext, useEffect, useState} from "react";

import RobotStatCards from "./HomePage/RobotStatCards";
import RobotExecution from "./HomePage/RobotExecution/RobotExecution";
import SystemMessages from "./HomePage/SystemMessages/SystemMessages";

import TopLevel from "./HomePage/DashBoard/TopLevel";
import PnLPanel from "./HomePage/DashBoard/PnLPanel";
import BalanceDashBoard from "./HomePage/DashBoard/BalanceDashboard";
import ContributionPnl from "./HomePage/DashBoard/ContributionPnl";

// Chart Imports
import BarCharting from "../components/Charts/BarCharting";

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

// Contexts
import EnvContext from "../context/env-context";
import ServerContext from "../context/server-context";
import axios from "axios";

const HomePage = (props) => {
    // Context variables
    const env = useContext(EnvContext)['environment'];
    const server = useContext(ServerContext)['server'];
    const startDate = new Date().toISOString().substr(0,10);

    return (
        <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight}} fluid>
            <h4>Profit and Loss</h4>
            <Row style={{height: '33%'}}>
                <Col style={{height: '100%'}}>
                    <TopLevel server={server} env={env} />
                </Col>
                <Col style={{height: '100%'}}>
                    <ContributionPnl server={server} env={env}/>
                </Col>
            </Row>
            <Row style={{height: '33%'}}>
                <Col>
                    <h4>Balance</h4>
                    <BalanceDashBoard server={server} env={env}/>
                </Col>

                <Col>
                    <h4>Performance</h4>
                    <PerfDashBoard server={server} env={env} env={env}/>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;