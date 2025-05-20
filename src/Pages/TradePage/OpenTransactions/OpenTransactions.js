import {useContext, useEffect, useMemo, useCallback, useState} from "react";
import "./OpenTransactions.css"
import TradeContext from "../context/trade-context";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare} from "react-icons/bs";
import {useExpanded, useGroupBy, useTable} from "react-table";
import fetchAPI from "../../../config files/api";

const UnitModal = (props) => {
    const [newUnit, setNewUnit] = useState(0);
    const closeTransactions = async (data) => {
        const response = await fetchAPI.post('trade_page/new/signal/', data)
        props.update();
        props.hide();
    }

    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>Close Units - {props.data.portfolio_code} - {props.data.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{width: '100%'}}>

                    <Form.Group>
                        <Form.Label>Units</Form.Label>
                        <Form.Control onChange={(e) => setNewUnit(e.target.value)} type="number" min={0} max={props.data.quantity} required/>
                    </Form.Group>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <div style={{width: '100%'}}>
                    <button className={'terminate-button'}
                            onClick={() => closeTransactions({
                                'transaction_type': 'Close Out',
                                'portfolio_code': props.data.portfolio_code,
                                'account_id': props.data.account_id,
                                'security_id': props.data.security_id,
                                'id': props.data.id,
                                'quantity': newUnit,
                            })}>
                        Close Out
                    </button>
                </div>
                <div style={{width: '100%'}}>
                    <button className={'delete-button'}
                            onClick={() => closeTransactions({
                                'transaction_type': 'Close',
                                'portfolio_code': props.data.portfolio_code,
                                'account_id': props.data.account_id,
                                'security_id': props.data.security_id,
                                'id': props.data.id,
                            })}>
                        Close
                    </button>
                </div>
                <div style={{width: '100%'}}>
                    <button className={'delete-button'}
                            onClick={() => closeTransactions({
                                'transaction_type': 'Close All',
                                'portfolio_code': props.data.portfolio_code,
                                'account_id': props.data.account_id,
                                'security_id': props.data.security_id,
                                'id': props.data.id,
                            })}>
                        Close All Trades
                    </button>
                </div>
                <div style={{width: '100%'}}>
                    <button className={'delete-button'}
                            onClick={() => closeTransactions({
                                'transaction_type': 'Liquidate',
                                'portfolio_code': props.data.portfolio_code,
                                'account_id': props.data.account_id,
                                'security_id': props.data.security_id,
                                'id': props.data.id,
                            })}>
                        Liquidate Portfolio
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};


const OpenTransactions = ( {openTransactions} ) => {
    const { fetchTransactions } = useContext(TradeContext);
    const [grouping, setGrouping] = useState(["portfolio_code"]); // Default grouping

    const closeTransactions = async (selectedIDs) => {
        const response = await fetchAPI.post('trade_page/trade/', {
            ids: selectedIDs
        })
        fetchTransactions();
        console.log(response.data)
    }

    const data = useMemo(() => openTransactions, [openTransactions]);

    const columns = useMemo(
        () => [
            { Header: "Portfolio Code", accessor: "portfolio_code" },
            { Header: "Security", accessor: "name" },
            { Header: "Security ID", accessor: "security_id" },
            { Header: "Group", accessor: "sec_group" },
            { Header: "Currency", accessor: "currency" },
            {
                Header: "Tran Type",
                accessor: "transaction_type",
                Cell: ({ value }) => (
                    <span style={{ color: value === "Purchase" ? "#00a59a" : value === "Sale" ? "#ee7d8b" : "inherit" }}>
                        {value === "Purchase" ? "Buy" : value === "Sale" ? "Sell" : value}
                    </span>
                ),
            },
            { Header: "Quantity", accessor: "quantity", aggregate: "sum", disableGroupBy: true },
            { Header: "Trade Price", accessor: "price", disableGroupBy: true },
            { Header: "Market Value", accessor: "mv", aggregate: "sum", disableGroupBy: true, Cell: ({value}) => (value.toFixed(2)) },
            { Header: "Margin", accessor: "margin_balance", aggregate: "sum", disableGroupBy: true, Cell: ({value}) => (value.toFixed(2)) },
            { Header: "Transaction ID", accessor: "id", disableGroupBy: true },
            { Header: "Account ID", accessor: "account_id", disableGroupBy: true },
            { Header: "Broker", accessor: "broker", disableGroupBy: true },
            { Header: "Broker ID", accessor: "broker_id", disableGroupBy: true },
        ],
        []
    );

    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: { groupBy: grouping }
        },
        useGroupBy,
        useExpanded
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        setGroupBy,
        prepareRow,
        state: { groupBy },
    } = tableInstance;

    useEffect(() => {
        setGroupBy(grouping);
    }, [grouping]);

    const toggleGrouping = (column) => {
        setGrouping((prev) =>
            prev.includes(column) ? prev.filter((g) => g !== column) : [...prev, column]
        );
    };

    const handleLiquidate = useCallback((row) => {
        const transactionIds = row.subRows.map((subRow) => subRow.original.id);
        console.log(`Liquidating Portfolio: ${row.values.portfolio_code}`);
        console.log("Transactions to Liquidate:", transactionIds);
        closeTransactions(transactionIds)
    }, []);

    const handleCloseAll = useCallback((row) => {
        const transactionIds = row.subRows.map((subRow) => subRow.original.id);
        console.log(`Closing All Trades for Security: ${row.values.name}`);
        console.log("Transactions to Close All:", transactionIds);
        closeTransactions(transactionIds)
    }, []);

    const handleClose = useCallback((transactionId) => {
        closeTransactions([transactionId])
        console.log(`Closing Transaction ID: ${transactionId}`);
    }, []);

    const handleCloseOut = useCallback((transactionId) => {
        console.log(`Closing Out Transaction ID: ${transactionId}`);
    }, []);

    return (
        <div className="card">
            <div className="card-header">
                <span>Open Trades</span>
            </div>

            {/* Grouping Buttons */}
            <div className="grouping-buttons" style={{ width: 500 }}>
                {["portfolio_code", "name", "sec_group", "currency"].map((column) => (
                    <button
                        key={column}
                        className={grouping.includes(column) ? "group-button active" : "group-button"}
                        onClick={() => toggleGrouping(column)}
                    >
                        {column === "portfolio_code" ? "Portfolio" : column === "name" ? "Security" : column === "currency" ? "Currency" : "Group"}
                    </button>
                ))}
            </div>

            {/* Scrollable Table */}
            <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "500px", position: "relative" }}>
                <table {...getTableProps()} style={{ minWidth: "100%", tableLayout: "auto" }}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                ))}
                                <th style={{ position: "sticky", right: 0, background: "#fff", zIndex: 2 }}>Actions</th>
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} style={{cursor: row.isGrouped ? "" : "pointer"}}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}
                                        style={{fontWeight: cell.isGrouped ? "bold" : "normal"}}>
                                        {cell.isGrouped ? (
                                            <div style={{display: "flex", alignItems: "center", position: "relative"}}>
                                                {/* Top-right badge */}
                                                <label
                                                    style={{
                                                        position: "absolute",
                                                        top: -6,
                                                        right: -2,
                                                        backgroundColor: "red",
                                                        color: "white",
                                                        fontSize: "0.7rem",
                                                        borderRadius: "50%",
                                                        padding: "2px 5px",
                                                        lineHeight: 1,
                                                    }}
                                                >
                                                    {row.subRows.length}
                                                </label>

                                                {/* Expand/collapse icon */}
                                                <div style={{marginRight: 6}}>
            <span {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? <BsCaretUpFill/> : <BsCaretDownFill/>}
            </span>
                                                </div>

                                                {/* Grouped cell label */}
                                                {cell.render("Cell")}
                                            </div>


                                        ) : cell.isAggregated ? (
                                            cell.render("Aggregated")
                                        ) : cell.isPlaceholder ? null : (
                                            cell.render("Cell")
                                        )}
                                    </td>
                                ))}

                                {/* Fixed Actions Column */}
                                <td style={{
                                    position: "sticky",
                                    right: 0,
                                    background: "#fff",
                                    zIndex: 1,
                                    minWidth: "180px",
                                    textAlign: "center"
                                }}>
                                        {row.isGrouped && row.groupByID === "portfolio_code" && (
                                            <button style={{ backgroundColor: "#ee7d8b", color: "white" }} onClick={() => handleLiquidate(row)}>
                                                Liquidate
                                            </button>
                                        )}
                                        {row.isGrouped && row.groupByID === "name" && (
                                            <button style={{ backgroundColor: "orange", color: "white" }} onClick={() => handleCloseAll(row)}>
                                                Close All
                                            </button>
                                        )}
                                        {!row.isGrouped && (
                                            <>
                                                <button style={{ backgroundColor: "#1697ea", color: "white", width: 80 }} onClick={() => handleClose(row.original.id)}>Close</button>
                                                {/*<button style={{ backgroundColor: "#1697ea", color: "white", width: 80, marginLeft: 8 }} onClick={() => handleCloseOut(row.original.id)}>Close Out</button>*/}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default OpenTransactions;