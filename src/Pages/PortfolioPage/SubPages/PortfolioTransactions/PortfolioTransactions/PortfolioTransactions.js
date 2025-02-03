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

    const columns = useMemo(() => [
        {
            Header: "Actions",
            accessor: "actions",
            Cell: ({row}) => (
                <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                    <input type="checkbox" onChange={(e) => props.updateSelected(e, row.original.id)}/>
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
        { Header: "Linked Transaction", accessor: "transaction_link_code" },
        { Header: "Portfolio Code", accessor: "portfolio_code" },
        { Header: "Trade Date", accessor: "trade_date" },
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

// const TableGrouped = (props) => {
//     const [showModal, setShowModal] = useState(false);
//     const [showLinkedModal, setShowLinkedModal] = useState(false);
//     const [selectedTransaction, setSelectedTransaction] = useState({});
//     const [linkedTransaction, setLinkedTransaction] = useState({});
//
//     const updateTransaction = () =>  {
//         axios.post(props.server + 'portfolios/update/transaction/', selectedTransaction)
//             .then(response => alert(response.data.response))
//             .catch((error) => {
//                 console.error('Error Message:', error);
//             });
//         setShowModal(false)
//     };
//     const data = useMemo(
//         () => props.data,
//         [props.data]
//     )
//
//     const newLinkedTransaction = async() => {
//         const response = await axios.post(props.server + 'portfolios/new/transaction/', linkedTransaction)
//         if (response.data.success) {
//             props.fetch()
//         }
//     };
//
//     const columns = useMemo(
//         () => [
//             {
//                 Header: 'ID',
//                 accessor: 'id',
//
//             },
//             {
//                 Header: 'Linked Transaction',
//                 accessor: 'transaction_link_code',
//
//             },
//             {
//                 Header: 'Portfolio Code',
//                 accessor: 'portfolio_code',
//
//             },
//             {
//                 Header: 'Trade Date',
//                 accessor: 'trade_date',
//             },
//             {
//                 Header: 'Settlement Date',
//                 accessor: 'settlement_date',
//             },
//             {
//                 Header: 'Transaction Type',
//                 accessor: 'transaction_type',
//             },
//             {
//                 Header: 'Security Name',
//                 accessor: 'name',
//             },
//             {
//                 Header: 'Currency',
//                 accessor: 'currency',
//             },
//             {
//                 Header: 'Status',
//                 accessor: 'open_status',
//             },
//             {
//                 Header: 'Quantity',
//                 accessor: 'quantity',
//             },
//             {
//                 Header: 'Trade Price',
//                 accessor: 'price',
//             },
//             {
//                 Header: 'FX Rate',
//                 accessor: 'fx_rate',
//             },
//             {
//                 Header: 'Base MV',
//                 accessor: 'mv',
//             },
//             {
//                 Header: 'Local MV',
//                 accessor: 'local_mv',
//             },
//             {
//                 Header: 'Book Value',
//                 accessor: 'bv',
//             },
//             {
//                 Header: 'Local Book Value',
//                 accessor: 'local_bv',
//             },
//             {
//                 Header: 'Base CF',
//                 accessor: 'net_cashflow',
//             },
//             {
//                 Header: 'Local CF',
//                 accessor: 'local_cashflow',
//             },
//             {
//                 Header: 'Margin',
//                 accessor: 'margin_balance',
//             },
//             {
//                 Header: 'Margin Rate %',
//                 accessor: 'margin_rate',
//             },
//             {
//                 Header: 'Account ID',
//                 accessor: 'account_id',
//             },
//             {
//                 Header: 'Broker',
//                 accessor: 'broker',
//             },
//             {
//                 Header: 'Broker ID',
//                 accessor: 'broker_id',
//             },
//              {
//                 Header: 'Option',
//                 accessor: 'option',
//             },
//
//         ],
//         []
//     )
//     const tableInstance = useTable(
//         {
//             columns,
//             data
//         },
//         useGroupBy,
//         useExpanded)
//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         rows,
//         prepareRow,
//         // state: { groupBy, expanded },
//     } = tableInstance
//     const firstPageRows = rows.slice(0, 200)
//
//     const onAddTransactionButtonClick = (row) => {
//         const newTransactionType = row.transaction_type === 'Purchase'
//             ? 'Sale'
//             : (row.sec_group === 'CFD' && row.transaction_type === 'Sale')
//                 ? 'Sale'
//                 : 'Purchase';
//
//         const updatedDict = {...row};
//         delete updatedDict['name']
//         delete updatedDict['id']
//         // Update linked transaction state
//         setLinkedTransaction({
//             ...updatedDict,
//             transaction_link_code: row.id,
//             // transaction_type: newTransactionType,
//             open_status: 'Close',
//             is_active: 0,
//         });
//
//         // Show the linked modal
//         setShowLinkedModal(true);
//
//     };
//
//     return (
//         <table {...getTableProps()}>
//
//             <thead>
//             {
//                 headerGroups.map(headerGroup => (
//                     <tr {...headerGroup.getHeaderGroupProps()}>
//                         <th></th>
//                         {
//                             headerGroup.headers.map(column => (
//                                 <th {...column.getHeaderProps()} style={{fontSize: 12}}>
//                                     {column.canGroupBy ? (
//                                         // If the column can be grouped, let's add a toggle
//                                         <span {...column.getGroupByToggleProps()} style={{paddingRight: 5}}>
//                       {column.isGrouped ? <BsDashSquare/> : <BsPlusSquare/>}
//                     </span>
//                                     ) : null}
//                                     {column.render('Header')}
//                                 </th>
//                             ))}
//                     </tr>
//                 ))}
//             </thead>
//
//             <tbody {...getTableBodyProps()}>
//             {firstPageRows.map((row, i) => {
//                 prepareRow(row)
//
//                 return (
//                     <tr {...row.getRowProps()}
//                         style={{
//                             background: row.isGrouped ? '#f2f4f4': 'white',
//                             color: row.original.is_active ? 'green' : 'black',
//                         }}
//
//                     >
//                         <td>
//                             <input type={"checkbox"} onChange={(e) => props.updateSelected(e, row.original.id)}/>
//                         </td>
//                         {row.cells.map(cell => {
//                             return (
//                                 // This generates each individual cells
//                                 <td
//                                     {...cell.getCellProps()}
//                                     style={{
//                                         fontWeight: cell.isGrouped
//                                             ? "bold"
//                                             : cell.isAggregated
//                                                 ? "bold"
//                                                 : cell.isPlaceholder
//                                                     ? '#ff000042'
//                                                     : 'white',
//                                         fontSize: 12,
//                                     }}
//                                 >
//                                     {cell.isGrouped ? (
//                                         // If it's a grouped cell, add an expander and row count
//                                         <>
//                           <span {...row.getToggleRowExpandedProps()}>
//                             {row.isExpanded ? <BsCaretUpFill/> : <BsCaretDownFill/>}
//                           </span>{' '}
//                                             {cell.render('Cell')} ({row.subRows.length})
//                                         </>
//                                     ) : cell.isAggregated ? (
//                                         // If the cell is aggregated, use the Aggregated
//                                         // renderer for cell
//                                         cell.render('Aggregated')
//                                     ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
//                                         // Otherwise, just render the regular cell
//                                         cell.render('Cell')
//
//                                     )}
//                                 </td>
//                             )
//                         })
//                         }
//
//                         {row.isGrouped ? '' : <td className={'sticky-column'}>
//                             <div style={{display: "flex"}}>
//                                 {row.original.transaction_link_code === row.original.id && row.original.transaction_type !== 'Subscription' && row.original.transaction_type !== 'Redemption' && row.original.transaction_type !== 'Commission' ?
//                                 <div style={{padding: 2}}>
//                                     <button className={'normal-button'} onClick={() => onAddTransactionButtonClick(row.original)}>
//                                         <BsPlusLg/>
//                                     </button>
//                                 </div>: ''}
//                                 <div style={{padding: 2}}>
//                                     <button className={'normal-button'} onClick={() => {
//                                         setShowModal(true)
//                                         setSelectedTransaction(row.original)
//                                     }}>
//                                         <BsPencil/>
//                                     </button>
//                                 </div>
//                             </div>
//
//                         </td>}
//                     </tr>
//                 )
//             })}
//             </tbody>

//         </table>
//     );
// };

const PortfolioTransactions = (props) => {
    const [showTransactionPanel, setShowTransactionPanel] = useState(false);
    const [showCashPanel, setShowCashPanel] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    const deleteTransaction = async (id) => {
        const response = await axios.post(props.server + 'portfolios/delete/transaction/', {
            ids: selectedIds
        })
        if (response.data.success) {
            props.fetch()
            selectedIds([])
        }
    };

    const handleCheckboxChange = (e, id) => {
        if (e.target.checked) {
            // Add the ID to the list if the checkbox is checked
            setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
        } else {
            // Remove the ID if the checkbox is unchecked
            setSelectedIds((prevSelectedIds) =>
                prevSelectedIds.filter((selectedId) => selectedId !== id)
            );
        }
    };

    return (
        <div >


            <div style={{display: "flex", marginTop: 15, marginBottom: 15}}>
                <p style={{margin: 5}}>Transactions</p>
                <div style={{margin: 5}}>

                    <CSVLink filename="transactions.csv" data={props.data}><BsArrowBarDown
                        className={'get-button'} style={{padding: 5}}/></CSVLink>
                </div>
                <div style={{margin: 5}}>
                    <BsPlusLg className={'get-button'} style={{padding: 5}} onClick={() => setShowTransactionPanel(value => !value)}/>
                </div>
                <div style={{margin: 5}}>
                    <BsCurrencyDollar className={'get-button'} style={{padding: 5}} onClick={() => setShowCashPanel(value => !value)}/>
                </div>
                <div style={{margin: 5}}>
                    <button className={'delete-button'} style={{padding: 5}} onClick={() => deleteTransaction()}>
                        <BsTrash />
                    </button>
                </div>
            </div>


            <div style={{height: 600}}>

                <div className={'card'}
                     style={{
                         height: '100%',
                         width: '100%',
                         overflowY: 'auto',
                         overflowX: 'auto',
                         position: 'relative'
                     }}>
                    <TableGrouped data={props.data} server={props.server} fetch={props.fetch} updateSelected={handleCheckboxChange}/>
                </div>
            </div>

            <PortfolioTransactionEntry portfolio={props.portfolio} server={props.server} show={showTransactionPanel}
                                       close={() => {
                                           setShowTransactionPanel(false);
                                           props.fetch();
                                       }}/>
            <PortfolioCashEntry portfolio={props.portfolio} server={props.server} show={showCashPanel}
                                close={() => setShowCashPanel(false)}/>

        </div>
    );
};

export default PortfolioTransactions;