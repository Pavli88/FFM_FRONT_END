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
  tooltipText,
  required = false,
  error,
  readOnly = false,
  min, // Added min prop
  defaultValue, // Added defaultValue prop
}) => {
  return (
    <div className="input-group">
      {label && (
        <div className="label-container">
          <label htmlFor={id}>{label}</label>
          {tooltipText && <Tooltip text={tooltipText} />}
        </div>
      )}

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        readOnly={readOnly}
        min={min} // Applied min
        defaultValue={defaultValue} // Applied defaultValue
      />

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default InputField;
