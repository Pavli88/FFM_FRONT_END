import PortfolioSearch from "../PortfolioSearch/PortfolioSearch";
import PortfolioGroup from "../PortfolioGroup/PortfolioGroup";
import PortfolioCard from "../PortfolioCard/PortfolioCard";
import "./PortfolioBusinessView.css"

const PortfolioBusinessView = () => {
    return (
        <div className="portfolio-page__content">
            {/* Left side: Portfolio Cards */}
            <div className="portfolio-page__top-bar">
                <h2 className="portfolio-page__title">Business View</h2>

                <div style={{display: "flex", gap: 10}}>
                    <select className="portfolio-page__dropdown">
                        <option>Business</option>
                        <option>Portfolio Group</option>
                        <option>Portfolio</option>
                        <option>Benchmark</option>
                    </select>

                    <div style={{width: 500}}>
                        <PortfolioSearch/>
                    </div>

                    <button className="portfolio-page__new-button">
                        + New Portfolio
                    </button>
                </div>

            </div>

            <div className="portfolio-page__cards-section">

                <div className="portfolio-page__card-grid">
                    <PortfolioCard/>
                    <PortfolioCard/>
                    <PortfolioCard/>
                    <PortfolioCard/>
                    <PortfolioCard/>
                    <PortfolioCard/>
                </div>

                <div className="portfolio-page__group-section card">
                    <PortfolioGroup/>
                </div>

            </div>

        </div>
    );
};
export default PortfolioBusinessView;