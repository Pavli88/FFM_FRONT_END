import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { searchUsers, searchPortfolios } from '../../../utils/SearchHandlers';
import './SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm, searchType, setSearchType }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const skipNextSearch = useRef(false);
  const inputRef = useRef();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (skipNextSearch.current) {
        skipNextSearch.current = false;
        return;
      }

      if (searchTerm.length >= 3) {
        try {
          let results = [];

          if (searchType === 'user') {
            results = await searchUsers(searchTerm);
          } else if (searchType === 'portfolio') {
            results = await searchPortfolios(searchTerm);
          }

          setSuggestions(results);
          setNoResults(results.length === 0);
          setShowSuggestions(true);
        } catch (error) {
          console.error(`Error fetching ${searchType} suggestions:`, error);
          setSuggestions([]);
          setNoResults(true);
        }
      } else {
        setSuggestions([]);
        setNoResults(false);
        setShowSuggestions(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, searchType]);

  const handleSelectSuggestion = (item) => {
    skipNextSearch.current = true;
    if (searchType === 'user') {
      setSearchTerm(item.username);
    } else if (searchType === 'portfolio') {
      setSearchTerm(item.portfolio_name);
    }
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setNoResults(false);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar-box">
        <FaSearch size={26} className="searchbar-icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder={`Search ${searchType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchbar-input"
        />

        {searchTerm && (
          <IoMdClose
            size={24}
            className="searchbar-clear-icon"
            onClick={handleClearSearch}
            title="Clear"
          />
        )}

        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="searchbar-select"
        >
          <option value="user">User</option>
          <option value="portfolio">Portfolio</option>
        </select>
      </div>

      {showSuggestions && (
        <ul className="searchbar-suggestions">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelectSuggestion(item)}
              className="searchbar-suggestion-item"
            >
              {searchType === 'user'
                ? item.username
                : `${item.portfolio_name} (${item.portfolio_code})`}
            </li>
          ))}
          {noResults && (
            <li className="searchbar-suggestion-item no-results">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
