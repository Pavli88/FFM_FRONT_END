import React, {useMemo, useEffect, useState, useContext, useCallback} from 'react';
import { useTable, useGroupBy, useExpanded, useSortBy } from 'react-table';
import { FaArrowUp, FaArrowDown, FaTimes, FaPencilAlt } from 'react-icons/fa';
import {BsCaretDownFill, BsCaretUpFill} from "react-icons/bs";
import {ButtonGroupVertical} from "../Buttons/ButtonGroups";
import axios from "axios";
import ServerContext from "../../context/server-context";
import {CSVLink} from "react-csv";
import DateContext from "../../context/date-context";
import {DateSelect} from "../Dates/DateWidgets";
import CustomModal from "../Modals/Modals";
import fetchAPI from "../../config files/api";
import GroupBySelector from "./GroupBySelector/GroupBySelector";
const formatFloat = (value) => (value ? parseFloat(value).toFixed(2) : "0.00");

const HoldingsTable = ({portfolioCode}) => {
    const server = useContext(ServerContext).server;
    const currentDate = useContext(DateContext).currentDate;
    const [holdingData, setHoldingdata] = useState([]);
    const [holdingDate, setHoldingDate] = useState(currentDate);
    const [groupBy, setGroupBy] = useState(["name"]);
    const [showOnlyGrouped, setShowOnlyGrouped] = useState(false);
    const [showTransactions, setShowTransactions] = useState(false);
    const [transactionData, setTransactionData] = useState([]);
    const [selectedChartColumn, setSelectedChartColumn] = useState("total_pnl");
    const [selectedChartColumn2, setSelectedChartColumn2] = useState("mv");

    const fetchTransactions = async (value) => {
        const response = await fetchAPI.post('portfolios/get/transactions/', {
            transaction_link_code: value
        })
        setTransactionData(response.data)
        setShowTransactions(!showTransactions);
    };

    const renderTransactionTable = () => {
        if (!transactionData.length) {
            return <p>No transactions found.</p>;
        }

        const keys = Object.keys(transactionData[0]);

        return (
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                <tr>
                    {keys.map((key) => (
                        <th key={key} style={{borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px'}}>
                            {key}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {transactionData.map((row, index) => (
                    <tr key={index}>
                        {keys.map((key) => (
                            <td key={key} style={{padding: '8px', borderBottom: '1px solid #eee'}}>
                                {row[key]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };


    const columns = useMemo(() => {
        const baseColumns = [
            {
                Header: 'Portfolio', accessor: 'portfolio_code',
                aggregate: (values) => values[0],
                Aggregated: ({value}) => <div>{value}</div>
            },
            {
                Header: 'Date', accessor: 'date',
                aggregate: (values) => values[0],
                Aggregated: ({value}) => <div>{value}</div>
            },
            {Header: 'Name', accessor: 'name'},
            {
                Header: 'Group',
                accessor: 'group'
            },
            {Header: 'Type', accessor: 'type'},
            {Header: 'Currency', accessor: 'currency', disableGroupBy: true},
            {
                Header: 'Inventory ID',
                accessor: 'trd_id',
                disableGroupBy: true,
                Cell: ({row, value}) => {
                    // Show normal text for grouped rows
                    if (row.isGrouped) {
                        return value;
                    }

                    // Make clickable link for non-grouped rows
                    return (
                        <a onClick={() => fetchTransactions(value)}
                           style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>
                            {value}
                        </a>
                    );
                }
            },
            {Header: 'Instrument ID', accessor: 'instrument_id', disableGroupBy: true},
            {Header: 'Trade Date', accessor: 'trade_date', disableGroupBy: true},
            {Header: 'Trade Type', accessor: 'trade_type', disableGroupBy: true},
            {
                Header: 'Beg Quantity',
                accessor: 'beg_quantity',
                aggregate: 'sum',
                disableGroupBy: true,
                sortType: 'basic',
                Aggregated: ({value}) => formatFloat(value),
            },
            {
                Header: 'Quantity',
                accessor: 'quantity',
                aggregate: 'sum',
                disableGroupBy: true,
                sortType: 'basic',
                Aggregated: ({value}) => formatFloat(value),
            },
            {
                Header: 'Trade Price',
                accessor: 'trade_price',
                disableGroupBy: true,
                Cell: ({value}) => formatFloat(value),
            },
            {
                Header: 'Beg Market Price',
                accessor: 'beg_market_price',
                disableGroupBy: true,
                Cell: ({value}) => formatFloat(value),
            },
            {
                Header: 'Market Price',
                accessor: 'market_price',
                disableGroupBy: true,
                Cell: ({value}) => formatFloat(value),
            },
            {
                Header: 'FX Rate',
                accessor: 'fx_rate',
                disableGroupBy: true,
                Cell: ({value}) => formatFloat(value),
            },
            {
                Header: 'Beg Book Value',
                accessor: 'beg_bv',
                aggregate: 'sum',
                disableGroupBy: true,
                sortType: 'basic',
                Aggregated: ({value}) => (
                    <span style={{color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center'}}>
                    {formatFloat(value)}
                </span>
                ),
                Cell: ({value}) => (
                    <span style={{color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center'}}>
                    {formatFloat(value)}
                </span>
                ),
            },
            {
                Header: 'Book Value',
                accessor: 'bv',
                aggregate: 'sum',
                disableGroupBy: true,
                sortType: 'basic',
                Aggregated: ({value}) => (
                    <span style={{color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center'}}>
                    {formatFloat(value)}
                </span>
                ),
                Cell: ({value}) => (
                    <span style={{color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center'}}>
                    {formatFloat(value)}
                </span>
                ),
            },
            {
                Header: 'Market Value',
                accessor: 'mv',
                aggregate: 'sum',
                disableGroupBy: true,
                sortType: 'basic',
                Aggregated: ({value}) => (
                    <span style={{color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center'}}>
                    {formatFloat(value)}
                </span>
                ),
                Cell: ({value}) => (
                    <span style={{color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center'}}>
                    {formatFloat(value)}
                </span>
                ),
            },
            {
                Header: 'Price P&L',
                accessor: 'ugl',
                aggregate: 'sum',
                disableGroupBy: true,
                sortType: 'basic',
                Aggregated: ({value}) => (
                    <span style={{color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center'}}>
                    {value < 0 ? <FaArrowDown style={{marginRight: 5}}/> : <FaArrowUp style={{marginRight: 5}}/>}
                        {formatFloat(value)}
                </span>
                ),
                Cell: ({value}) => (
                    <span style={{color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center'}}>
                    {value < 0 ? <FaArrowDown style={{marginRight: 5}}/> : <FaArrowUp style={{marginRight: 5}}/>}
                        {formatFloat(value)}
                </span>
                ),
            },
            {
                Header: 'Trade P&L',
                accessor: 'trd_pnl',
                aggregate: 'sum',
                disableGroupBy: true,
                sortType: 'basic',
                Aggregated: ({value}) => (
                    <span style={{color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center'}}>
                    {value < 0 ? <FaArrowDown style={{marginRight: 5}}/> : <FaArrowUp style={{marginRight: 5}}/>}
                        {formatFloat(value)}
                </span>
                ),
                Cell: ({value}) => (
                    <span style={{color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center'}}>
                    {value < 0 ? <FaArrowDown style={{marginRight: 5}}/> : <FaArrowUp style={{marginRight: 5}}/>}
                        {formatFloat(value)}
                </span>
                ),
            },
            {
                Header: 'Total P&L',
                accessor: 'total_pnl',
                aggregate: 'sum',
                disableGroupBy: true,
                sortType: 'basic',
                Aggregated: ({value}) => (
                    <span style={{color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center'}}>
                    {value < 0 ? <FaArrowDown style={{marginRight: 5}}/> : <FaArrowUp style={{marginRight: 5}}/>}
                        {formatFloat(value)}
                </span>
                ),
                Cell: ({value}) => (
                    <span style={{color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center'}}>
                    {value < 0 ? <FaArrowDown style={{marginRight: 5}}/> : <FaArrowUp style={{marginRight: 5}}/>}
                        {formatFloat(value)}
                </span>
                ),
            },
            {
                Header: 'Net Weight',
                accessor: 'net_weight',
                aggregate: 'sum',
                disableGroupBy: true,
                sortType: 'basic',
                Aggregated: ({value}) => `${((formatFloat(value) / 10) * 100).toFixed(2)}%`,
                Cell: ({value}) => `${((formatFloat(value) / 10) * 100).toFixed(2)}%`,
            },
            {
                Header: 'Gross Weight',
                accessor: 'gross_weight',
                aggregate: 'sum',
                disableGroupBy: true,
                sortType: 'basic',
                Aggregated: ({value}) => `${((formatFloat(value) / 10) * 1000).toFixed(2)}%`,
                Cell: ({value}) => `${((formatFloat(value) / 10) * 1000).toFixed(2)}%`,
            },
            {
                Header: 'Abs Weight',
                accessor: 'abs_weight',
                aggregate: 'sum',
                disableGroupBy: true,
                sortType: 'basic',
                Aggregated: ({value}) => `${((formatFloat(value) / 10) * 1000).toFixed(2)}%`,
                Cell: ({value}) => `${((formatFloat(value) / 10) * 1000).toFixed(2)}%`,
            },
            {
                Header: 'Leverage',
                accessor: 'pos_lev',
                aggregate: 'sum',
                disableGroupBy: true,
                sortType: 'basic',
                Aggregated: ({value}) => `${formatFloat(value)}x`,
                Cell: ({value}) => `${formatFloat(value)}x`,
            },
        ];

        return baseColumns;
    }, []);

    const tableInstance = useTable(
        {
            columns,
            data: Array.isArray(holdingData) ? holdingData : [],
            initialState: {
                groupBy,
                sortBy: [
                    {
                        id: 'mv',     // <-- the accessor id you want to sort by
                        desc: true    // true = descending, false = ascending
                    }
                ]
            }
        },
        useGroupBy,
        useSortBy,
        useExpanded
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        setGroupBy: tableSetGroupBy,
        prepareRow
    } = tableInstance;

    const fetchHoldingData = async () => {
        const response = await axios.post(`${server}portfolios/get/holding/`, {
            date: holdingDate,
            portfolio_code: portfolioCode
        })
        setHoldingdata(response.data)
    };

    useEffect(() => {
        if (portfolioCode !== undefined) {
            fetchHoldingData()
        }
    }, [portfolioCode, holdingDate])


    // Filter rows: Show only grouped rows when checkbox is checked
    const displayedRows = showOnlyGrouped ? rows.filter(row => row.isGrouped) : rows;

    useEffect(() => {
        if (!selectedChartColumn || !groupBy.length) return;

        const labels = [];
        const values = [];

        displayedRows.forEach(row => {
            labels.push(row.groupByVal);
            values.push(row.values[selectedChartColumn]);

        });
    }, [selectedChartColumn, displayedRows, groupBy]);

    useEffect(() => {
        if (!selectedChartColumn2 || !groupBy.length) return;

        const labels = [];
        const values = [];

        displayedRows.forEach(row => {
            labels.push(row.groupByVal);
            values.push(row.values[selectedChartColumn2]);

        });
    }, [selectedChartColumn2, displayedRows, groupBy]);

    const groupByOptions = [
        {label: "Portfolio", value: "portfolio_code"},
        {label: "Security", value: "name"},
        {label: "Group", value: "group"},
        {label: "Type", value: "type"},
    ];


    return (
        <div className='card'
             style={{
                 padding: '25px',
                 borderRadius: '8px',
                 overflow: 'hidden',
                 maxHeight: 1200,

             }}>

            <div style={{display: "flex", justifyContent: "space-between"}}>
                <label style={{fontSize: "1.2rem", fontWeight: "bold"}}>Holdings Overview</label>

                <div style={{display: "flex", gap: 20, height: 60, alignItems: "center"}}>
                    <GroupBySelector
                        options={groupByOptions}
                        selected={groupBy}
                        setSelected={(newGroupBy) => {
                            setGroupBy(newGroupBy);
                            tableSetGroupBy(newGroupBy); // <- fontos!
                        }}
                    />

                    <div style={{width: 300}}>
                        <DateSelect onDateChange={setHoldingDate}/>
                    </div>

                    <CSVLink
                        data={holdingData}
                        style={{
                            textDecoration: "none",
                            color: "#007bff",
                            fontWeight: "bold"
                        }}
                    >
                        Download CSV
                    </CSVLink>

                </div>
            </div>


            <div>
                <div style={{flex: 2, overflowX: 'auto', maxHeight: 600}}>

                    <div style={{overflowX: 'auto'}}>
                        <table {...getTableProps()}
                               style={{width: '100%', borderCollapse: 'collapse', minWidth: '600px'}}>
                            <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}
                                    style={{backgroundColor: '#eeeeee', fontWeight: 'bold'}}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                            className={column.Header === 'Actions' ? 'sticky-column' : ''}>
                                            {column.render('Header')}
                                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                            </thead>

                            <tbody {...getTableBodyProps()}>
                            {displayedRows.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()}
                                                style={row.isGrouped ? {backgroundColor: 'white'} : {}}
                                                className={cell.column.Header === 'Actions' ? 'sticky-column' : ''}>
                                                {cell.isGrouped ? (
                                                    <>
                                                        {!showOnlyGrouped && (
                                                            <span {...row.getToggleRowExpandedProps()}>
                                                            {row.isExpanded ? <BsCaretUpFill/> : <BsCaretDownFill/>}
                                                        </span>
                                                        )}
                                                        {' '}
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
            </div>

            <CustomModal show={showTransactions} onClose={() => setShowTransactions(!showTransactions)}
                         title={'Transactions'} width={'1500px'}>
                <div style={{maxHeight: '60vh', overflowY: 'auto'}}>
                    {renderTransactionTable()}
                </div>
            </CustomModal>

            {/*<div>*/}
            {/*    <PortfolioTransactionsTable data={{}} server={server} fetch={fetch} updateSelected={(e) => console.log(e)}/>*/}
            {/*</div>*/}
        </div>
    );
};

export default HoldingsTable;
