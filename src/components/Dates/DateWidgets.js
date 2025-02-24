import React, { useState, useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export const DateSelect = ({ onDateChange }) => {
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const dateRef = useRef(null);

    const changeOneDay = (currentDate, delta) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + delta);
        const formattedDate = newDate.toISOString().split("T")[0];
        setDate(formattedDate);
        onDateChange(formattedDate); // Send updated date to parent
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
        onDateChange(e.target.value); // Send updated date to parent
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: 10 }}>
            <button
                onClick={() => changeOneDay(date, -1)}
            >
                <BsArrowLeft size={20} />
            </button>
            <input
                type="date"
                value={date}
                ref={dateRef}
                onChange={handleDateChange}
            />
            <button
                onClick={() => changeOneDay(date, 1)}
            >
                <BsArrowRight size={20} />
            </button>
        </div>
    );
};
