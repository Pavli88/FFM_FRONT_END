import "./ToogleSwitch.css"

const ToogleSwitch = ({ label, isChecked, onToggle, horizontal = false }) => {
    return (
        <div className={`input-group ${horizontal ? 'input-group-horizontal' : ''}`}>
            <label className="input-label">{label}</label>
            <label className="switch">
                <input type="checkbox" checked={isChecked} onChange={onToggle} />
                <span className="slider" />
            </label>
        </div>
    );
};

export default ToogleSwitch;