import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'

import {useContext, useState} from "react";

import BalanceCalculation from "../Pages/Robot/BalanceCalculation";

import NewBrokerAccount from "./NewBrokerAccount";
import ServerContext from "../context/server-context";

const Navigation = (props) => {

    const server = useContext(ServerContext)['server'];

    const [showNewAccount, setShowNewAccount] = useState(false);

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
                <Navbar.Brand href="#home">FFM SYSTEM</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to={'/home'}>Home</Nav.Link>
                    <Nav.Link as={Link} to={'/portfolio'}>Portfolio</Nav.Link>
                    <Nav.Link as={Link} to={'/robot'}>Robot</Nav.Link>
                    <Nav.Link as={Link} to={'/risk'}>Risk</Nav.Link>
                    <Nav.Link as={Link} to={'/instruments'}>Instrument</Nav.Link>
                    <Nav.Link as={Link} to={'/trade'}>Trade</Nav.Link>
                    <NavDropdown title="Calculations">
                        <NavDropdown.Item>Robot Balance</NavDropdown.Item>
                        <NavDropdown.Item></NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item>Portfolio Holdings</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Broker Accounts">
                        <NavDropdown.Item onSelect={newAccountHandler}>New</NavDropdown.Item>
                        <NavDropdown.Item>Update</NavDropdown.Item>
                        <NavDropdown.Item>Delete</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    <Button variant="outline-info">Search</Button>
                </Form>
                <Dropdown onSelect={envChange} style={{marginLeft:'10px'}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {props.env}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="live">Live</Dropdown.Item>
                        <Dropdown.Item eventKey="demo">Demo</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <NewBrokerAccount show={showNewAccount} hide={hideNewAccount} server={server}/>
            </Navbar>

    );
};

export default Navigation;