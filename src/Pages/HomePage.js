import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";

import PerfDashBoard from "./HomePage/PerfDashBoard";
import {useContext, useEffect, useState} from "react";

import RobotStatCards from "./HomePage/RobotStatCards";
import RobotExecution from "./HomePage/RobotExecution/RobotExecution";
import SystemMessages from "./HomePage/SystemMessages/SystemMessages";

import TopLevel from "./HomePage/DashBoard/TopLevel";
import PnLPanel from "./HomePage/DashBoard/PnLPanel";
import BalanceDashBoard from "./HomePage/DashBoard/BalanceDashboard";
import ContributionPnl from "./HomePage/DashBoard/ContributionPnl";
import HomeNavBar from "./HomePage/DashBoard/HomeNavBar";
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
            <Card style={{height: '50px', paddingTop:'15px'}}>
                <HomeNavBar/>
            </Card>
            <Row style={{height: '100%'}}>
                <Col style={{height: '400px',paddingRight:'0px', paddingLeft: '0px'}}>
                    <TopLevel server={server} env={env} />
                    <BalanceDashBoard server={server} env={env}/>
                </Col>
                <Col style={{height: '600px', paddingRight:'0px', paddingLeft:'0px'}}>
                    <ContributionPnl server={server} env={env}/>
                    <PerfDashBoard server={server} env={env} env={env}/>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;