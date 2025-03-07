import "./ToogleSwitch.css"

const ToogleSwitch = ({label, isChecked, onToggle}) => {
    return (
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
            <label className="input-label">{label}</label>
            <label className="switch">
                <input type="checkbox" checked={isChecked} onChange={onToggle}/>
                <span className="slider"></span>
            </label>
        </div>
    );
};

export default ToogleSwitch;