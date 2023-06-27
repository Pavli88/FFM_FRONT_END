import {useState, useEffect, useContext, useMemo} from "react";
import {Route, Switch, Link} from "react-router-dom";
import ServerContext from "../../context/server-context";
import { RiskSidebarData } from "./RiskSidebarData";
import Sidebar from "../../components/Sidebar/Sidebar";
import {useTable} from "react-table";
import {useRowSelect, useGroupBy, useExpanded} from "react-table";
import axios from "axios";
import { BsCaretDownFill, BsPlusSquare, BsCaretUpFill, BsDashSquare } from "react-icons/bs";


const RiskPage = (props) => {
    const server = useContext(ServerContext)['server'];
    const [showImportModal, setShowImportModal] = useState(false);
    const [response, setResponse] = useState([])
    console.log(response)

    const fetchTransactions = async() => {
        const response = await axios.get(server + 'portfolios/get/open_transactions/')
        setResponse(response.data)
    };

    const data = useMemo(
        () => response,
        [response]
    )

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',

            },
            {
                Header: 'Portfolio Code',
                accessor: 'portfolio_code',

            },
            {
                Header: 'Transaction Type',
                accessor: 'transaction_type',
            },
            {
                Header: 'Currency',
                accessor: 'currency',
            },
            {
                Header: 'Units',
                accessor: 'quantity',
                aggregate: 'sum',
                Aggregated: ({value}) => `${value} (total)`,
            },
            {
                Header: 'Trade Price',
                accessor: 'price',
                aggregate: 'average',
            },
            {
                Header: 'Sec Group',
                accessor: 'sec_group',
            },
            {
                Header: 'Market Value',
                accessor: 'mv',
            },
            {
                Header: 'Account ID',
                accessor: 'account_id',
            },
            {
                Header: 'Broker ID',
                accessor: 'broker_id',
            },
            {
                Header: 'Security',
                accessor: 'security',
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
        state: { groupBy, expanded },
    } = tableInstance
    const firstPageRows = rows.slice(0, 200)
    return (
        <div className={'page-container'}>
            <button onClick={fetchTransactions}>Fetch</button>
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
                      {column.isGrouped ? <BsDashSquare/>: <BsPlusSquare/>}
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
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                console.log(cell)
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
            {/*<Sidebar sidebarData={RiskSidebarData} />*/}
            {/*<div style={{backgroundColor: 'blue', width: '100%', height: '100%'}}>*/}
            {/*    <Switch>*/}
            {/*        <Route path="/risk/dashboard">*/}
            {/*            <h2>Risk Dashboard</h2>*/}
            {/*        </Route>*/}
            {/*        <Route path="/risk/transactions">*/}
            {/*            <h2>Transaction</h2>*/}
            {/*        </Route>*/}
            {/*    </Switch>*/}
            {/*</div>*/}
        </div>
    );
};

export default RiskPage;