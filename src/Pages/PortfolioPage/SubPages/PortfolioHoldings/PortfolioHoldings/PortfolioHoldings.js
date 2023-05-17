import {useMemo, useState} from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare} from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import {useExpanded, useGroupBy, useTable} from "react-table";

const PortfolioHoldings = (props) => {
    const data = useMemo(
        () => props.data,
        [props.data]
    )

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',

            },
            {
                Header: 'Instrument',
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
            },
            {
                Header: 'Country',
                accessor: 'country',
            },
            {
                Header: 'Beginning Position',
                accessor: 'beginning_pos',
            },
            {
                Header: 'Ending Position',
                accessor: 'ending_pos',
            },
            {
                Header: 'Movement',
                accessor: 'pos_movement',
            },
            {
                Header: 'Price',
                accessor: 'price',
            },
            {
                Header: 'Beginning Market Value',
                accessor: 'beginning_mv',
            },
            {
                Header: 'Ending Market Value',
                accessor: 'ending_mv',
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
        prepareRow,
        state: {groupBy, expanded},
    } = tableInstance
    const firstPageRows = rows.slice(0, 200)
    return (
        <Card className="card">
            <Card.Header>Holdings</Card.Header>
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
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
                                <th></th>
                                <th></th>
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