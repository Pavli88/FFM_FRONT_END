import { useCallback, useContext, useState } from "react";
import ServerContext from "../../../context/server-context";
import _ from "lodash";
import { searchInstruments } from "../../../utils/SearchHandlers";
import InputField from "../../InputField/InputField";
import "./InstrumentSearch.css";

const InstrumentSearch = ({ onSelect }) => {
  const server = useContext(ServerContext).server;
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInstruments = useCallback(
    _.debounce(async (query) => {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);
      const instruments = await searchInstruments(query);
      setResults(instruments);
      setLoading(false);
    }, 300),
    [server]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchInstruments(value);
  };

  const handleSelect = (instrument) => {
    setSearchTerm(instrument.name);
    setResults([]);
    onSelect(instrument);
  };

  return (
    <div className="instrument-search-container">
      <InputField
        id="search"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for an instrument..."
      />

      {loading && <p className="loading-text">Loading...</p>}

      {results.length > 0 && (
        <div className="dropdown-results">
          <table className="results-table">
            <thead className="results-header">
              <tr>
                <th>Name</th>
                <th>Group</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {results.map((instrument) => (
                <tr
                  key={instrument.id}
                  className="result-row"
                  onClick={() => handleSelect(instrument)}
                >
                  <td>{instrument.name}</td>
                  <td>{instrument.group}</td>
                  <td>{instrument.type}</td>
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
