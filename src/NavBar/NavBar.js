import { Link } from 'react-router-dom';
import { useContext , useState, useEffect, useRef} from 'react';
import Notifications from "./Notifications/Notifications";
import ServerContext from "../context/server-context";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import UserContext from "../context/user-context";
import { FaUserCircle } from 'react-icons/fa';
import { logout } from "../endpoints/authservice";

const Navbar = () => {
    const server = useContext(ServerContext)['server'];
    const {user, email} = useContext(UserContext);
    const {setAuth} = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const userLogout = () => {
        logout();
        setAuth({ userAllowedToLogin: false });
    };

    return (
        <div className="nav-bar fixed-top">
            <div className="nav-brand">
                <Link className="menu-button" to="/home">Fractal</Link>
            </div>
            <div className="nav-links">
                <Link className="menu-button" to="/dashboard">Dashboard</Link>
                <Link className="menu-button" to="/portfolio/holdings">Portfolio</Link>
                <Link className="menu-button" to="/risk">Risk</Link>
                <Link className="menu-button" to="/instruments">Instrument</Link>
                <Link className="menu-button" to="/trade">Trade</Link>
                <Link className="menu-button" to="/calculations">Calculations</Link>
                <Link className="menu-button" to="/data">Data</Link>
            </div>
            <div className="nav-notifications">
                <Notifications server={server}/>
            </div>
            <div className="nav-user-menu" style={{position: 'relative'}} ref={dropdownRef}>
                <button className="icon-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <FaUserCircle size={24}/>
                </button>
                {dropdownOpen && (
                    <div className="dropdown-content" style={{
                        position: 'absolute',
                        right: 0,
                        top: '50px',
                        background: '#fff',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        borderRadius: '10px',
                        padding: '10px',
                        minWidth: '150px'
                    }}>
                        <Link to="/profile" style={{
                            display: 'block',
                            padding: '8px 12px',
                            textDecoration: 'none',
                            color: '#333'
                        }}>My Profile</Link>
                        <Link to="/myPortfolios" style={{
                            display: 'block',
                            padding: '8px 12px',
                            textDecoration: 'none',
                            color: '#333'
                        }}>My Portfolios</Link>
                        <Link to="/subscriptions" style={{
                            display: 'block',
                            padding: '8px 12px',
                            textDecoration: 'none',
                            color: '#333'
                        }}>Subscriptions</Link>
                        <Link to="/brokerAccounts" style={{
                            display: 'block',
                            padding: '8px 12px',
                            textDecoration: 'none',
                            color: '#333'
                        }}>Broker Accounts</Link>
                        <hr/>
                        <button onClick={userLogout}>Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
