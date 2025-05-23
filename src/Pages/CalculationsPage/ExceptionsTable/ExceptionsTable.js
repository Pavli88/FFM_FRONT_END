import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare} from "react-icons/bs";
import {useExpanded, useGroupBy, useTable} from "react-table";
import {useMemo, useState} from "react";
import './ExceptionsTable.css';

const ExceptionsTable = ({data}) => {
  const [groupByFields, setGroupByFields] = useState([]);

  const columns = useMemo(() => [
    {
      Header: 'Date',
      accessor: 'process_date',
    },
    {
      Header: 'Portfolio Code',
      accessor: 'portfolio_code',
    },
    {
      Header: 'Type',
      accessor: 'exception_type',
    },
    {
      Header: 'Severity',
      accessor: 'severity',
    },
    {
      Header: 'Message',
      accessor: 'message',
      disableGroupBy: true,
    },
  ], []);

  const tableInstance = useTable(
      {
        columns,
        data,
        initialState: {
          groupBy: groupByFields,
        }
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

  <div
    style={{
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      flexWrap: 'nowrap',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
    }}
  >
    <div className="group-by-controls" style={{ flex: '0 0 auto' }}>
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
      <div
        className="group-by-tags"
        style={{
          display: 'flex',
          gap: '10px',
          flex: '0 0 auto',
        }}
      >
        {groupByFields.map((field) => {
          const col = columns.find(col => col.accessor === field);
          return (
            <span
              key={field}
              className="group-by-tag"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#e9ecef',
                borderRadius: '4px',
                padding: '4px 8px',
              }}
            >
              {col?.Header}
              <button
                onClick={() => removeGroupBy(field)}
                className="group-by-remove"
                style={{
                  marginLeft: '6px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                ✕
              </button>
            </span>
          );
        })}
      </div>
    )}
  </div>
</div>

        <div style={{height: '500px', overflowY: 'auto'}}>
          <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>
                        {column.canGroupBy && (
                            <span {...column.getGroupByToggleProps()} style={{paddingRight: 5}}>
                        {column.isGrouped ? <BsDashSquare/> : <BsPlusSquare/>}
                      </span>
                        )}
                        {column.render('Header')}
                      </th>
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
                        cursor: row.isGrouped ? '' : 'pointer',
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
                              fontWeight: cell.isGrouped
                                  ? 'bold'
                                  : cell.isAggregated
                                      ? 'bold'
                                      : cell.isPlaceholder
                                          ? '#ff000042'
                                          : 'white',
                            }}
                        >
                          {cell.isGrouped ? (
                              <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? <BsCaretUpFill/> : <BsCaretDownFill/>}
                          </span>{' '}
                                {cell.render('Cell')} ({row.subRows.length})
                              </>
                          ) : cell.isAggregated ? (
                              cell.render('Aggregated')
                          ) : cell.isPlaceholder ? null : (
                              cell.render('Cell')
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
export default ExceptionsTable;