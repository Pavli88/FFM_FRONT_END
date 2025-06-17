import { useState, useContext, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import PortfolioContext from "../../../context/portfolio-context";
import "./PortfolioSearch.css";

const PortfolioSearch = () => {
  const { portfolios, selectPortfolio, selectedPortfolio } = useContext(PortfolioContext);
  const [search, setSearch] = useState("");
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const inputRef = useRef();

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

  const handleSelect = (portfolio) => {
    setSearch(portfolio.portfolio_name);
    selectPortfolio(portfolio);
    setFilteredPortfolios([]);
  };

  const handleClear = () => {
    setSearch("");
    setFilteredPortfolios([]);
    selectPortfolio({});
    inputRef.current?.focus();
  };

  return (
    <div className="portfolio-search-container">


          <input
            ref={inputRef}
            type="text"
            placeholder="Search Portfolio..."
            value={search}
            onChange={handleSearch}
            // className="portfolio-search-input"
          />
          {search && (
            <IoMdClose
              size={18}
              className="portfolio-clear-icon"
              onClick={handleClear}
              title="Clear"
            />
          )}



      {filteredPortfolios.length > 0 && (
        <ul className="portfolio-suggestion-list">
          {filteredPortfolios.map((portfolio) => (
            <li
              key={portfolio.id}
              onClick={() => handleSelect(portfolio)}
              className="portfolio-suggestion-item"
            >
              {portfolio.portfolio_name} ({portfolio.portfolio_code})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PortfolioSearch;
