import { useState, useContext } from "react";
import PortfolioContext from "../../../context/portfolio-context";

const PortfolioSearch = () => {
  const { portfolios, selectPortfolio } = useContext(PortfolioContext); // Get portfolios from context
  const [search, setSearch] = useState("");
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  // const [selectedPortfolioCode, setSelectedPortfolioCode] = useState("");
  // console.log(selectedPortfolioCode)
  // Handle input change and filter portfolios
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    if (query.trim() === "") {
      setFilteredPortfolios([]);
      selectPortfolio({});
      return;
    }

    const matches = portfolios.filter(
      (portfolio) =>
        portfolio.portfolio_name.toLowerCase().includes(query) ||
        portfolio.portfolio_code.toLowerCase().includes(query)
    );

    setFilteredPortfolios(matches);
  };

  // Handle selecting a portfolio from the list
  const handleSelect = (portfolio) => {
    setSearch(portfolio.portfolio_name); // Set input field to selected name
    selectPortfolio(portfolio); // Store portfolio_code
    setFilteredPortfolios([]); // Hide suggestions
  };

  return (
    <div style={{padding: 10, paddingLeft: 0}}>
      <input
        type="text"
        placeholder="Search Portfolio..."
        value={search}
        onChange={handleSearch}
        style={{ width: "100%" }}
      />

      {/* Show filtered results */}
      {filteredPortfolios.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, border: "1px solid #ccc", maxWidth: "250px" }}>
          {filteredPortfolios.map((portfolio) => (
            <li
              key={portfolio.id}
              onClick={() => handleSelect(portfolio)}
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
                borderBottom: "1px solid #ddd"
              }}
            >
              {portfolio.portfolio_name} ({portfolio.portfolio_code})
            </li>
          ))}
        </ul>
      )}

      {/* Display selected portfolio code */}
      {/*{selectedPortfolioCode && <p>Selected Portfolio Code: <strong>{selectedPortfolioCode}</strong></p>}*/}
    </div>
  );
};

export default PortfolioSearch;