import './HoldingTimeSeriesModal.css'
import CustomModal from "../../../Modals/Modals";
import React, {useContext, useState} from 'react';
import DateContext from "../../../../context/date-context";
import fetchAPI from "../../../../config files/api";

const HoldingTimeSeriesModal = ({show, close, data, portfolioList, setChartData, setSelectedMetric}) => {
    const [selectedInstruments, setSelectedInstruments] = useState([]);
    const [selectedMetrics, setSelectedMetrics] = useState([]);
    const [activeTab, setActiveTab] = useState("Quantity");
    const [startDate, setStartDate] = useState("2025-01-01");
    const {currentDate} = useContext(DateContext);
    const [endDate, setEndDate] = useState(currentDate);
    const [instrumentDropdownOpen, setInstrumentDropdownOpen] = useState(false);

    const groupedMetrics = {
        Quantity: [
            {label: "Quantity", value: "quantity"},
            {label: "Begin Quantity", value: "beg_quantity"},
            {label: "Quantity Change", value: "qty_chg"},
        ],
        NAV: [
            {label: "Market Value", value: "mv"},
            {label: "Book Value", value: "bv"},
            {label: "Net Weight", value: "net_weight"},
        ],
        Profit: [
            {label: "Total P&L", value: "total_pnl"},
            {label: "Unrealized P&L", value: "ugl"},
            {label: "Trade P&L", value: "trd_pnl"},
        ],
    };

    const fetchHistory = async (value) => {
        const response = await fetchAPI.post('portfolios/get/holding_history/', {
            portfolio_list: portfolioList,
            instrument_ids: selectedInstruments,
            columns: selectedMetrics,
            start_date: startDate,
            end_date: endDate
        })
        console.log(response.data)
        setChartData(response.data.data);
        setSelectedMetric(selectedMetrics);
        close();
    };

    return (
        <CustomModal
            show={show}
            onClose={close}
            title={"Historical Time Series"}
            width={"800px"}
        >
            <div className="holding-modal">
                {/* Instrument selector */}
                <div style={{position: "relative"}}>
                    <label style={{fontWeight: "bold"}}>Instrument(s)</label>
                    <div
                        className="instrument-dropdown"
                        onClick={() => setInstrumentDropdownOpen((prev) => !prev)}
                    >
                        {selectedInstruments.length === 0 && (
                            <span style={{color: "#999"}}>Select instruments...</span>
                        )}
                        {selectedInstruments.map((instrumentId, i) => {
                            const instrument = data.find(d => d.instrument_id === instrumentId);
                            return (
                                <span key={i} className="instrument-pill">
          {instrument?.name || instrumentId}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedInstruments((prev) =>
                                                prev.filter((x) => x !== instrumentId)
                                            );
                                        }}
                                    >
            ×
          </button>
        </span>
                            );
                        })}
                        <span style={{marginLeft: "auto", color: "#888"}}>▾</span>
                    </div>

                    {instrumentDropdownOpen && (
                        <div className="instrument-dropdown-list">
                            {Array.from(
                                new Map(data.map(item => [item.instrument_id, item.name])).entries()
                            ).map(([id, name]) => {
                                const isChecked = selectedInstruments.includes(id);
                                return (
                                    <label key={id}>
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => {
                                                setSelectedInstruments((prev) =>
                                                    isChecked ? prev.filter((i) => i !== id) : [...prev, id]
                                                );
                                            }}
                                        />{" "}
                                        {name}
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Metric tabs */}
                <div>
                    <label style={{fontWeight: "bold"}}>Metrics</label>
                    <div className="metric-tabs">
                        {Object.keys(groupedMetrics).map((tab) => (
                            <div
                                key={tab}
                                className={`metric-tab ${
                                    tab === activeTab ? "active" : ""
                                }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>

                    <div className="metric-options">
                        {groupedMetrics[activeTab].map((metric) => {
                            const isChecked = selectedMetrics.includes(
                                metric.value
                            );
                            return (
                                <div
                                    key={metric.value}
                                    className={`metric-button ${
                                        isChecked ? "checked" : ""
                                    }`}
                                    onClick={() => {
                                        setSelectedMetrics((prev) =>
                                            isChecked
                                                ? prev.filter((m) => m !== metric.value)
                                                : [...prev, metric.value]
                                        );
                                    }}
                                >
                                    <div
                                        style={{
                                            border: '1px solid #ccc',
                                            padding: '5px 10px',
                                            borderRadius: '6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            backgroundColor: isChecked ? '#ebf4ff' : '#fff',
                                            color: isChecked ? '#1d4ed8' : 'inherit',
                                            fontWeight: isChecked ? 500 : 400
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            readOnly
                                            style={{
                                                width: '14px',
                                                height: '14px',
                                                pointerEvents: 'none',
                                                accentColor: '#3b82f6',
                                                margin: 0
                                            }}
                                        />
                                        {metric.label}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Date range */}
                <div>
                    <label style={{fontWeight: "bold"}}>Date Range</label>
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                        }}
                    >
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                {/* Button */}
                <div>
                    <button
                        onClick={fetchHistory}
                        disabled={
                            selectedInstruments.length === 0 ||
                            selectedMetrics.length === 0
                        }
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        Show History
                    </button>
                </div>
            </div>

        </CustomModal>
    );
};
export default HoldingTimeSeriesModal;