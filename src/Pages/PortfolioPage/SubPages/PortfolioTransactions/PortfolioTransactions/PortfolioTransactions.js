import './PortfolioTransactions.css'
import axios from "axios";
import { useState} from "react";
import { CSVLink, CSVDownload } from "react-csv";
import {BsCaretDownFill, BsCaretUpFill, BsDashSquare, BsPlusSquare, BsArrowBarDown, BsX, BsCurrencyDollar} from "react-icons/bs";
import PortfolioTransactionEntry from "../PortfolioTransactionEntry/PortfolioTransactionEntry";
import PortfolioCashEntry from "../PortfolioCashEntry/PortfolioCashEntry";
import {BsPlusLg, BsPencil, BsTrash} from "react-icons/bs";
import PortfolioTransactionsTable from "../PortfolioTransactionsTable/PortfolioTransactionsTable";
import {ButtonGroupVertical} from "../../../../../components/Buttons/ButtonGroups";

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

    const buttonDict = {
        "New Transaction": () => console.log("test"),
        "Cash Transaction": () => console.log('test'),
        "Delete Transaction": () => deleteTransaction(),
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
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
            <ButtonGroupVertical buttonDict={buttonDict}/>
            {/* Transactions Table */}

            <PortfolioTransactionsTable data={data} server={server} fetch={fetch} updateSelected={(e) => setSelectedIds(e)} />


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