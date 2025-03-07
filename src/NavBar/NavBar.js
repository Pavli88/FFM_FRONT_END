import { Link } from 'react-router-dom';
import { useContext , useState, useEffect, useRef} from 'react';
import Notifications from "./Notifications/Notifications";
import ServerContext from "../context/server-context";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import UserContext from "../context/user-context";
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { logout } from "../endpoints/authservice";

const Navbar = () => {
    const server = useContext(ServerContext)['server'];
    const { user, email } = useContext(UserContext);
    const { setAuth } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("user");

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
                <Link className="menu-button" to="/portfolio/overview">Portfolio</Link>
                {/*<Link className="menu-button" to="/risk">Risk</Link>*/}
                <Link className="menu-button" to="/instruments">Instrument</Link>
                <Link className="menu-button" to="/trade">Trade</Link>
                <Link className="menu-button" to="/calculations">Calculations</Link>
                <Link className="menu-button" to="/data">Data</Link>
            </div>
            <div  style={{ display: 'flex', alignItems: 'center', borderRadius: '20px', overflow: 'hidden', border: '1px solid #ccc', padding: '5px', background: '#fff', height: 45 }}>
                <FaSearch size={26} style={{ marginLeft: '10px', color: '#888', width: 50 }} />
                <input
                    type="text"
                    placeholder={`Search ${searchType}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    // className="search-input"
                    style={{ flex: 1, padding: '8px 12px', border: 'none', outline: 'none', width: 200 }}
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="search-dropdown"
                    style={{ padding: '8px', border: 'none', background: '#f8f8f8', cursor: 'pointer' }}
                >
                    <option value="user">User</option>
                    <option value="portfolio">Portfolio</option>
                </select>
            </div>
            <div className="nav-notifications">
                <Notifications server={server} />
            </div>
            <div className="nav-user-menu" style={{ position: 'relative' }} ref={dropdownRef}>
                <button className="icon-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <FaUserCircle size={24} />
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
                        <Link to="/profile" className="dropdown-item">My Profile</Link>
                        <Link to="/myPortfolios" className="dropdown-item">My Portfolios</Link>
                        <Link to="/subscriptions" className="dropdown-item">Subscriptions</Link>
                        <Link to="/brokerAccounts" className="dropdown-item">Broker Accounts</Link>
                        <hr />
                        <button onClick={userLogout} className="dropdown-item">Sign Out</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
