import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'

import {useContext, useEffect, useState} from "react";

import NewBrokerAccount from "./NewBrokerAccount";
import NewBroker from "../NavBar/NewBroker";
import Notifications from "./Notifications";
import DateSelectorRobotPage from "../Pages/Robot/DateSelectorRobotPage";
import ServerContext from "../context/server-context";
import {store} from "react-notifications-component";
import axios from "axios";
import DateContext from "../context/date-context";


const Navigation = (props) => {
    const startDate = useContext(DateContext)['startDate']
    const endDate = useContext(DateContext)['endDate']
    const setStartDate = useContext(DateContext)['saveStartDate']
    const setEndDate = useContext(DateContext)['saveEndDate']
    const [showNewAccount, setShowNewAccount] = useState(false);
    const [brokerModalStatus, setBrokerModalStatus] = useState(false);
    const startDateHandler = (event) => {
        setStartDate(event.target.value);
    };
    const endDateHandler = (event) => {
        if (event.target.value < startDate) {
            alert('End date can not be less then start date!');
        }else {
            setEndDate(event.target.value);
        };
    };
    const server = useContext(ServerContext)['server'];

    const envChange = (envValue) => {
        props.onEnvChange(envValue);
    };
    // New account handlers
    const newAccountHandler = () => {
        setShowNewAccount(true);
    };
    const hideNewAccount = () => {
        setShowNewAccount(false);
    };
    return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="react">FFM SYSTEM</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to={'/home'}>Home</Nav.Link>
                    <Nav.Link as={Link} to={'/portfolio/dashboard'}>Portfolio</Nav.Link>
                    <Nav.Link as={Link} to={'/robot/dashboard'}>Robot</Nav.Link>
                    <Nav.Link as={Link} to={'/risk'}>Risk</Nav.Link>
                    <Nav.Link as={Link} to={'/instruments'}>Instrument</Nav.Link>
                    <Nav.Link as={Link} to={'/trade'}>Trade</Nav.Link>
                    <Nav.Link as={Link} to={'/calculations'}>Calculations</Nav.Link>
                    <NavDropdown title="Broker Accounts">
                        <NavDropdown.Item onSelect={newAccountHandler}>New Account</NavDropdown.Item>
                        <NavDropdown.Item onSelect={() => setBrokerModalStatus(true)}>New Broker</NavDropdown.Item>
                        <NavDropdown.Item>Update</NavDropdown.Item>
                        <NavDropdown.Item>Delete</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Period">
                        <Form.Label>From</Form.Label>
                        <FormControl
                            type="date"
                            className="me-2"
                            aria-label="Search"
                            defaultValue={startDate}
                            onChange={startDateHandler}
                        />
                        <Form.Label>To</Form.Label>
                        <FormControl
                            type="date"
                            className="me-2"
                            aria-label="Search"
                            defaultValue={endDate}
                            onChange={endDateHandler}
                        />
                    </NavDropdown>
                </Nav>
                {/*<DateSelectorRobotPage/>*/}
                <Notifications server={server}/>
                {/*<Form inline style={{margin: '5px'}}>*/}
                {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>*/}
                {/*    <Button variant="outline-info">Search</Button>*/}
                {/*</Form>*/}
                <Nav.Link href="#" disabled>
                    Environment
                </Nav.Link>
                <Dropdown onSelect={envChange} style={{margin: '5px'}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {props.env}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="live">Live</Dropdown.Item>
                        <Dropdown.Item eventKey="demo">Demo</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <NewBrokerAccount show={showNewAccount} hide={hideNewAccount} server={server}/>
                <NewBroker show={brokerModalStatus} hide={() => setBrokerModalStatus(false)} server={server}/>
            </Navbar>
    );
};

export default Navigation;