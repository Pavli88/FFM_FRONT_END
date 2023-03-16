import {Navbar, Nav, Container, Col} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
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
import AuthContext from "../context/AuthProvider";
import axios from "axios";

const Navigation = (props) => {
    const server = useContext(ServerContext)['server'];
    const { setAuth } = useContext(AuthContext);
    const [showNewAccount, setShowNewAccount] = useState(false);
    const [brokerModalStatus, setBrokerModalStatus] = useState(false);
    const [processHandler, setProcessHandler] = useState(<></>);
    const userLogout = () => {
        axios.get(server + 'user_logout/', )
            .then(response => console.log(response.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        setAuth({userAllowedToLogin: false});
    };
    return (
        <Navbar>
            <Navbar.Brand href="react">
                Fractal
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link onClick={() => setProcessHandler(<></>)} as={Link} to={'/home'}>Home</Nav.Link>
                <Nav.Link as={Link} to={'/dashboard'}>Dashboard</Nav.Link>
                <Nav.Link onClick={() => setProcessHandler(<NavPortfolio/>)} as={Link}
                          to={'/portfolio/dashboard'}>Portfolio</Nav.Link>
                <Nav.Link as={Link} to={'/robot/dashboard'}>Robot</Nav.Link>
                <Nav.Link onClick={() => setProcessHandler(<></>)} as={Link} to={'/risk'}>Risk</Nav.Link>
                <Nav.Link onClick={() => setProcessHandler(<></>)} as={Link}
                          to={'/instruments'}>Instrument</Nav.Link>
                <Nav.Link onClick={() => setProcessHandler(<></>)} as={Link} to={'/trade'}>Trade</Nav.Link>
                <Nav.Link onClick={() => setProcessHandler(<NavCalculation/>)} as={Link}
                          to={'/calculations'}>Calculations</Nav.Link>
                <NavDropdown title="Broker Accounts">
                    <NavDropdown.Item onSelect={() => setShowNewAccount(true)}>New Account</NavDropdown.Item>
                    <NavDropdown.Item onSelect={() => setBrokerModalStatus(true)}>New Broker</NavDropdown.Item>
                    <NavDropdown.Item>Update</NavDropdown.Item>
                    <NavDropdown.Item>Delete</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            {processHandler}
            <Notifications server={server}/>
            <DropdownButton alignRight flip title={props.user} style={{borderRadius: '5px'}}>
                <Dropdown.Item as={Link} to={'/profil'} >Profil</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onSelect={userLogout}>Sign Out</Dropdown.Item>
            </DropdownButton>
            <NewBrokerAccount show={showNewAccount} hide={() => setShowNewAccount(false)} server={server}/>
            <NewBroker show={brokerModalStatus} hide={() => setBrokerModalStatus(false)} server={server}/>
        </Navbar>
    );
};

export default Navigation;