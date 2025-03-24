import {BsCaretDownFill, BsCaretUpFill} from "react-icons/bs";

const ValueChange = ({mainValue, change, label, percentage=false}) => {
    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <label style={{fontWeight: "bold", marginRight: 5}}>{label}</label>
            <label
                style={{
                    fontWeight: "bold",
                    color: mainValue > 0 ? "#00a59a" : "#ee7d8b",
                }}
            >
                {mainValue > 0 ? "+" : ""}
                {mainValue}{percentage ? '%': ''}
                {change !== 0 && (
                    <span
                        style={{
                            fontSize: "0.8em",
                            opacity: 0.7,
                            marginLeft: 5,
                        }}
                    >
                        <span
                            style={{
                                color: change > 0 ? "#00a59a" : "#ee7d8b",
                                display: "inline-flex",
                                alignItems: "center",
                            }}
                        >
                            {change > 0 ? (
                                <BsCaretUpFill/>
                            ) : (
                                <BsCaretDownFill/>
                            )}
                            {change > 0 ? "+" : "-"}
                            {Math.abs(change).toFixed(2)}{percentage ? '%': ''}
                        </span>
                    </span>
                )}
            </label>
        </div>
    )
};
export default ValueChange;