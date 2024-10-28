import {useEffect, useMemo} from "react";
import {useExpanded, useGroupBy, useTable} from "react-table";
import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare} from "react-icons/bs";

const HoldingsTable = (props) => {
    const data = useMemo(
        () => props.data,
        [props.data]
    )

    const columns = useMemo(
        () => [
            {
                Header: 'Date',
                accessor: 'date',

            },
            {
                Header: 'Name',
                accessor: 'name',

            },
            {
                Header: 'Group',
                accessor: 'group',
            },
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Currency',
                accessor: 'currency',
                disableGroupBy: true,

            },
            {
                Header: 'Transaction ID',
                accessor: 'trd_id',
                disableGroupBy: true,

            },

            {
                Header: 'Instrument ID',
                accessor: 'instrument_id',
                disableGroupBy: true,
            },
            {
                Header: 'Trade Date',
                accessor: 'trade_date',
                disableGroupBy: true,
            },
            {
                Header: 'Trade Type',
                accessor: 'trade_type',
                disableGroupBy: true,
            },
            {
                Header: 'Quantity',
                accessor: 'quantity',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`
            },
            {
                Header: 'Trade Price',
                accessor: 'trade_price',
                disableGroupBy: true,
            },
            {
                Header: 'Market Price',
                accessor: 'market_price',
                disableGroupBy: true,
            },
            {
                Header: 'FX Rate',
                accessor: 'fx_rate',
                disableGroupBy: true,
            },
            {
                Header: 'Book Value',
                accessor: 'bv',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`
            },
            {
                Header: 'Market Value',
                accessor: 'mv',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`,
            },
            {
                Header: 'Unrealized P&L',
                accessor: 'ugl',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`,
            },
            {
                Header: 'Realized P&L',
                accessor: 'rgl',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`,
            },
        ],
        []
    )
    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: {
                groupBy: ['type'], // Change 'category' to the field you want to group by
            },
        },
        useGroupBy,
        useExpanded)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        setGroupBy,
        prepareRow,
        // state: {groupBy},
    } = tableInstance
    const firstPageRows = rows.slice(0, 200)

    useEffect(() => {
        setGroupBy(['group', 'type'])
    }, [props.data])
    return (
        <div style={{height: 500}}>
            <div className={'card'} style={{height: '100%', overflowY: 'scroll'}}>
                <table {...getTableProps()}>
                    <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>
                                            {column.canGroupBy ? (
                                                // If the column can be grouped, let's add a toggle
                                                <span {...column.getGroupByToggleProps()} style={{paddingRight: 5}}>
                      {column.isGrouped ? <BsDashSquare/> : <BsPlusSquare/>}
                    </span>
                                            ) : null}
                                            {column.render('Header')}
                                        </th>
                                    ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {firstPageRows.map((row, i) => {
                        prepareRow(row)
                        // console.log(row)
                        return (
                            <tr {...row.getRowProps()}
                                style={{
                                    cursor: row.isGrouped ? '' : 'pointer',
                                    // background: row.isGrouped ? '#f2f4f4' : 'white'
                                }}

                                // onDoubleClick={() => {
                                //     if (row.isGrouped) {
                                //         console.log('grouped')
                                //     } else {
                                //         setShowModal(true)
                                //         setSelectedTransaction(row.original)
                                //     }
                                // }
                                // }
                            >

                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{
                                                fontWeight: cell.isGrouped
                                                    ? "bold"
                                                    : cell.isAggregated
                                                        ? "bold"
                                                        : cell.isPlaceholder
                                                            ? '#ff000042'
                                                            : 'white',
                                                color: (cell.column.Header === 'Change' || cell.column.Header === 'P&L') && cell.value < 0 ? 'red' : (cell.column.Header === 'Change' || cell.column.Header === 'P&L') && cell.value > 0 ? 'green' : 'black',
                                            }}
                                        >
                                            {cell.isGrouped ? (
                                                // If it's a grouped cell, add an expander and row count
                                                <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? <BsCaretUpFill/> : <BsCaretDownFill/>}
                          </span>{' '}
                                                    {cell.render('Cell')} ({row.subRows.length})
                                                </>
                                            ) : cell.isAggregated ? (
                                                // If the cell is aggregated, use the Aggregated
                                                // renderer for cell
                                                cell.render('Aggregated')
                                            ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                                                // Otherwise, just render the regular cell
                                                cell.render('Cell')

                                            )}
                                        </td>
                                    )
                                })
                                }
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default HoldingsTable;