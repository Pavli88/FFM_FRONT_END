import fetchAPI from "../../../config files/api";
import {useState, useEffect, useContext, useMemo} from "react";
import TradeContext from "../context/trade-context";
import './TradeSignals.css'
import { useTable, useGroupBy, useExpanded } from "react-table";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import DateContext from "../../../context/date-context";

const TadeSignals = ({ portfolioCode }) => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { saveSelectedSignal, selectedSignal } = useContext(TradeContext);
  const {currentDate} = useContext(DateContext);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const fetchSignals = async () => {
      try {
        const response = await fetchAPI.get("trade_page/signals/", {
            params: {
                date: selectedDate,
            }
        });
        setSignals(response.data.signals);
      } catch (error) {
        console.error("Hiba a szignálok lekérdezésekor:", error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchSignals();
  }, [portfolioCode, selectedDate]);

  const columns = useMemo(
    () => [
      { Header: "Portfolio", accessor: "portfolio_code" },
      { Header: "Source", accessor: "source" },
      { Header: "Type", accessor: "type" },
      {
        Header: "Transaction",
        accessor: (row) => {
          const data = row.raw_data;
          if (!data?.transaction_type) return "-";
          if (data.transaction_type === "Purchase") return `BUY @ ${data.quantity}`;
          if (data.transaction_type === "Sale") return `SELL @ ${data.quantity}`;
          return data.transaction_type;
        },
      },
      { Header: "Instrument", accessor: "instrument_name" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => <span className={`status ${value?.toLowerCase()}`}>{value}</span>,
      },
      {
        Header: "Time",
        accessor: (row) =>
          row.executed_at
            ? new Date(row.executed_at).toLocaleString()
            : new Date(row.created_at).toLocaleString(),
      },
      {
        Header: "Executed",
        accessor: (row) =>
          row.executed_at ? new Date(row.executed_at).toLocaleString() : "-",
      },
      { Header: "Error", accessor: (row) => row.error_message || "-" },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: signals,
      initialState: { groupBy: ["portfolio_code"] },
    },
    useGroupBy,
    useExpanded
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card">
        <div className="card-header">
            <label>Signals</label>
            <input
                type="date"
                style={{width: 200, marginLeft: 10}}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}/>
        </div>
      <div className="table-container" style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table {...getTableProps()} className="signals-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={`signal-row ${selectedSignal === row.original?.id ? "selected" : ""}`}
                  onClick={() => row.original && saveSelectedSignal(row.original.id)}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.isGrouped ? (
                        <span {...row.getToggleRowExpandedProps()}>
                          {row.isExpanded ? <BsCaretUpFill /> : <BsCaretDownFill />} {cell.render("Cell")} ({row.subRows.length})
                        </span>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TadeSignals;

