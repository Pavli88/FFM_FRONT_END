import React from "react";
import "./ModalButton.css";

const ModalButton = ({label, onClick, type = "button", disabled = false, variant = "primary"}) => {
    return (

        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`modal-button ${variant}`}
        >
            {label}
        </button>
    );
};

export default ModalButton;
