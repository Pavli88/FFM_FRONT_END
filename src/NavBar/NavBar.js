import {Navbar, Nav } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom'
import {useContext, useEffect, useState} from "react";
import Notifications from "./Notifications/Notifications";
import ServerContext from "../context/server-context";
import AuthContext from "../context/AuthProvider";
import axios from "axios";

const Navigation = (props) => {
    const server = useContext(ServerContext)['server'];
    const { setAuth } = useContext(AuthContext);
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
        <Navbar className={'nav-bar'}>
            <Navbar.Brand href="react">
                {/*<img*/}
                {/*    // src={logo}*/}
                {/*    alt="Fractal Logo"*/}
                {/*    width="40" // Adjust size as needed*/}
                {/*    height="40" // Adjust size as needed*/}
                {/*    className="d-inline-block align-top"*/}
                {/*/>*/}
                Fractal
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Link className={'menu-button'} onClick={() => setProcessHandler(<></>)} as={Link}
                      to={'/home'}>Home</Link>
                <Link className={'menu-button'} as={Link} to={'/dashboard'}>Dashboard</Link>
                <Link className={'menu-button'} as={Link} to={'/portfolio/holdings'}>Portfolio</Link>
                <Link className={'menu-button'} as={Link} to={'/risk'}>Risk</Link>
                <Link className={'menu-button'} as={Link} to={'/instruments'}>Instrument</Link>
                <Link className={'menu-button'} as={Link} to={'/trade'}>Trade</Link>
                <Link className={'menu-button'} as={Link} to={'/calculations'}>Calculations</Link>
                <Link className={'menu-button'} as={Link} to={'/data'}>Data</Link>
            </Nav>

            <Notifications server={server}/>

            <DropdownButton alignRight flip style={{borderRadius: '50px'}} title={props.user}>
                <Dropdown.Item as={Link} to={'/profil'}>Profil</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onSelect={userLogout}>Sign Out</Dropdown.Item>
            </DropdownButton>
        </Navbar>
    );
};

export default Navigation;