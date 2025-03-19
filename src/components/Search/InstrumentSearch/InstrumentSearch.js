import {useCallback, useContext, useState} from "react";
import ServerContext from "../../../context/server-context";
import axios from "axios";
import _ from "lodash"
import fetchAPI from "../../../config files/api";

const InstrumentSearch = ({ onSelect }) => {
    const server = useContext(ServerContext).server;
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch instruments (debounced)
    const fetchInstruments = useCallback(
        _.debounce(async (query) => {
            if (!query) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {

                const response = await fetchAPI.get('instruments/get/instruments/', {
                    params: { name: query }
                });

                setResults(response.data || []); // Set results or empty array if no data
            } catch (error) {
                console.error("Error fetching instruments:", error);
                setResults([]);
            }
            setLoading(false);
        }, 300),
        [server]
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        fetchInstruments(value); // Debounced API call
    };

    const handleSelect = (instrument) => {
        setSearchTerm(instrument.name); // Set input value to selected item
        setResults([]); // Hide results
        onSelect(instrument); // Pass selected instrument to parent
    };

    return (
        <div className="relative w-80">
            {/* 🔹 Search Input */}
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for an instrument..."
                // className="w-full p-2 border rounded"
            />

            {/* 🔹 Loading Indicator */}
            {loading && <p className="text-gray-500 text-sm">Loading...</p>}

            {/* 🔹 Results Table Dropdown */}
            {results.length > 0 && (
                <div style={{ height: "400px", overflowY: "auto", border: "1px solid #ccc", margin: 5, width: '100%' }}>
                    <table style={{border: "none"}}>
                        <thead style={{height: '20px'}}>
                            <tr >
                                <th >Name</th>
                                <th >Type</th>
                                <th >Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((instrument) => (
                                <tr
                                    key={instrument.id}
                                    // className="cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSelect(instrument)}
                                    style={{border: "none", cursor: "pointer"}}
                                >
                                    <td style={{border: "none"}}>{instrument.name}</td>
                                    <td style={{border: "none"}}>{instrument.type}</td>
                                    <td style={{border: "none"}}>{instrument.group}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
export default InstrumentSearch;