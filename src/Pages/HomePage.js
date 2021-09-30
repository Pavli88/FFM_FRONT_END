import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';

import PerfDashBoard from "./HomePage/PerfDashBoard";
import {useContext, useState} from "react";

import RobotStatCards from "./HomePage/RobotStatCards";
import RobotExecution from "./HomePage/RobotExecution/RobotExecution";
import SystemMessages from "./HomePage/SystemMessages/SystemMessages";

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';


// Contexts
import EnvContext from "../context/env-context";
import ServerContext from "../context/server-context";
import {yellow} from "@material-ui/core/colors";
import Form from "react-bootstrap/Form";

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
                <Col style={{height: '100%'}}>
                    <br/>
                    <Container>
                        <RobotExecution server={server} env={env}/>

                        <br/>
                        <Card className="card">
                            <Card.Title className="card-header-first">System Messages</Card.Title>
                            <Form.Group>
                                <Form.Control type="date" onChange={dateHandler} defaultValue={startDate}/>
                            </Form.Group>
                        </Card>

                        <br/>
                        <SystemMessages server={server} date={date}/>
                    </Container>
                </Col>
                <Col style={{height: '100%'}}>
                    <br/>
                    <PerfDashBoard server={server} env={env}/>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;