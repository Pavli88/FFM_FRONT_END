import React, { useState } from "react";
import "./DropDown.css"

const UserMenu = () => {
    // State to track if the dropdown is open or closed
    const [isOpen, setIsOpen] = useState(false);

    // Toggle the dropdown open/close state
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="user-menu">
            {/* User icon */}
            <div className="user-icon" onClick={toggleDropdown}>
                <img src="/path/to/user-icon.png" alt="User Icon" />
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li>Profile</li>
                        <li>Settings</li>
                        <li>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserMenu;