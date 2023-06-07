import Card from "react-bootstrap/Card";
import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare} from "react-icons/bs";
import {useExpanded, useGroupBy, useTable} from "react-table";
import {useMemo} from "react";

const CalculationResponseTable = (props) => {
    const data = useMemo(
        () => props.data,
        [props.data]
    )

    const columns = useMemo(
        () => [
            {
                Header: 'Portfolio Code',
                accessor: 'portfolio_code',
            },
            {
                Header: 'Date',
                accessor: 'date',

            },
            {
                Header: 'Process',
                accessor: 'process',

            },
            {
                Header: 'Exception',
                accessor: 'exception',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Comment',
                accessor: 'comment',
                disableGroupBy: true,
            },
        ],
        []
    )
    const tableInstance = useTable(
        {columns, data},
        useGroupBy,
        useExpanded)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        setGroupBy,
        prepareRow,
        state: {groupBy},
    } = tableInstance
    const firstPageRows = rows.slice(0, 200)

    return(
        <Card>
            <Card.Header>
                <div style={{display: 'flex'}}>
                    <div>
                        Notifications
                    </div>
                </div>
            </Card.Header>
            <div style={{height: '100%',overflowY: 'scroll'}}>
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

                        return (
                            <tr {...row.getRowProps()}
                                style={{
                                    cursor: row.isGrouped ? '' : 'pointer',
                                    color: row.isGrouped ? 'black' : row.original.status === 'Completed' ? 'green': row.original.status === 'Alert' ? 'orange': 'red'
                                }}
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
                                                            : 'white'
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
        </Card>
    )
};
export default CalculationResponseTable;