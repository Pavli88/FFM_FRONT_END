import {useEffect, useMemo, useState} from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare} from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import {useExpanded, useGroupBy, useTable } from "react-table";

const PortfolioHoldings = (props) => {
    const data = useMemo(
        () => props.data,
        [props.data]
    )

    const columns = useMemo(
        () => [
            {
                Header: 'Tran ID',
                accessor: 'transaction_id',
                disableGroupBy: true,

            },
            {
                Header: 'Name',
                accessor: 'instrument_name',

            },
            {
                Header: 'Inst ID',
                accessor: 'instrument_id',

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
                Header: 'Beg Pos',
                accessor: 'beginning_pos',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`
            },
            {
                Header: 'End Pos',
                accessor: 'ending_pos',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`
            },
            {
                Header: 'Change',
                accessor: 'change',
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
                Header: 'Valuation Price',
                accessor: 'valuation_price',
                disableGroupBy: true,
            },
            {
                Header: 'Beg Market Value',
                accessor: 'beginning_mv',
                aggregate: 'sum',
                disableGroupBy: true,
                Aggregated: ({ value }) => `${Math.round(value * 100) / 100}`
            },
            {
                Header: 'End Market Value',
                accessor: 'ending_mv',
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
    }, [props.data])

    return (
        <Card style={{height: 450}}>
            <Card.Header>
                <div style={{display: 'flex'}}>
                    <div>
                        Holdings at
                    </div>
                    <div style={{paddingLeft: 5}}>
                        {props.date}
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
                        // console.log(row)
                        return (
                            <tr {...row.getRowProps()}
                                style={{
                                    cursor: row.isGrouped ? '' : 'pointer',
                                    background: row.isGrouped ? '#f2f4f4' : 'white'
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
                                                color: cell.column.Header === 'Change' && cell.value < 0 ? 'red' : cell.column.Header === 'Change' && cell.value > 0 ? 'green' : 'black',
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
    );
};

export default PortfolioHoldings;