import {useContext, useState} from "react";
import { FaGlobe, FaLock, FaCog, FaComments, FaUserFriends, FaUser, FaPlusCircle } from "react-icons/fa";
import "./PortfolioCard.css";
import PortfolioPageContext from "../context/portfolio-page-context";

const PortfolioCard = () => {
  const { setShowBusinessView, showBusinessView } = useContext(PortfolioPageContext);

  const [isPublic, setIsPublic] = useState(true);

  return (
      <div className="portfolio-card">
        {/* Header */}
        <div className="portfolio-card__header">
          <h1 className="portfolio-card__title">Growth Currency Momentum Fund</h1>

          <div style={{display: "flex"}}>
            <div className="portfolio-card__meta">

            <span><strong>Status:</strong> Not Funded</span>
            <span><strong>Type:</strong> Momentum</span>
            <span><strong>Currency:</strong> USD</span>
            <span className="portfolio-card__visibility" title={isPublic ? "Public" : "Private"}>
        {isPublic ? <><FaGlobe size={14}/> Public</> : <><FaLock size={14}/> Private</>}
      </span>
          </div>

            <div>
                {/*New Description Block*/}
          <p className="portfolio-card__description">
            This strategy focuses on identifying assets with upward momentum trends and reallocating funds dynamically
            to maximize short- to medium-term gains while maintaining USD exposure.
          </p>
            </div>

          </div>


        </div>

        {/* Footer */}
        <div className="portfolio-card__footer">
          <div className="portfolio-card__icons">
            <FaComments className="portfolio-card__icon--comments" title="Comments"/>
            <FaUserFriends className="portfolio-card__icon--followers" title="Followers"/>
            <FaUser className="portfolio-card__icon--access" title="Access"/>
          </div>

          <div style={{display: "flex", gap: 10}}>
            <button className="portfolio-card__open-button" style={{width: 150}}>
              <FaPlusCircle/> Add Transaction
            </button>
            <button className="portfolio-card__open-button" onClick={() => setShowBusinessView(!showBusinessView)}>Open
            </button>
          </div>

        </div>
      </div>
  );
};

export default PortfolioCard;