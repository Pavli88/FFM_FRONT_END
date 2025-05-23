import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare} from "react-icons/bs";
import {useExpanded, useGroupBy, useTable} from "react-table";
import {useMemo, useState} from "react";
import './ExceptionsTable.css';

const ExceptionsTable = ({ data }) => {
  const [groupByFields, setGroupByFields] = useState([]);

  const columns = useMemo(() => [
    { Header: 'Date', accessor: 'process_date' },
    { Header: 'Portfolio Code', accessor: 'portfolio_code' },
    { Header: 'Type', accessor: 'exception_type' },
    { Header: 'Severity', accessor: 'severity' },
    { Header: 'Message', accessor: 'message', disableGroupBy: true },
  ], []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { groupBy: groupByFields },
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
    setGroupBy,
  } = tableInstance;

  const handleAddGroupBy = (e) => {
    const value = e.target.value;
    if (value && !groupByFields.includes(value)) {
      const updated = [...groupByFields, value];
      setGroupByFields(updated);
      setGroupBy(updated);
    }
  };

  const removeGroupBy = (field) => {
    const updated = groupByFields.filter(f => f !== field);
    setGroupByFields(updated);
    setGroupBy(updated);
  };

  return (
    <div className="card">
      <div className="card-header">
        <label>Exceptions</label>
        <div className="group-by-wrapper">
          <div className="group-by-controls">
            <label htmlFor="group-by-select">Group by:</label>
            <select id="group-by-select" onChange={handleAddGroupBy} value="">
              <option value="">Add column...</option>
              {columns
                .filter(col => !col.disableGroupBy && !groupByFields.includes(col.accessor))
                .map(col => (
                  <option key={col.accessor} value={col.accessor}>
                    {col.Header}
                  </option>
                ))}
            </select>
          </div>
          {groupByFields.length > 0 && (
            <div className="group-by-tags">
              {groupByFields.map((field, idx) => {
                const col = columns.find(col => col.accessor === field);
                return (
                  <span key={field} className="group-by-tag">
                    {col?.Header}
                    <button onClick={() => removeGroupBy(field)} className="group-by-remove">
                      ✕
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div style={{ height: '100%', overflowY: 'scroll' }}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.slice(0, 200).map(row => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  style={{
                    cursor: 'default',
                    color:
                      row.original?.severity === 'Completed'
                        ? 'green'
                        : row.original?.severity === 'Alert'
                        ? 'orange'
                        : 'red',
                  }}
                >
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        fontWeight: cell.isGrouped || cell.isAggregated ? 'bold' : 'normal',
                      }}
                    >
                      {cell.render('Cell')}
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
export default ExceptionsTable;