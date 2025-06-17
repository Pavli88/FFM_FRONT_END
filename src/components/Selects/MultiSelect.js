import {useState} from "react";
import './MultiSelect.css'

const MultiSelect = ({ options, selected, onChange, placeholder = "Select options..." }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option) => {
    const alreadySelected = selected.some((item) => item.value === option.value);
    const newSelected = alreadySelected
      ? selected.filter((item) => item.value !== option.value)
      : [...selected, option];
    onChange(newSelected);
  };

  const removeOption = (option) => {
    onChange(selected.filter((item) => item.value !== option.value));
  };

  return (
    <div className="multi-select" tabIndex={0} onBlur={() => setIsOpen(false)}>
      <div className="multi-select-display" onClick={() => setIsOpen(!isOpen)}>
        {selected.length === 0 && <span className="placeholder">{placeholder}</span>}
        {selected.map((option) => (
          <span key={option.value} className="selected-tag">
            {option.label}
            <button onClick={(e) => { e.stopPropagation(); removeOption(option); }}>×</button>
          </span>
        ))}
      </div>
      {isOpen && (
        <div className="multi-select-dropdown">
          {options.map((option) => (
            <div
              key={option.value}
              className={`option ${selected.some((item) => item.value === option.value) ? 'selected' : ''}`}
              onClick={() => toggleOption(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;