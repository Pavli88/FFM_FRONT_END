import { useState, useContext } from "react";
import PortfolioContext from "../../../context/portfolio-context";
import "./PortfolioSearch.css";

const PortfolioSearch = () => {
  const { portfolios, selectPortfolio, selectedPortfolio } = useContext(PortfolioContext);
  const [search, setSearch] = useState("");
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);

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

  return (
   <div className="portfolio-search-container">
  <div className="portfolio-search-row">
    <input
      type="text"
      placeholder="Search Portfolio..."
      value={search}
      onChange={handleSearch}
      className="portfolio-search-input"
    />

    {selectedPortfolio?.portfolio_name && (
        <div className="selected-portfolio-inline">
          📌 <strong>{selectedPortfolio.portfolio_name}</strong>
        </div>
    )}
  </div>

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
