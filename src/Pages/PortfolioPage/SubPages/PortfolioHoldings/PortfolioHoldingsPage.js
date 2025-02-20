import {useContext, useRef, useState, useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { CSVLink } from "react-csv";
import HoldingsTable from "../../../../components/Tables/HoldingTable";
import ServerContext from "../../../../context/server-context";
import PortfolioPageContext from "../../context/portfolio-page-context";
import DateContext from "../../../../context/date-context";
import axios from "axios";

const PortfolioHoldingsPage = () => {
    const server = useContext(ServerContext).server;
    const portfoliCode = useContext(PortfolioPageContext).portfolioCode;
    const currentDate = useContext(DateContext).currentDate;
    const dateRef = useRef();
    const [holdingData, setHoldingdata] = useState([{}])
    const [holdingDate, setHoldingDate] = useState(currentDate);


    const changeOneDay = (currentDate, side) => {
        let date = new Date(currentDate);
        date.setDate(date.getDate() + side);
        setHoldingDate(date.toISOString().split('T')[0]);
    };

    const fetchHoldingData = async() => {
        const response = await axios.post(server + 'portfolios/get/holding/', {
                date: holdingDate,
                portfolio_code: [portfoliCode]
            })
        setHoldingdata(response.data)
    };

    useEffect(() => {
        if (portfoliCode !== undefined) {
            fetchHoldingData()
        }
    }, [holdingDate])

    return (
        <div style={{  backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
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
                    value={holdingDate}
                    ref={dateRef}
                    onChange={(e) => setHoldingDate(e.target.value)}
                    style={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <button
                    className="nav-button"
                    onClick={() => changeOneDay(dateRef.current.value, 1)}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                    <BsArrowRight size={20} />
                </button>
                <CSVLink data={holdingData} className="download-link" style={{ marginLeft: "auto", textDecoration: "none", color: "#007bff", fontWeight: "bold" }}>
                    Download CSV
                </CSVLink>
            </div>
            <HoldingsTable data={holdingData} />
        </div>
    );
};


export default PortfolioHoldingsPage;