import { Link } from 'react-router-dom';
import { FaUserCircle, FaUser, FaClipboardList, FaRegHandshake, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';
import UserContext from "../context/user-context";
import "./UserMenu.css";

const UserMenu = ({ dropdownOpen, setDropdownOpen, userLogout, dropdownRef }) => {
    const {userData} = useContext(UserContext);
    const profileImage = userData.image_url || null;

    // Function to handle menu item click
    const handleItemClick = () => {
        setDropdownOpen(false); // Close dropdown when an item is clicked
    };

    return (
        <div className="nav-user-menu" style={{ position: 'relative' }} ref={dropdownRef}>
            <button className="icon-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {profileImage ? (
                    <img src={profileImage} alt="Profile" className="nav-avatar" />
                ) : (
                    <FaUserCircle size={24} />
                )}
            </button>
            {dropdownOpen && (
                <div className="dropdown-content">
                    <Link to="/profile" className="dropdown-item" onClick={handleItemClick}>
                        <FaUser style={{ marginRight: '10px', color: '#4CAF50' }} />
                        My Profile
                    </Link>
                    <Link to="/myPortfolios" className="dropdown-item" onClick={handleItemClick}>
                        <FaClipboardList style={{ marginRight: '10px', color: '#2196F3' }} />
                        My Portfolios
                    </Link>
                    <Link to="/subscriptions" className="dropdown-item" onClick={handleItemClick}>
                        <FaRegHandshake style={{ marginRight: '10px', color: '#FFC107' }} />
                        Subscriptions
                    </Link>
                    <Link to="/brokerAccounts" className="dropdown-item" onClick={handleItemClick}>
                        <FaCog style={{ marginRight: '10px', color: '#FF5722' }} />
                        Broker Accounts
                    </Link>
                    <hr />
                    <button onClick={() => { userLogout(); handleItemClick(); }} className="dropdown-item">
                        <FaSignOutAlt style={{ marginRight: '10px', color: '#f44336' }} />
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
