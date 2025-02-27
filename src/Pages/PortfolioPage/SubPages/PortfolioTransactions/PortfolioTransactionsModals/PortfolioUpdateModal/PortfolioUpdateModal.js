import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import ServerContext from "../../../../../../context/server-context";
import CustomModal from "../../../../../../components/Modals/Modals";

const PortfolioUpdateModal = ({ show, selectedTransaction, close, fetchTransactionData }) => {
    const server = useContext(ServerContext).server;
    const [updatedTransaction, setUpdatedTransaction] = useState(selectedTransaction);
    console.log(updatedTransaction)
    useEffect(() => {
        setUpdatedTransaction(selectedTransaction);
    }, [selectedTransaction]);

    const updateTransaction = () => {
        axios.post(`${server}portfolios/update/transaction/`, updatedTransaction)
            .then(response => {
                fetchTransactionData();
                alert(response.data.response);
            })
            .catch(error => console.error("Error:", error));
        close();
    };

    return (
        <CustomModal show={show} onClose={close} title={`Update Transaction ${updatedTransaction?.id}`}
            footer={
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={updateTransaction}>
                    Save
                </button>
            }
        >
            <div className="space-y-4">
                {/*{updatedTransaction?.sec_group === "Cash" ? null : (*/}
                {/*    <div>*/}
                {/*        <label className="block">Open Status</label>*/}
                {/*        <Select*/}
                {/*            value={{value: updatedTransaction.open_status, label: updatedTransaction.open_status}}*/}
                {/*            options={[{value: "Open", label: "Open"}, {value: "Closed", label: "Closed"}]}*/}
                {/*            onChange={(e) => setUpdatedTransaction({...updatedTransaction, open_status: e.value})}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*)}*/}

                <div className="block">
                    <label className="block">Transaction Type</label>
                    <input
                        value={updatedTransaction?.transaction_type || ""}
                        type="text"
                        disabled
                    />
                </div>

                <div>
                    <label className="block">Trade Date</label>
                    <input
                        value={updatedTransaction?.trade_date || ""}
                        type="date"
                        onChange={(e) => setUpdatedTransaction({...updatedTransaction, trade_date: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block">Units</label>
                    <input
                        value={Math.abs(updatedTransaction?.quantity) || ""}
                        type="number"
                        onChange={(e) => setUpdatedTransaction({
                            ...updatedTransaction,
                            quantity: Math.abs(e.target.value)
                        })}
                    />
                </div>

                <div>
                    <label className="block">Price</label>
                    <input
                        value={updatedTransaction?.price || ""}
                        type="number"
                        onChange={(e) => setUpdatedTransaction({...updatedTransaction, price: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block">FX Rate</label>
                    <input
                        value={updatedTransaction?.fx_rate || ""}
                        type="number"
                        onChange={(e) => setUpdatedTransaction({...updatedTransaction, fx_rate: e.target.value})}
                    />
                </div>

            </div>
        </CustomModal>
    );
};

export default PortfolioUpdateModal;
