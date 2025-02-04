import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare, BsTrash} from "react-icons/bs";
import './TradeSignals.css'
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import {useExpanded, useGroupBy, useSortBy, useTable} from "react-table";

const TradeSignals = (props) => {
    const [signalData, setSignalData] = useState([])
    const MINUTE_MS = 10000;

    const data = useMemo(
        () => signalData,
        [signalData]
    )
    console.log(signalData)
    const columns = useMemo(
        () => [
            {
                Header: 'Portfolio',
                accessor: 'portfolio_code',
            },
            {
                Header: 'Security',
                accessor: 'security',
            },
            {
                Header: 'Broker',
                accessor: 'broker_name',
            },
            {
                Header: 'Status',
                accessor: 'sub_message',
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Message',
                accessor: 'message',
                disableGroupBy: true,
            },
            {
                Header: 'Time',
                accessor: 'time',
                disableGroupBy: true,
            },
        ],
        []
    )
    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: [
                    {
                        id: 'sensitivity',
                        desc: true,
                    }
                ],
                groupBy: [{
                    id: 'portfolio_code'
                }]
            }
        },
        useGroupBy,
        useSortBy,
        useExpanded)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        setGroupBy,
        prepareRow,
    } = tableInstance

    const TableRow = (props) => {
        prepareRow(props.row)
        return (
            <tr {...props.row.getRowProps()}
                style={{
                    cursor: props.row.isGrouped ? '' : 'pointer',
                    // color: props.row['original']['sub_message'] === 'Executed' ? "green": 'red'
                    // background: row.isGrouped ? '#f2f4f4' : 'white'
                }}
            >

                {props.row.cells.map(cell => {
                        return (
                            <td
                                {...cell.getCellProps()}
                                style={{
                                    color: cell.value === "Executed" ? "green": "black"

                                }}
                            >
                                {cell.isGrouped ? (
                                    <>
                                        <span {...props.row.getToggleRowExpandedProps()}>
                            {props.row.isExpanded ? <BsCaretUpFill/> : <BsCaretDownFill/>}
                          </span>{' '}
                                        {cell.render('Cell')} ({props.row.subRows.length})
                                    </>
                                ) : cell.isAggregated ?
                                    // If the cell is aggregated, use the Aggregated
                                    // console.log(cell)
                                    cell.render('Aggregated')
                                    : cell.isPlaceholder ? null :
                                        cell.render('Cell')
                                }
                            </td>
                        )
                    }
                )
                }
            </tr>
        )
    };

    const tableRow = rows.map((row) => <TableRow row={row}/>)

    useEffect(() => {
        fetchTradeMessages();
        // const interval = setInterval(() => {
        //     fetchTradeMessages();
        // }, MINUTE_MS);
        // return () => clearInterval(interval);
    }, [])

    const fetchTradeMessages = async() => {
        const response = await axios.get(props.server + "trade_page/notifications/trade_signals/")
        setSignalData(response.data)
    };

    const deleteSignals = async() => {
        const response = await axios.get(props.server + "trade_page/delete/signals/")
        alert(response.data.response)
        fetchTradeMessages()
    };

    return(
        <Card style={{height: '100%'}}>
            <Card.Header style={{border: "none"}}>
                <div>
                    <div style={{display: 'flex', width: '100%'}}>
                        <div style={{width: '300px'}}>
                            Signals
                        </div>
                        <div style={{position: 'absolute', right: 10, margin: 0, padding: 0}}>
                            <button style={{padding: 0, width: 20}} className={'delete-button'} onClick={deleteSignals}>
                                <BsTrash/></button>
                        </div>
                    </div>
                </div>
            </Card.Header>

            <div style={{height: '100%', overflowY: 'scroll'}}>
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
                                                <span {...column.getGroupByToggleProps()}
                                                      style={{paddingRight: 5}}>
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

        </Card>
    )
};
export default TradeSignals;