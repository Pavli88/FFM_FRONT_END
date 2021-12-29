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

    const balanceRequestData = {
        'env': 'live',
        'start_date': 21,
        'end_date': 34,
    };
    return (
        <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight}} fluid>
            <Row style={{height: window.innerHeight}}>
                <Col style={{height: '400px', width:'50%', margin:'15px'}}>
                    <TopLevel server={server}/>
                </Col>
                <Col style={{height: '400px', width:'50%', margin:'15px'}}>
                    <Row style={{height: '150px', width:'100%', margin:'0px', padding: '10px'}}>
                        <PnLPanel server={server}/>
                    </Row>
                    <Row style={{height: '400px', width:'100%', margin:'0px', padding: '10px'}}>
                        <PerfDashBoard server={server} env={env}/>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;