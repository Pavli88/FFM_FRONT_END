import {useExpanded, useGroupBy, useSortBy, useTable} from "react-table";
import React, {useContext, useState, useMemo} from "react";
import PortfolioContext from "../../../context/portfolio-context";
import NewPortfolio from "./NewPortfolio";
import { FaPlus, FaTrashAlt, FaCheckSquare } from "react-icons/fa";
import fetchAPI from "../../../config files/api";
import './ProfilePortfolios.css'

const ProfilePortfolios = () => {
  const { portfolios: portfolioData, fetchPortfolios } = useContext(PortfolioContext);
  const [showNewPortModal, setShowNewPortModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState({});

  const toggleSelect = (id) => {
    setSelectedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const deletePortfolios = async () => {
    const ids = Object.entries(selectedIds)
      .filter(([_, selected]) => selected)
      .map(([id]) => id);

    if (ids.length === 0) {
      alert("No portfolios selected for deletion.");
      return;
    }

    try {
      const response = await fetchAPI.post("portfolios/delete/portfolios/", {
        ids,
      });

      if (response.data.success) {
        fetchPortfolios();
        alert(response.data.message);
      } else {
        alert("Failed to delete portfolios. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting portfolios:", error);
      alert("An error occurred while deleting portfolios.");
    }
  };

  const confirmAndDelete = () => {
    if (
      window.confirm(
        "Deleting portfolios will remove all related transactions, holdings, and NAV values. Are you sure?"
      )
    ) {
      deletePortfolios();
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "portfolio_name",
      },
      {
        Header: "Code",
        accessor: "portfolio_code",
      },
      {
        Header: "Type",
        accessor: "portfolio_type",
      },
      {
        Header: "Currency",
        accessor: "currency",
      },
      {
        Header: "Funded",
        accessor: "status",
        Cell: ({ value }) => {
          const color =
            value === "Not Funded"
              ? "red"
              : value === "Funded"
              ? "green"
              : "orange";
          return <span style={{ color }}>{value}</span>;
        },
      },
        {
        id: "selection",
        Header: "",
        Cell: ({ row }) =>
          row.canExpand ? null : (
            <input
              type="checkbox"
              checked={!!selectedIds[row.original.id]}
              onChange={() => toggleSelect(row.original.id)}
            />
          ),
      },
    ],
    [selectedIds]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable(
    {
      columns,
      data: portfolioData,
      initialState: {
        groupBy: ["portfolio_type"],
      },
    },
    useGroupBy,
    useSortBy,
    useExpanded
  );

  return (
    <div className="profile-portfolios-card">
      <div className="profile-portfolios-header">
        <label>Portfolios</label>
        <div className="profile-portfolios-actions">
          <button
            className="icon-button"
            onClick={() => setShowNewPortModal(true)}
            title="Add New Portfolio"
          >
            <FaPlus size={20} />
          </button>
          <button className="icon-button" title="Terminate Selected">
            <FaCheckSquare size={20} />
          </button>
          <button
            className="icon-button"
            onClick={confirmAndDelete}
            title="Delete Selected"
          >
            <FaTrashAlt size={20} />
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="portfolio-table" {...getTableProps()}>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const isGroupedRow = row.isGrouped;

              return (
                <React.Fragment key={row.id}>
                  <tr
                    {...row.getRowProps()}
                    className={isGroupedRow ? "group-row" : "table-row-all"}
                  >
                    {row.cells.map((cell) => {
  const isGrouped = cell.isGrouped;
  const isGroupedRow = row.isGrouped;

  return (
    <td {...cell.getCellProps()} key={cell.column.id}>
      {isGrouped ? (
        <>
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "▼" : "▶"}{" "}
          </span>
          {cell.render("Cell")} ({row.subRows.length})
        </>
      ) : isGroupedRow ? (
        <span className="meta-header-cell">
          {cell.column.render("Header")}
        </span>
      ) : cell.isAggregated ? (
        cell.render("Aggregated")
      ) : cell.isPlaceholder ? null : (
        cell.render("Cell")
      )}
    </td>
  );
})}
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <NewPortfolio
        show={showNewPortModal}
        close={() => setShowNewPortModal(false)}
      />
    </div>
  );
};

export default ProfilePortfolios;