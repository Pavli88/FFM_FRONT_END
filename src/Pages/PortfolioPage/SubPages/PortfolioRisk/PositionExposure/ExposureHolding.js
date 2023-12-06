import {useEffect, useMemo, useState} from "react";
import {useExpanded, useGroupBy, useTable} from "react-table";
import Card from "react-bootstrap/Card";
import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare} from "react-icons/bs";


const ExposureHolding = (props) => {
    const [rowList, setRowList] = useState([]);
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
                Header: 'End Pos',
                accessor: 'ending_pos',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`
            },
            {
                Header: 'P&L',
                accessor: 'unrealized_pnl',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`,
            },
             {
                Header: 'Simulated P&L',
                accessor: 'sim_profit',
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
             {
                Header: 'Simulated Contr %',
                accessor: 'sim_contr',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`,
            },
            {
                Header: 'Sensitivity',
                accessor: 'sensitivity',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`,
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
                Header: 'Trade Price',
                accessor: 'trade_price',
                disableGroupBy: true,
            },
           {
                Header: 'Current Price',
                accessor: 'valuation_price',
                disableGroupBy: true,
            },
           {
                Header: 'Simulated Price',
                accessor: 'sim_price',
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

    const getContribValues = () => {
        const contribElements = Array.from(
            document.getElementsByClassName('agg-contribution')
        );
        const simContribElements = Array.from(
            document.getElementsByClassName('sim-contrib')
        );
        const sensitiveElements = Array.from(
            document.getElementsByClassName('sensitivity')
        );
        const nameElements = Array.from(
            document.getElementsByClassName('inst-name')
        );
        const contribValues = contribElements.map(data => parseFloat(data.innerHTML))
        const simContribs = simContribElements.map(data => parseFloat(data.innerHTML))
        const sensitivity = sensitiveElements.map(data => parseFloat(data.innerHTML))
        const nameValues = nameElements.map(data => data.textContent)

        props.contribs({
            'contribs': contribValues,
            'names': nameValues,
            'sim_contribs': simContribs,
            'sensitivity': sensitivity
        })
    };

    useEffect(() => {
        setGroupBy(['instrument_name']);
        getContribValues();
    }, [props.data])

    const amend = (tranId) => {
        props.amend(tranId)
    };

    const TableRow = (props) => {
        const [rowTicked, setRowTicked] = useState(false)
        prepareRow(props.row)
        // console.log(props.row)
        return (
            <tr {...props.row.getRowProps()}
                style={{
                    cursor: props.row.isGrouped ? '' : 'pointer',
                    // background: row.isGrouped ? '#f2f4f4' : 'white'
                }}
            >
                {props.row.isGrouped ? <div {...props.row.getToggleRowExpandedProps()} style={{padding: 5, height: '100%'}}>
                            {props.row.isExpanded ? <BsCaretUpFill/> : <BsCaretDownFill/>}
                          </div> :
                <td>
                    <input type={'checkbox'} onClick={() => amend(props.row.original.transaction_id)} checked={props.row.original.ticked}/>
                </td>}

                {props.row.cells.map(cell => {
                        return (
                            <td
                                {...cell.getCellProps()}
                                style={{
                                    fontWeight: cell.isGrouped
                                        ? "bold" : cell.isAggregated ? 'bold'
                                            : cell.isPlaceholder
                                                ? '#ff000042'
                                                : 'white',
                                    color: (cell.column.Header === 'Unrealized P&L' || cell.column.Header === 'Contribution %') && cell.value < 0 ? 'red' : (cell.column.Header === 'Unrealized P&L' || cell.column.Header === 'Contribution %') && cell.value > 0 ? 'green' : 'black',
                                }}
                                className={cell.isAggregated > 0 && cell.column.id === 'contribution' ? 'agg-contribution' : cell.isGrouped && cell.column.id === 'instrument_name' ? 'inst-name' : cell.isAggregated > 0 && cell.column.id === 'sim_contr' ? 'sim-contrib': cell.isAggregated > 0 && cell.column.id === 'sensitivity' ? 'sensitivity': ''}
                            >
                                {cell.isGrouped ? (
                                    // If it's a grouped cell, add an expander and row count
                                    <>

                                        {cell.render('Cell')} ({props.row.subRows.length})
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
                    }
                )
                }
            </tr>
        )
    };

    const tableRow = firstPageRows.map((row) => <TableRow row={row}/>)

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
                {tableRow}
                </tbody>
            </table>
        </div>
    );
};
export default ExposureHolding;