import {useContext, useEffect, useMemo, useState} from "react";
import {BsArrowBarDown, BsPencil, BsPlusLg, BsArrowLeftRight } from "react-icons/bs";
import {useExpanded, useGroupBy, useSortBy, useTable} from "react-table";
import PortfolioTransactionEntryModal from "../PortfolioTransactionsModals/PortfolioTransactionEntryModal/PortfolioTransactionEntryModal";
import PortfolioCashEntryModal from "../PortfolioTransactionsModals/PortfolioCashEntryModal/PortfolioCashEntryModal";
import PortfolioUpdateModal from "../PortfolioTransactionsModals/PortfolioUpdateModal/PortfolioUpdateModal";
import {CSVLink} from "react-csv";
import TransactionContext from "../context/transaction-context";
import "./PortfolioTransactionsTable.css"
import {FaSearch, FaPlus, FaTrashAlt, FaMoneyBillWave, FaBan, FaExpand, FaCompress} from "react-icons/fa";
import PortfolioLinkedTransactionModal
    from "../PortfolioTransactionsModals/PortfolioLinkedTransactionModal/PortfolioLinkedTransactionModal";
import fetchAPI from "../../../../../config files/api";
import PortfolioTransactionsFilter from "../PortfolioTransactionsFilter/PortfolioTransactionsFilter";
import PortfolioPageContext from "../../../context/portfolio-page-context";

const formatFloat = (value) => (value ? parseFloat(value).toFixed(2) : "0.00");

const PortfolioTransactionsTable = () => {
    const {setIsFullscreenTransactions, isFullscreenTransactions} = useContext(PortfolioPageContext)
    const {transactions, saveShowFilter, showFilter} = useContext(TransactionContext);

    const [showEntryModal, setShowEntryModal] = useState(false);
    const [showCashModal, setShowCashModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showLinkedModal, setShowLinkedModal] = useState(false);

    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [linkedTransactionID, setLinkedTransactionID] = useState(null);

    const data = useMemo(() => transactions, [transactions]);

    // ✅ Handle checkbox selection
    const handleCheckboxChange = (e, id) => {
        setSelectedIds((prev) =>
            e.target.checked ? [...prev, id] : prev.filter((item) => item !== id)
        );
    };

    const onEditTransaction = (transaction) => {
        setSelectedTransaction(transaction);
        setShowUpdateModal(true);
    };

    const columns = useMemo(() => [
        {
            Header: "Actions",
            accessor: "actions",
            Cell: ({row}) => (
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: 150}}>
                    {/* Checkbox aligned to the left */}
                    <div>
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(row.original.id)}
                            onChange={(e) => handleCheckboxChange(e, row.original.id)}
                        />
                    </div>

                    {/* Buttons aligned to the right */}
                    <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                        <button className="icon-button" onClick={() => onEditTransaction(row.original)} title={'Edit'}>
                            <BsPencil size={20}/>
                        </button>

                        {row.original.id === row.original.transaction_link_code && (
                            <>
                                <button className="icon-button">
                                    <BsArrowLeftRight size={20} title={'Move Transaction'}/>
                                </button>
                                <button className="icon-button" onClick={() => onAddTransaction(row.original)}>
                                    <BsPlusLg size={20} title={'Add Linked Transaction'}/>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ),
        },
        {Header: "ID", accessor: "id", sortType: 'basic'},
        {Header: "Linked Transaction", accessor: "transaction_link_code", sortType: 'basic',},
        {Header: "Trade Date", accessor: "trade_date", sortType: 'basic'},
        {Header: "Transaction Type", accessor: "transaction_type", sortType: 'basic' },
        { Header: "Security Name", accessor: "name", sortType: 'basic' },
        { Header: "Currency", accessor: "currency", sortType: 'basic' },
        { Header: "Status", accessor: "open_status", sortType: 'basic' },
        { Header: "Quantity", accessor: "quantity", sortType: 'basic' },
        { Header: "Trade Price", accessor: "price"},
        { Header: "FX Rate", accessor: "fx_rate" },
        { Header: "Base MV", accessor: "mv", sortType: 'basic' },
        { Header: "Local MV", accessor: "local_mv", sortType: 'basic' },
        { Header: "Book Value", accessor: "bv", sortType: 'basic' },
        { Header: "Local Book Value", accessor: "local_bv", sortType: 'basic' },
        { Header: "Base CF", accessor: "net_cashflow", sortType: 'basic' },
        { Header: "Local CF", accessor: "local_cashflow", sortType: 'basic' },
        { Header: "Margin", accessor: "margin_balance", sortType: 'basic' },
        { Header: "Margin Rate %", accessor: "margin_rate", sortType: 'basic' },
        { Header: "Account ID", accessor: "account_id", sortType: 'basic' },
        { Header: "Broker", accessor: "broker", sortType: 'basic' },
        { Header: "Broker ID", accessor: "broker_id", sortType: 'basic' }
    ], [selectedIds]);

    const tableInstance = useTable(
        { columns, data },
        useGroupBy,
        useSortBy,
        useExpanded
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    const onAddTransaction = (transaction) => {
        setLinkedTransactionID(transaction.id);
    };

    useEffect(() => {
    if (linkedTransactionID) {
        setShowLinkedModal(true);
    }
}, [linkedTransactionID]);

    const deleteTransaction = async () => {
        if (selectedIds.length === 0) return;
        try {
            const response = await fetchAPI.post('portfolios/delete/transaction/', { ids: selectedIds });
            if (response.data.success) {
                setSelectedIds([]);
            }
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    const headerContent = <div style={{display: "flex", gap: "10px"}}>

        <button className={'icon-button'} onClick={() => setShowEntryModal(!showEntryModal)}
                title="New Transaction">
            <FaPlus size={20}/>
        </button>
        <button className={'icon-button'} onClick={() => setShowCashModal(!showCashModal)}
                title="New Capital Transaction">
            <FaMoneyBillWave size={20}/>
        </button>
        <button className={'icon-button'} title="Inactivate Selected">
            <FaBan size={20}/>
        </button>
        <button className={'icon-button'} onClick={() => deleteTransaction()} title="Delete Selected">
            <FaTrashAlt size={20}/>
        </button>
        <button className={'icon-button'} onClick={() => saveShowFilter(!showFilter)} title="Search">
            <FaSearch size={20}/>
        </button>
        <CSVLink filename="transactions.csv" data={data}>
            <BsArrowBarDown size={20} className={'icon-button'}/>
        </CSVLink>
        {/* Fullscreen toggle button */}
        <button
            className={'icon-button'}
            onClick={() => setIsFullscreenTransactions(!isFullscreenTransactions)}
            title={isFullscreenTransactions ? "Back to Normal Size" : "Full Size"}
        >
            {isFullscreenTransactions ? <FaCompress size={20}/> : <FaExpand size={20}/>}
        </button>
    </div>

    return (
        <div style={{ padding: '15px', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <label>Transactions</label>
                {headerContent}
            </div>
            <PortfolioTransactionsFilter/>
            <div style={{ overflowX: 'auto' }}>
                <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className={row.original.is_active ? 'tr-active': 'tr-inactive'}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} >{cell.render("Cell")}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <PortfolioCashEntryModal show={showCashModal}
                                     close={() => setShowCashModal(!showCashModal)}/>
            <PortfolioUpdateModal show={showUpdateModal}
                                  close={() => setShowUpdateModal(!showUpdateModal)}
                                  selectedTransaction={selectedTransaction}
            />
            <PortfolioTransactionEntryModal show={showEntryModal}
                                            close={() => setShowEntryModal(!showEntryModal)}
            />

            <PortfolioLinkedTransactionModal show={showLinkedModal}
                                            close={() => setShowLinkedModal(!showLinkedModal)}

                                             parentID={linkedTransactionID}
            />
        </div>
    );
};

export default PortfolioTransactionsTable;