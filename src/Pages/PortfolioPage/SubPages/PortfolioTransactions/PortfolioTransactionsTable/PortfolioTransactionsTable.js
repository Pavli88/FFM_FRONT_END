import {useContext, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {BsArrowBarDown, BsPencil, BsPlusLg, BsArrowLeftRight } from "react-icons/bs";
import {useExpanded, useGroupBy, useSortBy, useTable} from "react-table";
import ServerContext from "../../../../../context/server-context";
import {ButtonGroupVertical} from "../../../../../components/Buttons/ButtonGroups";
import PortfolioTransactionEntryModal from "../PortfolioTransactionsModals/PortfolioTransactionEntryModal/PortfolioTransactionEntryModal";
import PortfolioCashEntryModal from "../PortfolioTransactionsModals/PortfolioCashEntryModal/PortfolioCashEntryModal";
import PortfolioUpdateModal from "../PortfolioTransactionsModals/PortfolioUpdateModal/PortfolioUpdateModal";
import {CSVLink} from "react-csv";
import TransactionContext from "../context/transaction-context";
import PortfolioContext from "../../../../../context/portfolio-context";
import "./PortfolioTransactionsTable.css"

const formatFloat = (value) => (value ? parseFloat(value).toFixed(2) : "0.00");

const PortfolioTransactionsTable = (props) => {
    const server = useContext(ServerContext).server;
    const portfolioCode = useContext(PortfolioContext).selectedPortfolio.portfolio_code;
    const queryParameters = useContext(TransactionContext).queryParameters;
    const [transactionsData, setTransactionsData] = useState([]);
    const [showEntryModal, setShowEntryModal] = useState(false);
    const [showCashModal, setShowCashModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showLinkedModal, setShowLinkedModal] = useState(false);

    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [linkedTransaction, setLinkedTransaction] = useState({});

    const data = useMemo(() => transactionsData, [transactionsData]);

    const fetchTransactionData = () => {
        axios.post(`${server}portfolios/get/transactions/`, queryParameters)
            .then(response => setTransactionsData(response.data))
            .catch((error) => console.error('Error fetching transactions:', error));
    };

    useEffect(() => {
        fetchTransactionData();
    }, [queryParameters, portfolioCode]);

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
        Cell: ({ row }) => (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {/* Checkbox */}
                <input
                    type="checkbox"
                    checked={selectedIds.includes(row.original.id)}
                    onChange={(e) => handleCheckboxChange(e, row.original.id)}
                />

                {/* Edit Button */}
                <button className="icon-button" onClick={() => onEditTransaction(row.original)}>
                    <BsPencil size={16} />
                </button>

                {/* Conditional Buttons */}
                {row.original.id === row.original.transaction_link_code  &&
                    // If id === transaction_link_code → Show Transfer Button
                    <>
                        <button className="icon-button">
                            <BsArrowLeftRight size={16}/> {/* Transfer Icon */}
                        </button>

                        <button className="icon-button" onClick={() => onAddTransaction(row.original)}>
                            <BsPlusLg size={16}/>
                        </button>
                    </>
                }
            </div>
        ),
        },
        {Header: "ID", accessor: "id", sortType: 'basic'},
        {Header: "Linked Transaction", accessor: "transaction_link_code", sortType: 'basic',},
        {Header: "Portfolio Code", accessor: "portfolio_code", sortType: 'basic'},
        {Header: "Trade Date", accessor: "trade_date", sortType: 'basic'},
        {Header: "Settlement Date", accessor: "settlement_date", sortType: 'basic'},
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
        { Header: "Broker ID", accessor: "broker_id", sortType: 'basic' },
        { Header: "Option", accessor: "option", sortType: 'basic' },
    ], [selectedIds]);

    const tableInstance = useTable(
        { columns, data },
        useGroupBy,
        useSortBy,
        useExpanded
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    const onAddTransaction = (transaction) => {
        setLinkedTransaction({
            ...transaction,
            transaction_link_code: transaction.id,
            open_status: "Close",
            is_active: 0,
        });
        setShowLinkedModal(true);
    };

    const deleteTransaction = async () => {
        if (selectedIds.length === 0) return;
        try {
            const response = await axios.post(`${server}portfolios/delete/transaction/`, { ids: selectedIds });
            if (response.data.success) {
                fetchTransactionData();
                setSelectedIds([]);
            }
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    const buttonDict = {
        "New Transaction": () => setShowEntryModal(!showEntryModal),
        "Cash Transaction": () => setShowCashModal(!showCashModal),
        "Delete Transaction": () => deleteTransaction(),
        "Inactivate": () => deleteTransaction(),
    };

    return (
        <div className='card' style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ display: "flex", height: 60, alignItems: "center" }}>
                <ButtonGroupVertical buttonDict={buttonDict} />
                <CSVLink filename="transactions.csv" data={data} className="download-link">
                    <BsArrowBarDown size={20} className={'icon-button'} />
                </CSVLink>
            </div>

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
                                  fetchTransactionData={() => fetchTransactionData()}
            />
            <PortfolioTransactionEntryModal show={showEntryModal}
                                            close={() => setShowEntryModal(!showEntryModal)}
                                            fetchTransactionData={() => fetchTransactionData()}
            />
        </div>
    );
};

export default PortfolioTransactionsTable;