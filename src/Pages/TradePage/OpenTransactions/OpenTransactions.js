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


const OpenTransactions = ({openTransactions}) => {
    const {fetchTransactions} = useContext(TradeContext);
    const [grouping, setGrouping] = useState(["portfolio_code"]); // Default grouping

    const closeTransactions = async (signal) => {
        const response = await fetchAPI.post("trade_page/trade/", signal);
        fetchTransactions();
        console.log(response.data);
    };

    const data = useMemo(() => openTransactions, [openTransactions]);

    const columns = useMemo(
        () => [
            {Header: "Portfolio Code", accessor: "portfolio_code"},
            {Header: "Security", accessor: "name"},
            {
                Header: "Quantity",
                accessor: "quantity",
                aggregate: "sum",
                disableGroupBy: true,
            },
        {
  Header: "Trade Price",
  accessor: "price",
  disableGroupBy: true,
  aggregate: () => null, // ne számoljon aggregált értéket itt
  Aggregated: ({ row }) => {
    // Csak akkor számolunk, ha ez a csoport a "name" mezőre vonatkozik
    if (row.groupByID !== "name" || !row.subRows?.length) return "-";

    let totalQuantity = 0;
    let weightedSum = 0;

    row.subRows.forEach(sub => {
      const original = sub.original;
      if (!original) return;

      const q = original.quantity ?? 0;
      const p = original.price ?? 0;

      totalQuantity += q;
      weightedSum += q * p;
    });

    if (totalQuantity === 0) return "-";

    const weightedAvg = weightedSum / totalQuantity;
    return weightedAvg.toFixed(2);
  },
},
             {
                Header: "Market Value",
                accessor: "mv",
                aggregate: "sum",
                disableGroupBy: true,
                Cell: ({value}) => value.toFixed(2),
            },
            {
                Header: "Margin",
                accessor: "margin_balance",
                aggregate: "sum",
                disableGroupBy: true,
                Cell: ({value}) => value.toFixed(2),
            },
             {
                Header: "Tran Type",
                accessor: "transaction_type",
                Cell: ({value}) => (
                    <span
                        style={{
                            color:
                                value === "Purchase"
                                    ? "#00a59a"
                                    : value === "Sale"
                                        ? "#ee7d8b"
                                        : "inherit",
                        }}
                    >
            {value === "Purchase"
                ? "Buy"
                : value === "Sale"
                    ? "Sell"
                    : value}
          </span>
                ),
            },
            {Header: "Group", accessor: "sec_group"},
            {Header: "Currency", accessor: "currency"},
            {Header: "Transaction ID", accessor: "id", disableGroupBy: true},
            {Header: "Account ID", accessor: "account_id", disableGroupBy: true},
            {Header: "Broker", accessor: "broker", disableGroupBy: true},
            {Header: "Broker ID", accessor: "broker_id", disableGroupBy: true},
        ],
        []
    );

    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: {groupBy: grouping},
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
        state: {groupBy},
    } = tableInstance;

    useEffect(() => {
        setGroupBy(grouping);
    }, [grouping]);

    const handleLiquidate = useCallback((row) => {
        const transactionIds = row.subRows.map((subRow) => subRow.original.id);
        closeTransactions(transactionIds);
    }, []);

    const handleCloseAll = useCallback((row) => {
        const signalData = {
            transaction_type: "Close All",
            portfolio_code: row.subRows[0].original.portfolio_code,
            quantity: 0,
            security_id: row.subRows[0].original.security_id,
            account_id: row.subRows[0].original.account_id,
        };
        closeTransactions(signalData);
    }, []);

    const handleClose = useCallback((row) => {
        const signalData = {
            transaction_type: "Close",
            portfolio_code: row.original.portfolio_code,
            quantity: 0,
            security_id: row.original.security_id,
            account_id: row.original.account_id,
            id: row.original.id,
        };
        closeTransactions(signalData);
    }, []);

    return (
        <div className="card">
            <div className="open-trades-header">
                <div className="open-trades-title">
                    <label>Open Trades</label>
                </div>

                <div className="grouping-controls">
                    <label htmlFor="group-select" className="grouping-label">Group by</label>

                    <select
                        id="group-select"
                        value=""
                        onChange={(e) => {
                            const selected = e.target.value;
                            if (selected && !grouping.includes(selected)) {
                                setGrouping((prev) => [...prev, selected]);
                            }
                        }}
                        className="grouping-select"
                    >
                        <option value="" disabled>Select...</option>
                        {["portfolio_code", "name", "sec_group", "currency"]
                            .filter((opt) => !grouping.includes(opt))
                            .map((option) => (
                                <option key={option} value={option}>
                                    {
                                        {
                                            portfolio_code: "Portfolio Code",
                                            name: "Security",
                                            sec_group: "Group",
                                            currency: "Currency",
                                        }[option]
                                    }
                                </option>
                            ))}
                    </select>

                    <div className="grouping-chips-wrapper">
                        {grouping.map((key) => (
                            <div key={key} className="grouping-chip">
                                {
                                    {
                                        portfolio_code: "Portfolio Code",
                                        name: "Security",
                                        sec_group: "Group",
                                        currency: "Currency",
                                    }[key]
                                }
                                <button
                                    onClick={() =>
                                        setGrouping((prev) => prev.filter((g) => g !== key))
                                    }
                                    className="chip-remove"
                                    aria-label={`Remove grouping: ${key}`}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        {grouping.length > 0 && (
                            <button onClick={() => setGrouping([])} className="clear-all-button">
                                Clear All
                            </button>
                        )}
                    </div>
                </div>
            </div>


            {/* Scrollable Table */}
            <div
                style={{
                    overflowX: "auto",
                    overflowY: "auto",
                    maxHeight: "500px",
                    position: "relative",
                }}
            >
                <table
                    {...getTableProps()}
                    style={{minWidth: "100%", tableLayout: "auto"}}
                >
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                            <th
                                style={{
                                    position: "sticky",
                                    right: 0,
                                    background: "#fff",
                                    zIndex: 2,
                                }}
                            >
                                Actions
                            </th>
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                style={{cursor: row.isGrouped ? "" : "pointer"}}
                            >
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                        className={
                                            row.depth > 0 &&
                                            groupBy.length >= row.depth &&
                                            cell.column.id === groupBy[row.depth - 1]
                                                ? "tree-line-cell"
                                                : ""
                                        }
                                        style={{
                                            fontWeight: cell.isGrouped ? "bold" : "normal",
                                            position: "relative",
                                            paddingLeft: "20px", // Hely a vonalnak
                                        }}
                                    >
                                        {cell.isGrouped ? (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    position: "relative",
                                                }}
                                            >
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
                                                <div style={{marginRight: 6}}>
                            <span {...row.getToggleRowExpandedProps()}>
                              {row.isExpanded ? (
                                  <BsCaretUpFill/>
                              ) : (
                                  <BsCaretDownFill/>
                              )}
                            </span>
                                                </div>
                                                {cell.render("Cell")}
                                            </div>
                                        ) : cell.isAggregated ? (
                                            cell.render("Aggregated")
                                        ) : cell.isPlaceholder ? null : (
                                            cell.render("Cell")
                                        )}
                                    </td>
                                ))}
                                <td
                                    style={{
                                        position: "sticky",
                                        right: 0,
                                        background: "#fff",
                                        zIndex: 1,
                                        minWidth: "180px",
                                        textAlign: "center",
                                    }}
                                >
                                    {row.isGrouped && row.groupByID === "portfolio_code" && (
                                        <button
                                            style={{backgroundColor: "#ee7d8b", color: "white"}}
                                            onClick={() => handleLiquidate(row)}
                                        >
                                            Liquidate
                                        </button>
                                    )}
                                    {row.isGrouped && row.groupByID === "name" && (
                                        <button
                                            style={{backgroundColor: "orange", color: "white"}}
                                            onClick={() => handleCloseAll(row)}
                                        >
                                            Close All
                                        </button>
                                    )}
                                    {!row.isGrouped && (
                                        <button
                                            style={{
                                                backgroundColor: "#1697ea",
                                                color: "white",
                                                width: 80,
                                            }}
                                            onClick={() => handleClose(row)}
                                        >
                                            Close
                                        </button>
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