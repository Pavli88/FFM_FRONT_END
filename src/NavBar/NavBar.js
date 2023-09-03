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
                Fractal
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Link className={'nav-button'} onClick={() => setProcessHandler(<></>)} as={Link} to={'/home'}>Home</Link>
                <Link className={'nav-button'} as={Link} to={'/dashboard'}>Dashboard</Link>
                <Link className={'nav-button'} as={Link}
                          to={'/portfolio/dashboard'}>Portfolio</Link>
                <Link className={'nav-button'} as={Link} to={'/risk'}>Risk</Link>
                <Link className={'nav-button'} as={Link}
                          to={'/instruments'}>Instrument</Link>
                <Link className={'nav-button'} as={Link} to={'/trade'}>Trade</Link>
                <Link className={'nav-button'} as={Link}
                          to={'/calculations'}>Calculations</Link>
                <Link className={'nav-button'} as={Link} to={'/data'}>Data</Link>
            </Nav>
            <Notifications server={server}/>
            <DropdownButton alignRight flip title={props.user} style={{borderRadius: '5px'}}>
                <Dropdown.Item as={Link} to={'/profil'} >Profil</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onSelect={userLogout}>Sign Out</Dropdown.Item>
            </DropdownButton>
        </Navbar>
    );
};

export default Navigation;