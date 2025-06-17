import {useContext, useEffect, useState} from "react";
import "./PortfolioOverview.css";
import { FaEdit, FaSave } from "react-icons/fa";
import PortfolioContext from "../../../../context/portfolio-context";

const PortfolioOverview = () => {
  const {selectedPortfolio} = useContext(PortfolioContext);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(
    "This portfolio focuses on identifying and investing in cryptocurrencies with significant growth potential. The management logic is based on analyzing market momentum indicators and adjusting positions to maximize returns."
  );

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="overview-section">
      <div className="info-grid">
        <div className="summary-box">
          <h3>Summary</h3>
          <p><strong>Inception Date:</strong> {selectedPortfolio.inception_date}</p>
          <p><strong>Manager:</strong> {selectedPortfolio.manager}</p>
          <p><strong>Owner:</strong> {selectedPortfolio.owner}</p>
        </div>
        <div className="info-box">
          <h3>Information</h3>
          <p><strong>Code:</strong> {selectedPortfolio.portfolio_code}3</p>
          <p><strong>Status:</strong> {selectedPortfolio.status}</p>
          <p><strong>Trading Allowed:</strong> No</p>
          <p><strong>Valuation Frequency:</strong> Daily</p>
        </div>

      </div>

      <div className="description-section">
        <div className="card-header">
          <h3 className="description-title">Description</h3>
          <button className="icon-button" onClick={handleEditToggle}>
            {isEditing ? <FaSave size={20}/> : <FaEdit size={20}/>}
          </button>
        </div>
        {isEditing ? (
          <textarea
            className="description-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p>{description}</p>
        )}
      </div>

    </div>
  );
};
export default PortfolioOverview;