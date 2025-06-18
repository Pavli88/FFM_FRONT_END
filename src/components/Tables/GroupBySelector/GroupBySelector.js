import './GroupBySelector.css'

const GroupBySelector = ({ options, selected, setSelected }) => {
  const availableOptions = options.filter((opt) => !selected.includes(opt.value));

  const addGroupBy = (e) => {
    const value = e.target.value;
    if (value && !selected.includes(value)) {
      setSelected([...selected, value]);
    }
  };

  const removeGroupBy = (value) => {
    setSelected(selected.filter((item) => item !== value));
  };

  return (
    <div className="group-by-container">
      <label className="group-by-label">Group by</label>
      <div className="group-by-select-wrapper">
        <select className="group-by-select" onChange={addGroupBy} value="">
          <option value="" disabled>
            Select group...
          </option>
          {availableOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="group-by-tags">
        {selected.map((value) => {
          const label = options.find((opt) => opt.value === value)?.label || value;
          return (
            <span key={value} className="group-by-tag">
              {label}
              <button onClick={() => removeGroupBy(value)} className="group-by-remove">
                ✕
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default GroupBySelector;