import {useContext, useState, useMemo} from "react";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import "./InstrumentResults.css"
import InstrumentNew from "../InstrumentNew/InstrumentNew";
import { FaPlus, FaTrash } from "react-icons/fa";
import {useTable} from "react-table";
import fetchAPI from "../../../config files/api";
import CustomModal from "../../../components/Modals/Modals";

const InstrumentResults = ({ data }) => {
    const { saveSelectedInstrument } = useContext(InstrumentSearchContext);
    const [showNewInstrumentModal, setShowNewInstrumentModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [groupedTransactions, setGroupedTransactions] = useState({});
    const [selectedInstrumentId, setSelectedInstrumentId] = useState(null);

    const columns = useMemo(() => [
        { Header: "Name", accessor: "name" },
        { Header: "Country", accessor: "country" },
        { Header: "Currency", accessor: "currency" },
        { Header: "Group", accessor: "group" },
        { Header: "Type", accessor: "type" },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: ({row}) => {
                const instrument = row.original;
                return instrument.user_id != null ? (
                    <button
                        className={'icon-button'}
                        onClick={() => handleDeleteClick(instrument.id)}
                        title="Delete"
                    >
                        <FaTrash size={16}/>
                    </button>
                ) : null;
            },
        },
    ], []);

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetchAPI.post("portfolios/get/transactions/", {
                security_id: id,
            });

            const transactions = response.data;

            // Group by portfolio_code
            const grouped = transactions.reduce((acc, tx) => {
                const portfolio = tx.portfolio_code;
                if (!acc[portfolio]) acc[portfolio] = [];
                acc[portfolio].push(tx);
                return acc;
            }, {});

            setGroupedTransactions(grouped);
            setSelectedInstrumentId(id);
            setShowConfirmModal(true);
        } catch (error) {
            console.error("Error fetching related transactions:", error);
        }
    };

    const confirmDelete = async () => {
        try {
            await fetchAPI.delete("instruments/delete/", {
                data: { security_id: selectedInstrumentId },
            });

            // Optionally refresh instrument list or notify success
            setShowConfirmModal(false);
            setSelectedInstrumentId(null);
            setGroupedTransactions({});
            alert("Instrument and related transactions deleted.");
        } catch (error) {
            console.error("Error deleting instrument:", error);
            alert("Failed to delete.");
        }
    };

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    return (
        <div className="card" style={{ padding: 15 }}>
            <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label>Instruments</label>
                <button
                    className={'icon-button'}
                    onClick={() => setShowNewInstrumentModal(!showNewInstrumentModal)}
                    title="Add New Instrument"
                >
                    <FaPlus size={20} />
                </button>
            </div>

            <InstrumentNew
                show={showNewInstrumentModal}
                close={() => setShowNewInstrumentModal(false)}
            />

            <div style={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}>
                <table {...getTableProps()} style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} style={{ padding: "10px", textAlign: "left" }}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    onClick={() => saveSelectedInstrument(row.original)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {row.cells.map(cell => (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>


            <CustomModal show={showConfirmModal} onClose={() => setShowConfirmModal(false)} title="Confirm Delete">
                <div>
                    <p style={{color: "red", border: 1, borderStyle: "solid", borderRadius: 5}}>The following portfolios will be affected by deleting this instrument:</p>
                    <ul>
                        {Object.entries(groupedTransactions).map(([portfolio, transactions]) => (
                            <li key={portfolio}>
                                <strong>{portfolio}:</strong> {transactions.length} transaction(s)
                            </li>
                        ))}
                    </ul>
                    <p>Do you want to delete this instrument and all its related transactions?</p>

                    <div style={{marginTop: 20, display: "flex", justifyContent: "flex-end", gap: 10}}>
                        <button className="button-secondary" onClick={() => setShowConfirmModal(false)}>
                            Cancel
                        </button>
                        <button className="button-danger" onClick={confirmDelete}>
                            Delete All
                        </button>
                    </div>
                </div>
            </CustomModal>

        </div>
    );
};
export default InstrumentResults;