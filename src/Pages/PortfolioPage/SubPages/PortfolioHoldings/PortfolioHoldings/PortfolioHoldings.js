import { useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { CSVLink } from "react-csv";
import HoldingsTable from "../../../../../components/Tables/HoldingTable";

const PortfolioHoldings = ({ date, changeDate, data }) => {
    const dateRef = useRef();

    const changeOneDay = (currentDate, side) => {
        let date = new Date(currentDate);
        date.setDate(date.getDate() + side);
        changeDate(date.toISOString().split('T')[0]);
    };

    return (
        <div style={{ padding: 20, backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                <span className="input-label" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Holdings
                </span>
                <button
                    className="nav-button"
                    onClick={() => changeOneDay(dateRef.current.value, -1)}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                    <BsArrowLeft size={20} />
                </button>
                <input
                    type="date"
                    value={date}
                    ref={dateRef}
                    onChange={(e) => changeDate(e.target.value)}
                    style={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <button
                    className="nav-button"
                    onClick={() => changeOneDay(dateRef.current.value, 1)}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                    <BsArrowRight size={20} />
                </button>
                <CSVLink data={data} className="download-link" style={{ marginLeft: "auto", textDecoration: "none", color: "#007bff", fontWeight: "bold" }}>
                    Download CSV
                </CSVLink>
            </div>
            <HoldingsTable data={data} />
        </div>
    );
};

export default PortfolioHoldings;


