import {useEffect, useMemo, useState} from "react";
import {useExpanded, useGroupBy, useTable} from "react-table";
import Card from "react-bootstrap/Card";
import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare} from "react-icons/bs";

const ExposureHolding = (props) => {
    const [contributions, setContributions] = useState([]);
    const data = useMemo(
        () => props.data,
        [props.data]
    )

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'instrument_name',

            },
            {
                Header: 'Currency',
                accessor: 'currency',
            },
            {
                Header: 'Tran Type',
                accessor: 'transaction_type',
            },
            {
                Header: 'Trade Date',
                accessor: 'trade_date',
                disableGroupBy: true,
            },
            {
                Header: 'End Pos',
                accessor: 'ending_pos',
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
                Header: 'FX Rate',
                accessor: 'fx_rate',
                disableGroupBy: true,
            },
            {
                Header: 'End MV',
                accessor: 'ending_mv',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`,
            },
            {
                Header: 'Unrealized P&L',
                accessor: 'unrealized_pnl',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`,
            },
             {
                Header: 'Contribution %',
                accessor: 'contribution',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`,
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

    useEffect(() => {
        setGroupBy(['instrument_name'])
        const contribElements = Array.from(
            document.getElementsByClassName('agg-contribution')
        );
        const nameElements = Array.from(
            document.getElementsByClassName('inst-name')
        );
        const contribValues = contribElements.map(data => parseFloat(data.innerHTML))
        const nameValues = nameElements.map(data => data.textContent)
        props.contribs({'contribs': contribValues, 'names': nameValues})
    }, [props.data])


    const tableRow = (row) => {

    };

    return (
        <div style={{height: '100%', overflowY: 'scroll'}}>
            <table {...getTableProps()}>
                <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            <th><input type={'checkbox'}/></th>
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
                            <td>
                                <input type={'checkbox'}/>
                            </td>

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
                                            color: (cell.column.Header === 'Unrealized P&L' || cell.column.Header === 'Contribution %') && cell.value < 0 ? 'red' : (cell.column.Header === 'Unrealized P&L' || cell.column.Header === 'Contribution %') && cell.value > 0 ? 'green' : 'black',
                                        }}
                                        className={cell.isAggregated > 0 && cell.column.id === 'contribution' ? 'agg-contribution': cell.isGrouped && cell.column.id === 'instrument_name' ? 'inst-name': ''}
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
    );
};
export default ExposureHolding;