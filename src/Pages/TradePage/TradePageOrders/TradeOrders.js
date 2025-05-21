import fetchAPI from "../../../config files/api";
import {useState, useEffect, useContext} from "react";
import TradeContext from "../context/trade-context";
import './TradeOrders.css'

const TadeOrders = ({ portfolioCode }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const {selectedSignal} = useContext(TradeContext);

  const fetchOrders = async () => {
    try {
      const response = await fetchAPI.get('trade_page/orders/', {
        params: {
          signal_id: selectedSignal
        }
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Hiba az order-ek lekérdezésekor:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedSignal]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card">
      <div className="card-header">
        <label>Orders</label>
      </div>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table className="w-full table-auto border-collapse">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th>Portfolio</th>
              <th>Symbol</th>
              <th>Instrument</th>
              <th>Side</th>
              <th>Quantity</th>
              <th>Executed Price</th>
              <th>FX Rate</th>
              <th>Status</th>
              <th>Broker ID</th>
              <th>Created</th>
              <th>Executed</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-sm">
                <td>{order.portfolio_code}</td>
                <td className={`order ${order.status.toLowerCase()}`}>{order.status}</td>
                <td>{order.symbol}</td>
                <td>{order.instrument_name}</td>
                <td className={`order ${order.side.toLowerCase()}`}>{order.side}</td>
                <td>{order.quantity}</td>
                <td>{order.executed_price || '-'}</td>
                <td>{order.fx_rate || '-'}</td>
                <td>{order.broker_order_id || '-'}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
                <td>{order.executed_at ? new Date(order.executed_at).toLocaleString() : '-'}</td>
                <td>{order.error_message || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TadeOrders;