import './PortfolioTransactions.css'
import axios from "axios";
import {useMemo, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { CSVLink, CSVDownload } from "react-csv";
import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare, BsArrowBarDown, BsX, BsCurrencyDollar} from "react-icons/bs";
import {useExpanded, useGroupBy, useTable} from "react-table";
import PortfolioTransactionEntry from "../PortfolioTransactionEntry/PortfolioTransactionEntry";
import PortfolioCashEntry from "../PortfolioCashEntry/PortfolioCashEntry";
import {BsPlusLg, BsPencil, BsTrash} from "react-icons/bs";

const formatFloat = (value) => (value ? parseFloat(value).toFixed(2) : "0.00");

const TableGrouped = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [showLinkedModal, setShowLinkedModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [linkedTransaction, setLinkedTransaction] = useState({});

    const data = useMemo(() => props.data, [props.data]);

    const updateTransaction = () => {
        axios.post(`${props.server}portfolios/update/transaction/`, selectedTransaction)
            .then(response => alert(response.data.response))
            .catch(error => console.error("Error:", error));

        setShowModal(false);
    };

    const newLinkedTransaction = async () => {
        const response = await axios.post(`${props.server}portfolios/new/transaction/`, linkedTransaction);
        if (response.data.success) {
            props.fetch();
        }
    };

    // Handle checkbox selection
    const handleCheckboxChange = (e, id) => {

        if (e.target.checked) {
            // Add item if not already in the list
            props.updateSelected((prev) => [...prev, id]);
        } else {
            // Remove item from the list
            props.updateSelected((prev) => prev.filter((item) => item !== id));
        }
    };

    const columns = useMemo(() => [
        {
            Header: "Actions",
            accessor: "actions",
            Cell: ({row}) => (
                <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                    <input
                        type="checkbox"
                        // checked={selectedItems.has(row.original.id)}
                        onChange={(e) => handleCheckboxChange(e, row.original.id)}
                    />
                    <button className="action-button edit-button" onClick={() => onEditTransaction(row.original)}>
                        <BsPencil size={16}/>
                    </button>
                    {row.original.transaction_link_code === row.original.id &&
                        !["Subscription", "Redemption", "Commission"].includes(row.original.transaction_type) && (
                            <button className="action-button add-button" onClick={() => onAddTransaction(row.original)}>
                                <BsPlusLg size={16}/>
                            </button>
                        )}
                </div>
            ),
        },
        {Header: "ID", accessor: "id"},
        {Header: "Linked Transaction", accessor: "transaction_link_code"},
        {Header: "Portfolio Code", accessor: "portfolio_code"},
        {Header: "Trade Date", accessor: "trade_date" },
        { Header: "Settlement Date", accessor: "settlement_date" },
        { Header: "Transaction Type", accessor: "transaction_type" },
        { Header: "Security Name", accessor: "name" },
        { Header: "Currency", accessor: "currency" },
        { Header: "Status", accessor: "open_status" },
        { Header: "Quantity", accessor: "quantity" },
        { Header: "Trade Price", accessor: "price", Cell: ({ value }) => formatFloat(value)},
        { Header: "FX Rate", accessor: "fx_rate" , Cell: ({ value }) => formatFloat(value)},
        { Header: "Base MV", accessor: "mv", Cell: ({ value }) => formatFloat(value) },
        { Header: "Local MV", accessor: "local_mv", Cell: ({ value }) => formatFloat(value) },
        { Header: "Book Value", accessor: "bv", Cell: ({ value }) => formatFloat(value) },
        { Header: "Local Book Value", accessor: "local_bv", Cell: ({ value }) => formatFloat(value) },
        { Header: "Base CF", accessor: "net_cashflow", Cell: ({ value }) => formatFloat(value) },
        { Header: "Local CF", accessor: "local_cashflow", Cell: ({ value }) => formatFloat(value) },
        { Header: "Margin", accessor: "margin_balance", Cell: ({ value }) => formatFloat(value) },
        { Header: "Margin Rate %", accessor: "margin_rate", Cell: ({ value }) => formatFloat(value) },
        { Header: "Account ID", accessor: "account_id" },
        { Header: "Broker", accessor: "broker" },
        { Header: "Broker ID", accessor: "broker_id" },
        { Header: "Option", accessor: "option" },
    ], []);

    const tableInstance = useTable({ columns, data }, useGroupBy, useExpanded);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
    const firstPageRows = rows.slice(0, 200);

    const onEditTransaction = (transaction) => {
        setSelectedTransaction(transaction);
        setShowModal(true);
    };

    const onAddTransaction = (transaction) => {
        setLinkedTransaction({
            ...transaction,
            transaction_link_code: transaction.id,
            open_status: "Close",
            is_active: 0,
        });
        setShowLinkedModal(true);
    };

    return (
        <>
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

                       <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Transaction {selectedTransaction.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{padding: '5px', width: '100%'}}>
                        {selectedTransaction.sec_group === 'Cash' ? '':
                        <div style={{width: '100%'}}>
                            <Form.Label>Open Status</Form.Label>
                            <Select style={{height: '100%'}}
                                    value={selectedTransaction.open_status}
                                    options={[
                                        {value: 'Open', label: 'Open'},
                                        {value: 'Closed', label: 'Closed'}
                                    ]}
                                    placeholder={selectedTransaction.open_status}
                                    onChange={(e) => setSelectedTransaction({
                                        ...selectedTransaction,
                                        open_status: e.value,
                                        is_active: e.value === 'Open' ? 1: 0
                                    })}
                            >
                            </Select>
                        </div>
                        }

                        <div style={{width: '100%', marginTop: 15}}>
                            <Form.Label>Trade Date</Form.Label>
                            <Form.Control defaultValue={selectedTransaction.trade_date}
                                          type="date"
                                          onChange={(e) => setSelectedTransaction({
                                              ...selectedTransaction,
                                              trade_date: e.target.value
                                          })}
                            />
                        </div>

                        <div style={{width: '100%', marginTop: 15}}>
                            <Form.Label>Units</Form.Label>
                            <Form.Control defaultValue={Math.abs(selectedTransaction.quantity)}
                                          type="number"
                                          onChange={(e) => setSelectedTransaction({
                                              ...selectedTransaction,
                                              quantity: Math.abs(e.target.value)
                                          })}
                            />
                        </div>

                        <div style={{width: '100%', marginTop: 15}}>
                            <Form.Label>Price</Form.Label>
                            <Form.Control defaultValue={selectedTransaction.price}
                                          type="number"
                                          onChange={(e) => setSelectedTransaction({
                                              ...selectedTransaction,
                                              price: e.target.value,
                                          })}
                            />
                        </div>

                        <div style={{width: '100%', marginTop: 15}}>
                            <Form.Label>FX Rate</Form.Label>
                            <Form.Control defaultValue={selectedTransaction.fx_rate}
                                          type="number"
                                          onChange={(e) => setSelectedTransaction({
                                              ...selectedTransaction,
                                              fx_rate: e.target.value,
                                          })}
                            />
                        </div>

                        {selectedTransaction.sec_group === 'Cash' ? '' :
                            <div style={{width: '100%', marginTop: 15}}>
                                <Form.Label>Broker ID</Form.Label>
                                <Form.Control defaultValue={selectedTransaction.broker_id}
                                              type="number"
                                              onChange={(e) => setSelectedTransaction({
                                                  ...selectedTransaction,
                                                  broker_id: e.target.value,
                                              })}
                                />
                            </div>}

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className={'save-button'} onClick={updateTransaction}>
                        Save
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={showLinkedModal} onHide={() => setShowLinkedModal(false)}>
    <div className="modal-header">
        <h5>New Linked Transaction</h5>
    </div>

    <div className="modal-body">
        <div className="transaction-info">
            <div className="info-row">
                <span className="input-label">Parent Transaction</span>
                <span className="input-value">{linkedTransaction.transaction_link_code}</span>
            </div>
            <div className="info-row">
                <span className="input-label">Security Name</span>
                <span className="input-value">{linkedTransaction.name}</span>
            </div>
            <div className="info-row">
                <span className="input-label">Security Code</span>
                <span className="input-value">{linkedTransaction.security_id}</span>
            </div>
            <div className="info-row">
                <span className="input-label">Open Status</span>
                <span className="input-value">Close</span>
            </div>
            <div className="info-row">
                <span className="input-label">Transaction Type</span>
                <span className="input-value">{linkedTransaction.transaction_type}</span>
            </div>
            <div className="info-row">
                <span className="input-label">Original Quantity</span>
                <span className="input-value">{linkedTransaction.quantity}</span>
            </div>
        </div>

        <div className="input-group">
            <label>Trade Date</label>
            <input
                type="date"
                defaultValue={selectedTransaction.trade_date}
                onChange={(e) =>
                    setLinkedTransaction({ ...linkedTransaction, trade_date: e.target.value })
                }
            />
        </div>

        <div className="input-group">
            <label>Quantity</label>
            <input
                type="number"
                placeholder={selectedTransaction.quantity}
                onChange={(e) =>
                    setLinkedTransaction({ ...linkedTransaction, quantity: e.target.value })
                }
            />
        </div>

        <div className="input-group">
            <label>Price</label>
            <input
                type="number"
                defaultValue={selectedTransaction.price}
                onChange={(e) =>
                    setLinkedTransaction({ ...linkedTransaction, price: e.target.value })
                }
            />
        </div>

        <div className="input-group">
            <label>FX Rate</label>
            <input
                type="number"
                defaultValue={selectedTransaction.fx_rate}
                onChange={(e) =>
                    setLinkedTransaction({ ...linkedTransaction, fx_rate: e.target.value })
                }
            />
        </div>
    </div>

    <Modal.Footer>
        <button className="save-button" onClick={newLinkedTransaction}>Save</button>
    </Modal.Footer>
</Modal>
        </>
    );
};

const PortfolioTransactions = ({ server, data, fetch, portfolio }) => {
    const [showTransactionPanel, setShowTransactionPanel] = useState(false);
    const [showCashPanel, setShowCashPanel] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    // console.log(selectedIds)
    const deleteTransaction = async () => {
        if (selectedIds.length === 0) return;
        try {
            const response = await axios.post(`${server}portfolios/delete/transaction/`, { ids: selectedIds });
            if (response.data.success) {
                fetch();
                setSelectedIds([]);
            }
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Transactions</h2>
                <div className="flex gap-2">
                    <CSVLink filename="transactions.csv" data={data} className="p-2 bg-blue-500 text-white rounded-lg">
                        <BsArrowBarDown size={20} />
                    </CSVLink>
                    <button className="action-button edit-button" onClick={() => setShowTransactionPanel(prev => !prev)}>
                        <BsPlusLg size={20} />
                    </button>
                    <button className="action-button edit-button" onClick={() => setShowCashPanel(prev => !prev)}>
                        <BsCurrencyDollar size={20} />
                    </button>
                    <button
                        className={`p-2 rounded-lg ${selectedIds.length ? "bg-red-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                        onClick={deleteTransaction}
                        // disabled={!selectedIds.length}
                    >
                        <BsTrash size={20} />
                    </button>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-lg shadow-md p-4 overflow-auto max-h-[600px]">
                <TableGrouped data={data} server={server} fetch={fetch} updateSelected={(e) => setSelectedIds(e)} />
            </div>

            {/* Transaction Entry Modal */}
            {showTransactionPanel && (
                <PortfolioTransactionEntry
                    portfolio={portfolio}
                    server={server}
                    show={showTransactionPanel}
                    close={() => {
                        setShowTransactionPanel(false);
                        fetch();
                    }}
                />
            )}

            {/* Cash Entry Modal */}
            {showCashPanel && (
                <PortfolioCashEntry portfolio={portfolio} server={server} show={showCashPanel} close={() => setShowCashPanel(false)} />
            )}
        </div>
    );
};

export default PortfolioTransactions;