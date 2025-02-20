import { useMemo, useEffect } from 'react';
import { useTable, useGroupBy, useExpanded } from 'react-table';
import { BsDashSquare, BsPlusSquare, BsCaretUpFill, BsCaretDownFill } from 'react-icons/bs';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const formatFloat = (value) => (value ? parseFloat(value).toFixed(2) : "0.00");

const HoldingsTable = ({ data }) => {
    const columns = useMemo(() => [
        { Header: 'Portfolio', accessor: 'portfolio_code' },
        { Header: 'Date', accessor: 'date' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Group', accessor: 'group' },
        { Header: 'Type', accessor: 'type' },
        { Header: 'Currency', accessor: 'currency', disableGroupBy: true },
        { Header: 'Transaction ID', accessor: 'trd_id', disableGroupBy: true },
        { Header: 'Instrument ID', accessor: 'instrument_id', disableGroupBy: true },
        { Header: 'Trade Date', accessor: 'trade_date', disableGroupBy: true },
        {
            Header: 'Trade Type', accessor: 'trade_type', disableGroupBy: true,

        },
        {
            Header: 'Quantity', accessor: 'quantity', aggregate: 'sum', disableGroupBy: true,
            Aggregated: ({ value }) => formatFloat(value)
        },
        {
            Header: 'Trade Price', accessor: 'trade_price', disableGroupBy: true,
            Cell: ({ value }) => formatFloat(value)
        },
        {
            Header: 'Market Price', accessor: 'market_price', disableGroupBy: true,
            Cell: ({ value }) => formatFloat(value)
        },
        {
            Header: 'FX Rate', accessor: 'fx_rate', disableGroupBy: true,
            Cell: ({ value }) => formatFloat(value)
        },
        {
            Header: 'Book Value', accessor: 'bv', aggregate: 'sum', disableGroupBy: true,
            Aggregated: ({ value }) => (
                <span style={{ color: value < 0 ? 'red' : 'green', display: 'flex', alignItems: 'center' }}>
                    {formatFloat(value)}
                </span>
            ),
            Cell: ({ value }) => (
                <span style={{ color: value < 0 ? 'red' : 'green', display: 'flex', alignItems: 'center' }}>
                    {formatFloat(value)}
                </span>
            )
        },
        {
            Header: 'Market Value', accessor: 'mv', aggregate: 'sum', disableGroupBy: true,
            Aggregated: ({ value }) => (
                <span style={{ color: value < 0 ? 'red' : 'green', display: 'flex', alignItems: 'center' }}>
                    {formatFloat(value)}
                </span>
            ),
            Cell: ({ value }) => (
                <span style={{ color: value < 0 ? 'red' : 'green', display: 'flex', alignItems: 'center' }}>
                    {formatFloat(value)}
                </span>
            )
        },
        {
            Header: 'Unrealized P&L', accessor: 'ugl', aggregate: 'sum', disableGroupBy: true,
             Aggregated: ({ value }) => (
                <span style={{ color: value < 0 ? 'red' : 'green', display: 'flex', alignItems: 'center' }}>
                    {value < 0 ? <FaArrowDown style={{ marginRight: 5 }} /> : <FaArrowUp style={{ marginRight: 5 }} />}
                    {formatFloat(value)}
                </span>
            ),
            Cell: ({ value }) => (
                <span style={{ color: value < 0 ? 'red' : 'green', display: 'flex', alignItems: 'center' }}>
                    {value < 0 ? <FaArrowDown style={{ marginRight: 5 }} /> : <FaArrowUp style={{ marginRight: 5 }} />}
                    {formatFloat(value)}
                </span>
            )
        },
        {
            Header: 'Realized P&L', accessor: 'rgl', aggregate: 'sum', disableGroupBy: true,
            Aggregated: ({ value }) => (
                <span style={{ color: value < 0 ? 'red' : 'green', display: 'flex', alignItems: 'center' }}>
                    {value < 0 ? <FaArrowDown style={{ marginRight: 5 }} /> : <FaArrowUp style={{ marginRight: 5 }} />}
                    {formatFloat(value)}
                </span>
            ),
            Cell: ({ value }) => (
                <span style={{ color: value < 0 ? 'red' : 'green', display: 'flex', alignItems: 'center' }}>
                    {value < 0 ? <FaArrowDown style={{ marginRight: 5 }} /> : <FaArrowUp style={{ marginRight: 5 }} />}
                    {formatFloat(value)}
                </span>
            )
        },
         {
            Header: 'Weight', accessor: 'weight', aggregate: 'sum', disableGroupBy: true,
            Aggregated: ({ value }) => `${formatFloat(value)}%`,
            Cell: ({ value }) => `${formatFloat(value)}%`
        },
        {
            Header: 'Leverage', accessor: 'pos_lev', aggregate: 'sum', disableGroupBy: true,
            Aggregated: ({ value }) => `${formatFloat(value)}%`,
            Cell: ({ value }) => `${formatFloat(value)}%`
        }
    ], []);

    const tableInstance = useTable(
        { columns, data, initialState: { groupBy: ['type'] } },
        useGroupBy, useExpanded
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, setGroupBy, prepareRow } = tableInstance;
    const firstPageRows = rows.slice(0, 200);

    useEffect(() => {
        setGroupBy(['name']);
    }, [data]);

    return (

        <div className='card'
             style={{backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', overflow: 'hidden'}}>
            <div style={{overflowX: 'auto'}}>
                <table {...getTableProps()} style={{width: '100%', borderCollapse: 'collapse', minWidth: '600px'}}>
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}
                            style={{backgroundColor: '#eeeeee', fontWeight: 'bold'}}>
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
                    {firstPageRows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}
                                        style={row.isGrouped ? {backgroundColor: 'white', fontWeight: 'bold'} : {}}>
                                        {cell.isGrouped ? (
                                            <>
                                            <span {...row.getToggleRowExpandedProps()}>
                                                {row.isExpanded ? <BsCaretUpFill/> : <BsCaretDownFill/>}
                                            </span>{' '}
                                                {cell.render('Cell')} ({row.subRows.length})
                                            </>
                                        ) : cell.isAggregated ? (
                                            cell.render('Aggregated')
                                        ) : (
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

export default HoldingsTable;
