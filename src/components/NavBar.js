import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'

import {useContext, useEffect, useState} from "react";

import NewBrokerAccount from "./NewBrokerAccount";
import NewBroker from "../NavBar/NewBroker";
import Notifications from "./Notifications";
import NavRobot from "../NavBar/NavRobot";
import NavCalculation from "../NavBar/NavCalculation";
import NavPortfolio from "../NavBar/NavPortfolio";

// Context
import ServerContext from "../context/server-context";

const Navigation = (props) => {
    const server = useContext(ServerContext)['server'];
    const [showNewAccount, setShowNewAccount] = useState(false);
    const [brokerModalStatus, setBrokerModalStatus] = useState(false);
    const [processHandler, setProcessHandler] = useState(<></>);
    return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="react">FFM SYSTEM</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => setProcessHandler(<></>)} as={Link} to={'/home'}>Home</Nav.Link>
                    <Nav.Link onClick={() => setProcessHandler(<NavPortfolio/>)} as={Link} to={'/portfolio/dashboard'}>Portfolio</Nav.Link>
                    <Nav.Link onClick={() => setProcessHandler(<NavRobot server={server}/>)} as={Link} to={'/robot/dashboard'}>Robot</Nav.Link>
                    <Nav.Link onClick={() => setProcessHandler(<></>)} as={Link} to={'/risk'}>Risk</Nav.Link>
                    <Nav.Link onClick={() => setProcessHandler(<></>)} as={Link} to={'/instruments'}>Instrument</Nav.Link>
                    <Nav.Link onClick={() => setProcessHandler(<></>)} as={Link} to={'/trade'}>Trade</Nav.Link>
                    <Nav.Link onClick={() => setProcessHandler(<NavCalculation/>)} as={Link} to={'/calculations'}>Calculations</Nav.Link>
                    <NavDropdown title="Broker Accounts">
                        <NavDropdown.Item onSelect={() => setShowNewAccount(true)}>New Account</NavDropdown.Item>
                        <NavDropdown.Item onSelect={() => setBrokerModalStatus(true)}>New Broker</NavDropdown.Item>
                        <NavDropdown.Item>Update</NavDropdown.Item>
                        <NavDropdown.Item>Delete</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {processHandler}
                <Notifications server={server}/>
                {/*<Form inline style={{margin: '5px'}}>*/}
                {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>*/}
                {/*    <Button variant="outline-info">Search</Button>*/}
                {/*</Form>*/}

                <NewBrokerAccount show={showNewAccount} hide={() => setShowNewAccount(false)} server={server}/>
                <NewBroker show={brokerModalStatus} hide={() => setBrokerModalStatus(false)} server={server}/>
            </Navbar>
    );
};

export default Navigation;