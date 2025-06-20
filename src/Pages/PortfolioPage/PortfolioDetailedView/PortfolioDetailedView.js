import "./PortfolioDetailedView.css"
import {
  FaRegCommentDots,
  FaRegClipboard,
  FaShareAlt,
  FaRegHeart
} from "react-icons/fa";
import "./PortfolioDetailedView.css";
import fetchAPI from "../../../config files/api";
import {useContext, useEffect, useState} from "react";
import PortfolioContext from "../../../context/portfolio-context";
import DateContext from "../../../context/date-context";
import PortfolioOverview from "../SubPages/PortfolioOverview/PortfolioOverview";

const DetailedPortfolioView = () => {
  const { selectedPortfolio } = useContext(PortfolioContext);
  const { currentDate } = useContext(DateContext);
  const [currentHolding, setCurrentHolding] = useState({});
  const fetchHoldingData = async () => {
        const response = await fetchAPI.post('portfolios/get/holding/', {
            date: currentDate,
            portfolio_code: [selectedPortfolio.portfolio_code]
        })
        setCurrentHolding(response.data)
    };

   useEffect(() => {
        if (selectedPortfolio.portfolio_code !== undefined) {
            fetchHoldingData()
        }
    }, [selectedPortfolio.portfolio_code])

  return (
      <PortfolioOverview/>
    // <div className="portfolio-detail">
    //
    // </div>
  );
};


export default DetailedPortfolioView;
