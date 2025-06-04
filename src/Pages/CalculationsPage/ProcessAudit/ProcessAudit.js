import fetchAPI from "../../../config files/api";
import {useState, useEffect, useContext, useMemo} from "react";
import './ProcessAudit.css'
import CalculationContext from "../CalculationPageContext/calculation-context";
import WsContext from "../../../context/ws-context";

const ProcessAudit = ({ portfolioCodes }) => {
  const { processRunning } = useContext(WsContext);
  const { selectedAuditIds, saveSelectedAuditIds } = useContext(CalculationContext);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  // Default dates
  const today = new Date();
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [startDate, setStartDate] = useState(today.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);

  const fetchAuditRecords = async () => {
    try {
      const response = await fetchAPI.post('/calculate/audit_records/', {
        portfolios: portfolioCodes,
        start_date: startDate,
        end_date: endDate,
      });
      setData(response.data.data);
    } catch (err) {
      console.error('Failed to fetch audit records:', err);
    }
  };

  useEffect(() => {
    fetchAuditRecords();
  }, [portfolioCodes, startDate, endDate]);

  useEffect(() => {
    if (!processRunning && portfolioCodes.length) {
      fetchAuditRecords();
    }
  }, [processRunning]);

  const handleExportCSV = () => {
    const header = ['Portfolio', 'Process', 'Date', 'Status', 'Run At', 'Message'];
    const rows = data.map(row => [
      `${row.portfolio_name} (${row.portfolio_code})`,
      row.process,
      row.valuation_date,
      row.status,
      row.run_at,
      row.message
    ]);

    const csvContent = [header, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'audit_records.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = data.filter(row =>
    row.portfolio_code.toLowerCase().includes(filter.toLowerCase()) ||
    row.portfolio_name.toLowerCase().includes(filter.toLowerCase()) ||
    row.status.toLowerCase().includes(filter.toLowerCase()) ||
    row.process.toLowerCase().includes(filter.toLowerCase())
  );

  const handleRowClick = (id) => {
    saveSelectedAuditIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
 <div className="card" style={{ paddingBottom: 5 }}>
  <div className="card-header" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
    <label>Process Audit</label>
    <div style={{ display: 'flex', gap: '10px' }}>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="audit-search"
      />
      <button onClick={handleExportCSV} className="audit-export">
        Export CSV
      </button>
    </div>
  </div>

  {/* Scrollable table container with fixed height */}
  <div style={{ height: '500px', overflowY: 'auto' }}>
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ padding: '8px' }}>Portfolio</th>
          <th style={{ padding: '8px' }}>Process</th>
          <th style={{ padding: '8px' }}>Date</th>
          <th style={{ padding: '8px' }}>Run At</th>
          <th style={{ padding: '8px' }}>Status</th>
          <th style={{ padding: '8px' }}>Message</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((row, i) => (
          <tr
            key={row.id}
            className={`${i % 2 === 0 ? 'even' : 'odd'} ${selectedAuditIds.includes(row.id) ? 'selected' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleRowClick(row.id)}
          >
            <td style={{ padding: '8px' }}>{row.portfolio_name} ({row.portfolio_code})</td>
            <td style={{ padding: '8px' }}>{row.process}</td>
            <td style={{ padding: '8px' }}>{row.valuation_date}</td>
            <td style={{ padding: '8px' }}>{row.run_at}</td>
            <td style={{ padding: '8px' }} className={`status-${row.status.toLowerCase()}`}>{row.status}</td>
            <td style={{ padding: '8px' }} className={`status-${row.status.toLowerCase()}`}>{row.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default ProcessAudit;
