import {useContext, useState, useMemo} from "react";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import "./InstrumentResults.css"
import InstrumentNew from "../InstrumentNew/InstrumentNew";
import { FaPlus, FaTrash } from "react-icons/fa";
import {useTable} from "react-table";

const InstrumentResults = ({ data, onDelete }) => {
    const { saveSelectedInstrument } = useContext(InstrumentSearchContext);
    const [showNewInstrumentModal, setShowNewInstrumentModal] = useState(false);

    // Define table columns
    const columns = useMemo(() => [
        { Header: "Name", accessor: "name" },
        { Header: "Country", accessor: "country" },
        { Header: "Currency", accessor: "currency" },
        { Header: "Group", accessor: "group" },
        { Header: "Type", accessor: "type" },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: ({ row }) => (
                <button
                    className={'icon-button'}
                    onClick={() => onDelete(row.original.id)}
                    title="Delete"
                    // style={{
                    //     backgroundColor: "red",
                    //     color: "white",
                    //     border: "none",
                    //     padding: "5px",
                    //     borderRadius: "5px",
                    //     cursor: "pointer",
                    // }}
                >
                    <FaTrash size={16} />
                </button>
            ),
        },
    ], []);

    // Initialize table instance
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div className="card" style={{ padding: 15 }}>
            <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label>Instruments</label>
                <button className={'icon-button'} onClick={() => setShowNewInstrumentModal(!showNewInstrumentModal)} title="Add New Instrument">
                    <FaPlus size={20} />
                </button>
            </div>

            <InstrumentNew show={showNewInstrumentModal} close={() => setShowNewInstrumentModal(false)} />

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
                                <tr {...row.getRowProps()} onClick={() => saveSelectedInstrument(row.original)} style={{ cursor: "pointer" }}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default InstrumentResults;