import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import Card from 'react-bootstrap/Card';

import PerfDashBoard from "./HomePage/PerfDashBoard";
import {useContext} from "react";

import RobotStatCards from "./HomePage/RobotStatCards";

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';


// Contexts
import EnvContext from "../context/env-context";
import ServerContext from "../context/server-context";
import {yellow} from "@material-ui/core/colors";

const HomePage = (props) => {
    // Context variables
    const env = useContext(EnvContext)['environment'];
    const server = useContext(ServerContext)['server'];

    const balanceRequestData = {
        'env': 'live',
        'start_date': 21,
        'end_date': 34,
    };

    return (
            <Container style={{background:'#FBFAFA', width: "100%", height: window.innerHeight}} fluid>
            <Row style={{height: window.innerHeight}}>
                <Col style={{height: '100%'}}>
                    <Container>
                        <Row style={{margin: '5px'}}>
                            <h5 style={{textAlign: "center",width: '100%', margin: '0px'}}>Robots</h5>
                        </Row>
                        <RobotStatCards env={env} server={server}/>
                    </Container>
                </Col>
                <Col style={{height: '100%'}}>
                    <Container>
                        <Row style={{margin: '5px'}}>
                            <h5 style={{textAlign: "center", width: '100%', margin: '0px'}}>Performance</h5>
                        </Row>
                        <PerfDashBoard server={server} env={env}/>

                    </Container>
                    <Container>
                        <Row style={{margin: '5px'}}>
                            <h5 style={{textAlign: "center", width: '100%', margin: '0px'}}>Accounts</h5>
                        </Row>
                        <Row style={{height: '400px', paddingTop: '5px', paddingBottom: '5px'}}>
                            <Col style={{paddingLeft: '5px', paddingRight: '5px'}}>
                                <Card style={{height: '100%', width: '100%', margin: '0px'}}/>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;