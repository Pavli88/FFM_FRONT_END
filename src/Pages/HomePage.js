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
    const [date, setDate] = useState(startDate);

    const dateHandler = (event) => {
        setDate(event.target.value);
    };

    return (
        <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight}} fluid>
            <Row style={{height: window.innerHeight}}>
                <Col style={{height: '800px', width:'50%', margin:'15px'}}>
                    <h4 style={{textAlign:'left', marginTop:'0px', marginBottom:'15px'}}>Balance</h4>
                    <BalanceDashBoard server={server} env={env}/>
                    <h4 style={{textAlign:'left', marginTop:'15px'}}>Total Robot Results</h4>
                    <TopLevel server={server} env={env} />
                </Col>
                <Col style={{height: '800px', width:'50%', margin:'15px'}}>
                    <h4>Profit</h4>
                    <PnLPanel server={server} env={env}/>
                    <ContributionPnl server={server} env={env}/>
                    <h4>Performance</h4>
                    <PerfDashBoard server={server} env={env} env={env}/>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;