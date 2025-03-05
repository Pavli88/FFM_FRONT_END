import {useContext, useState} from "react";
import ServerContext from "../../../context/server-context";
import axios from "axios";
import CustomModal from "../../../components/Modals/Modals";

const NewCounterParty = ({ show, close }) => {
    const server = useContext(ServerContext).server;
    const [brokerName, setBrokerName] = useState("");
    const [brokerCode, setBrokerCode] = useState("");
    const [type, setType] = useState("bank");

    const submitHandler = async () => {
        if (!brokerName || !brokerCode) {
            alert("Both Name and Code are required.");
            return;
        }
        const token = localStorage.getItem("access");
        try {
            await axios.post(`${server}accounts/new_broker/`, {
                broker: brokerName,
                broker_code: brokerCode,
                type: type
            }, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log("Data saved successfully");
            close();
            setBrokerName("");  // Reset input fields
            setBrokerCode("");
            setType("bank");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <CustomModal
            show={show}
            onClose={close}
            title="New Counterparty"
            footer={
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={submitHandler}
                >
                    Save
                </button>
            }
        >
            <div className="h-[600px] overflow-y-scroll p-5">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Name</label>
                    <input
                        type="text"
                        value={brokerName}
                        onChange={(e) => setBrokerName(e.target.value)}
                        className="w-full border rounded px-3 py-2 mt-1"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Code</label>
                    <input
                        type="text"
                        value={brokerCode}
                        onChange={(e) => setBrokerCode(e.target.value)}
                        className="w-full border rounded px-3 py-2 mt-1"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full border rounded px-3 py-2 mt-1"
                    >
                        <option value="bank">Bank</option>
                        <option value="broker">Broker</option>
                    </select>
                </div>
            </div>
        </CustomModal>
    );
};


export default NewCounterParty;