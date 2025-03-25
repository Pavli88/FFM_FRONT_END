import React from "react";
import Tooltip from "../Tooltips/Tooltip";
import "./InputField.css";

const InputField = ({
                        id,
                        type,
                        value,
                        onChange,
                        placeholder,
                        label,
                        name,
                        tooltipText,
                        required = false,
                        error,
                        readOnly = false,
                        min, // Added min prop
                        defaultValue,
                        disabled = false,
                        horizontal = false
                    }) => {
    return (
        <div className={horizontal ? "input-group-horizontal" : "input-group"}>
            {label && (
                <div className="label-container">
                    <label htmlFor={id}>{label}</label>
                    {tooltipText && <Tooltip text={tooltipText}/>}
                </div>
            )}

            <input
                id={id}
                type={type}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                autoComplete="off"
                readOnly={readOnly}
                min={min} // Applied min
                defaultValue={defaultValue}
                disabled={disabled}
            />

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default InputField;
