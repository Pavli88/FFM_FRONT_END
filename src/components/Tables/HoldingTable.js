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
import PortfolioTransactionsTable
    from "../../Pages/PortfolioPage/SubPages/PortfolioTransactions/PortfolioTransactionsTable/PortfolioTransactionsTable";
import CustomModal from "../Modals/Modals";
import fetchAPI from "../../config files/api";
import {BarChart} from "../../components/Charts/BarCharts"

const formatFloat = (value) => (value ? parseFloat(value).toFixed(2) : "0.00");

const HoldingsTable = ( {portfolioCode} ) => {
    const server = useContext(ServerContext).server;
    const currentDate = useContext(DateContext).currentDate;
    const [holdingData, setHoldingdata] = useState([]);
    const [holdingDate, setHoldingDate] = useState(currentDate);
    const [groupBy, setGroupBy] = useState(["name"]);
    const [showOnlyGrouped, setShowOnlyGrouped] = useState(false);
    const [showActions, setShowActions] = useState(false);
    const [showTransactions, setShowTransactions] = useState(false);
    const [transactionData, setTransactionData] = useState([]);
    const [barLabels, setBarLabels] = useState([]);
    const [barValues, setBarValues] = useState([]);
    const [barLabels2, setBarLabels2] = useState([]);
    const [barValues2, setBarValues2] = useState([]);
    const [selectedChartColumn, setSelectedChartColumn] = useState("total_pnl");
    const [selectedChartColumn2, setSelectedChartColumn2] = useState("mv");

    const fetchTransactions = async(value) => {
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
        { Header: 'Portfolio', accessor: 'portfolio_code',
            aggregate: (values) => values[0],
            Aggregated: ({ value }) => <div>{value}</div>  },
        { Header: 'Date', accessor: 'date',
            aggregate: (values) => values[0],
            Aggregated: ({ value }) => <div>{value}</div> },
        { Header: 'Name', accessor: 'name'},
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
                    <a onClick={() => fetchTransactions(value)} style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>
                        {value}
                    </a>
                );
            }
        },
        {Header: 'Instrument ID', accessor: 'instrument_id', disableGroupBy: true},
        { Header: 'Trade Date', accessor: 'trade_date', disableGroupBy: true },
        { Header: 'Trade Type', accessor: 'trade_type', disableGroupBy: true },
        {
            Header: 'Beg Quantity',
            accessor: 'beg_quantity',
            aggregate: 'sum',
            disableGroupBy: true,
            sortType: 'basic',
            Aggregated: ({ value }) => formatFloat(value),
        },
        {
            Header: 'Quantity',
            accessor: 'quantity',
            aggregate: 'sum',
            disableGroupBy: true,
            sortType: 'basic',
            Aggregated: ({ value }) => formatFloat(value),
        },
        {
            Header: 'Trade Price',
            accessor: 'trade_price',
            disableGroupBy: true,
            Cell: ({ value }) => formatFloat(value),
        },
        {
            Header: 'Beg Market Price',
            accessor: 'beg_market_price',
            disableGroupBy: true,
            Cell: ({ value }) => formatFloat(value),
        },
        {
            Header: 'Market Price',
            accessor: 'market_price',
            disableGroupBy: true,
            Cell: ({ value }) => formatFloat(value),
        },
        {
            Header: 'FX Rate',
            accessor: 'fx_rate',
            disableGroupBy: true,
            Cell: ({ value }) => formatFloat(value),
        },
         {
            Header: 'Beg Book Value',
            accessor: 'beg_bv',
            aggregate: 'sum',
            disableGroupBy: true,
            sortType: 'basic',
            Aggregated: ({ value }) => (
                <span style={{ color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center' }}>
                    {formatFloat(value)}
                </span>
            ),
            Cell: ({ value }) => (
                <span style={{ color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center' }}>
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
            Aggregated: ({ value }) => (
                <span style={{ color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center' }}>
                    {formatFloat(value)}
                </span>
            ),
            Cell: ({ value }) => (
                <span style={{ color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center' }}>
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
            Aggregated: ({ value }) => (
                <span style={{ color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center' }}>
                    {formatFloat(value)}
                </span>
            ),
            Cell: ({ value }) => (
                <span style={{ color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center' }}>
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
            Aggregated: ({ value }) => (
                <span style={{ color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center' }}>
                    {value < 0 ? <FaArrowDown style={{ marginRight: 5 }} /> : <FaArrowUp style={{ marginRight: 5 }} />}
                    {formatFloat(value)}
                </span>
            ),
            Cell: ({ value }) => (
                <span style={{ color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center' }}>
                    {value < 0 ? <FaArrowDown style={{ marginRight: 5 }} /> : <FaArrowUp style={{ marginRight: 5 }} />}
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
            Aggregated: ({ value }) => (
                <span style={{ color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center' }}>
                    {value < 0 ? <FaArrowDown style={{ marginRight: 5 }} /> : <FaArrowUp style={{ marginRight: 5 }} />}
                    {formatFloat(value)}
                </span>
            ),
            Cell: ({ value }) => (
                <span style={{ color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center' }}>
                    {value < 0 ? <FaArrowDown style={{ marginRight: 5 }} /> : <FaArrowUp style={{ marginRight: 5 }} />}
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
            Aggregated: ({ value }) => (
                <span style={{ color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center' }}>
                    {value < 0 ? <FaArrowDown style={{ marginRight: 5 }} /> : <FaArrowUp style={{ marginRight: 5 }} />}
                    {formatFloat(value)}
                </span>
            ),
            Cell: ({ value }) => (
                <span style={{ color: value < 0 ? '#ee7d8b' : '#00a59a', display: 'flex', alignItems: 'center' }}>
                    {value < 0 ? <FaArrowDown style={{ marginRight: 5 }} /> : <FaArrowUp style={{ marginRight: 5 }} />}
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
            Aggregated: ({ value }) => `${formatFloat(value)}x`,
            Cell: ({ value }) => `${formatFloat(value)}x`,
        },
    ];

        if (showActions) {
    baseColumns.push({
        Header: 'Actions',
        accessor: 'actions',
        disableGroupBy: true,
        Cell: ({ row }) => {
            // Get the parent group value if it's a grouped row
            const parentGroupValue = row.depth === 0 ? row.groupByVal : row.original?.parentGroupVal;

            // Condition to hide buttons
            const shouldHideButtons = parentGroupValue === "Cash" || (!row.isGrouped && row.original?.trd_id === 0);

            if (shouldHideButtons) {
                return null; // Do not render buttons
            }

            return (
                <div style={{ display: 'flex', gap: '5px' }}>
                    {!row.isGrouped && (
                        <button onClick={() => handleEdit(row)} style={actionButtonStyle} className="icon-button edit-button">
                            <FaPencilAlt />
                        </button>
                    )}
                    <button onClick={() => handleClose(row)} style={actionButtonStyle} className="icon-button close-button">
                        <FaTimes />
                    </button>
                </div>
            );
        },
    });
}

    return baseColumns;
}, [showActions]);

    const actionButtonStyle = {
        padding: '5px 10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    const numericColumnOptions = columns.filter(col =>
        [
           'ugl', 'trd_pnl', 'total_pnl',
            'net_weight', 'gross_weight', 'abs_weight', 'pos_lev'
        ].includes(col.accessor)
    ).map(col => ({ label: col.Header, value: col.accessor }));

    const numericColumnOptions2 = columns.filter(col =>
        [
            'beg_quantity', 'quantity', 'beg_bv', 'bv', 'mv', 'net_weight', 'gross_weight', 'abs_weight', 'pos_lev'
        ].includes(col.accessor)
    ).map(col => ({ label: col.Header, value: col.accessor }));

    const handleClose = (row) => {
        console.log("Close clicked for", row);
        // Add close logic here
    };

    const handleEdit = (row) => {
        console.log("Edit clicked for", row);
        // Add edit logic here
    };

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

    const { getTableProps, getTableBodyProps, headerGroups, rows, setGroupBy: tableSetGroupBy, prepareRow } = tableInstance;

    const fetchHoldingData = async() => {
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

    const buttonDict = {
    "Portfolio": () => {
        setGroupBy(["portfolio_code"]);
        tableSetGroupBy(["portfolio_code"]);
    },
    "Security": () => {
        setGroupBy(["name"]);
        tableSetGroupBy(["name"]);
    },
    "Group": () => {
        setGroupBy(["group"]);
        tableSetGroupBy(["group"]);
    },
    "Type": () => {
        setGroupBy(["type"]);
        tableSetGroupBy(["type"]);
    },
};


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
        setBarLabels(labels);
        setBarValues(values);
    }, [selectedChartColumn, displayedRows, groupBy]);

    useEffect(() => {
        if (!selectedChartColumn2 || !groupBy.length) return;

        const labels = [];
        const values = [];

        displayedRows.forEach(row => {
            labels.push(row.groupByVal);
            values.push(row.values[selectedChartColumn2]);

        });
        setBarLabels2(labels);
        setBarValues2(values);
    }, [selectedChartColumn2, displayedRows, groupBy]);

    return (
        <div className='card'
             style={{
                 padding: '25px',
                 borderRadius: '8px',
                 overflow: 'hidden',
                 maxHeight: 1200,

             }}>
            <label style={{fontSize: "1.2rem", fontWeight: "bold"}}>Holdings Overview</label>
            <div>
                <div style={{flex: 2, overflowX: 'auto', maxHeight: 600}}>
                    <div style={{display: "flex", height: 60, alignItems: "center"}}>
                        <ButtonGroupVertical buttonDict={buttonDict}/>

                        <div style={{width: 300}}>
                            <DateSelect onDateChange={setHoldingDate}/>
                        </div>

                        <div style={{
                            width: 300,
                            display: "flex",        // Enables flexbox
                            justifyContent: "center", // Centers horizontally
                            alignItems: "center",    // Centers vertically
                            textAlign: "center"     // Ensures text is centered
                        }}>
                            <label style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                whiteSpace: "nowrap"
                            }}>
                                <input
                                    type="checkbox"
                                    checked={showActions}
                                    onChange={() => setShowActions(prev => !prev)}
                                    style={{marginRight: "5px"}}
                                />
                                Eneable Trading
                            </label>
                        </div>

                        <div style={{
                            paddingLeft: 15,
                            width: 200,
                            display: "flex",        // Enables flexbox
                            justifyContent: "center", // Centers horizontally
                            alignItems: "center",    // Centers vertically
                            textAlign: "center"     // Ensures text is centered
                        }}>
                            <CSVLink
                                data={holdingData}
                                className="download-link"
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
                <div style={{display: "flex", gap: "20px", paddingBottom: 40}}>
                    <div style={{flex: 1, height: 400 }}>

                        <div style={{marginTop: 10, marginBottom: 10}}>
                            <select
                                value={selectedChartColumn2}
                                onChange={e => setSelectedChartColumn2(e.target.value)}
                                style={{padding: '5px', borderRadius: '5px'}}
                            >
                                <option value="">Select Column</option>
                                {numericColumnOptions2.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <BarChart
                            labels={barLabels2}
                            values={barValues2}
                            showLabel={true}
                            showInPercent={false}
                        />
                    </div>
                    <div style={{flex: 1, height: 400 }}>

                        <div style={{marginTop: 10, marginBottom: 10}}>
                            <select
                                value={selectedChartColumn}
                                onChange={e => setSelectedChartColumn(e.target.value)}
                                style={{padding: '5px', borderRadius: '5px'}}
                            >
                                <option value="">Select Column</option>
                                {numericColumnOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <BarChart
                            labels={barLabels}
                            values={barValues}
                            showLabel={true}
                            showInPercent={false}
                        />
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
