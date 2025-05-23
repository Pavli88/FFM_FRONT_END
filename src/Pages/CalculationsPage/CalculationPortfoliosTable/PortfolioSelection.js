import CalculationContext from "../CalculationPageContext/calculation-context";
import {useContext} from "react";
import './PortfolioSelection.css'

const PortfolioSelection = (props) => {
  const { saveSelectedPortfolios, selectedPortfolios } = useContext(CalculationContext);

  const handleCheckboxChange = (checked, code) => {
    if (checked) {
      if (!selectedPortfolios.includes(code)) {
        saveSelectedPortfolios([...selectedPortfolios, code]);
      }
    } else {
      saveSelectedPortfolios(selectedPortfolios.filter(item => item !== code));
    }
  };

  const handleSegmentToggle = (checked, codes) => {
    if (checked) {
      const updated = [...new Set([...selectedPortfolios, ...codes])];
      saveSelectedPortfolios(updated);
    } else {
      const updated = selectedPortfolios.filter(code => !codes.includes(code));
      saveSelectedPortfolios(updated);
    }
  };

  const renderPortfolioGroup = (title, items) => {
    const groupCodes = items.map(p => p.portfolio_code);
    const allSelected = groupCodes.every(code => selectedPortfolios.includes(code));

    return (
      <div key={title} className="segment-container">
        <div className="segment-header">
          <label className="segment-title">{title}</label>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) => handleSegmentToggle(e.target.checked, groupCodes)}
            style={{width: 20}}
          />
        </div>
        <table className="portfolio-table">
          <tbody>
            {items.map((data) => (
              <tr key={data.id} className="table-row-all">
                <td className="table-row"><div>{data.portfolio_name}</div></td>
                <td className="table-row"><div>{data.portfolio_code}</div></td>
                <td className="table-row"><div>{data.portfolio_type}</div></td>
                <td className="table-row"><div>{data.currency}</div></td>
                <td className="table-row right-align">
                  <input
                    type="checkbox"
                    checked={selectedPortfolios.includes(data.portfolio_code)}
                    onChange={(e) => handleCheckboxChange(e.target.checked, data.portfolio_code)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const portfolios = props.data || [];
  const portfolioGroup = portfolios.filter(p => p.portfolio_type === 'Portfolio');
  const businessGroup = portfolios.filter(p => p.portfolio_type === 'Business');
  const portfolioGroupGroup = portfolios.filter(p => p.portfolio_type === 'Portfolio Group');

  return (
    <div className="full-scrollable-panel">
      {renderPortfolioGroup('Portfolio', portfolioGroup)}
      {renderPortfolioGroup('Business', businessGroup)}
      {renderPortfolioGroup('Portfolio Group', portfolioGroupGroup)}
    </div>
  );
};
export default PortfolioSelection;