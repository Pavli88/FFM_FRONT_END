import { Link, useHistory } from 'react-router-dom';
import { useContext, useState, useEffect, useRef } from 'react';
import Notifications from "./Notifications/Notifications";
import ServerContext from "../context/server-context";
import AuthContext from "../context/AuthProvider";
import UserContext from "../context/user-context";
import { logout } from "../endpoints/authservice";
import UserMenu from './UserMenu';
import SearchBar from "../components/Search/CustomSearch/SearchBar";

const Navbar = () => {
    const server = useContext(ServerContext)['server'];
    const { user, email } = useContext(UserContext);
    const {setAuth} = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('user');
    const history = useHistory();

    // Define dropdownRef to detect clicks outside the dropdown
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
        history.push("/");
    };

    return (
        <div className="nav-bar fixed-top">
            <div className="nav-brand">
                <Link className="menu-button" to="/home">Fractal</Link>
            </div>
            <div className="nav-links">
                <Link className="menu-button" to="/dashboard">Dashboard</Link>
                <Link className="menu-button" to="/portfolio/overview">Portfolio</Link>
                <Link className="menu-button" to="/instruments">Instrument</Link>
                <Link className="menu-button" to="/trade">Trade</Link>
                <Link className="menu-button" to="/calculations">Calculations</Link>
                <Link className="menu-button" to="/data">Data</Link>
            </div>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchType={searchType}
                setSearchType={setSearchType}
            />
            <div className="nav-notifications">
                <Notifications server={server} />
            </div>
            <UserMenu dropdownRef={dropdownRef} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} userLogout={userLogout} />
        </div>
    );
};

export default Navbar;
