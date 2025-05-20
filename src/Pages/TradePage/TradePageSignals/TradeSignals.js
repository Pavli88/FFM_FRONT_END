import fetchAPI from "../../../config files/api";
import {useState, useEffect, useContext} from "react";
import TradeContext from "../context/trade-context";
import './TradeSignals.css'

const TadeSignals = ({ portfolioCode }) => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { saveSelectedSignal, selectedSignal } = useContext(TradeContext);

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const response = await fetchAPI.get('trade_page/signals/');
        setSignals(response.data.signals);
      } catch (error) {
        console.error('Hiba a szignálok lekérdezésekor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSignals();
  }, [portfolioCode]);

  const renderTransactionText = (rawData) => {
    if (!rawData || !rawData.transaction_type) return '-';
    const { transaction_type, quantity } = rawData;

    if (transaction_type === 'Purchase') return `BUY @ ${quantity}`;
    if (transaction_type === 'Sale') return `SELL @ ${quantity}`;
    return transaction_type;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card">
      <div className="card-header">
        <span>Signals</span>
      </div>
      <div className="table-container">
        <table className="signals-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Portfolio</th>
              <th>Type</th>
              <th>Transaction</th>
              <th>Instrument</th>
              <th>Status</th>
              <th>Time</th>
              <th>Executed</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            {signals.map((signal) => (
              <tr
                key={signal.id}
                className={`signal-row ${selectedSignal === signal.id ? 'selected' : ''}`}
                onClick={() => saveSelectedSignal(signal.id)}
              >
                <td>{signal.source}</td>
                <td>{signal.portfolio_code || '-'}</td>
                <td>{signal.type}</td>
                <td>{renderTransactionText(signal.raw_data)}</td>
                <td>{signal.instrument_name}</td>
                <td className={`status ${signal.status.toLowerCase()}`}>{signal.status}</td>
                <td>
                  {signal.executed_at
                    ? new Date(signal.executed_at).toLocaleString()
                    : new Date(signal.created_at).toLocaleString()}
                </td>
                <td>{signal.executed_at ? new Date(signal.executed_at).toLocaleString() : '-'}</td>
                <td>{signal.error_message || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TadeSignals;

