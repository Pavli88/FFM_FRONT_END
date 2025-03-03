import ServerContext from "../../../context/server-context";
import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import DateContext from "../../../context/date-context";
import {ButtonGroupVertical} from "../../../components/Buttons/ButtonGroups";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import NewPriceEntry from "./NewPriceEntry/NewPriceEntry";

const InstrumentPrices = () => {
    const server = useContext(ServerContext).server;
    const currentDate = useContext(DateContext).currentDate;
    const selectedInstrument = useContext(InstrumentSearchContext).selectedInstrument;
    const [queryDate, setQueryDate] = useState(currentDate);
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [priceData, setPriceData] = useState([]);
    const [selectedPriceID, setSelectedPriceID] = useState(null);

    useEffect(() => {
        if (selectedInstrument && selectedInstrument.id) {
            fetchPrices(queryDate);
        }
    }, [selectedInstrument, queryDate]);

    const fetchPrices = async (date) => {
        try {
            const response = await axios.get(`${server}instruments/get/price/`, {
                params: {
                    date__gte: date,
                    instrument_id: selectedInstrument.id
                }
            });
            setPriceData(response.data);
        } catch (error) {
            console.error("Error fetching prices:", error);
        }
    };

    const deletePrice = async () => {
        if (!selectedPriceID) {
            alert("No price selected for deletion.");
            return;
        }
        try {
            const response = await axios.post(`${server}instruments/delete/price/`, {
                id: selectedPriceID
            });
            alert(response.data.response);
            fetchPrices(queryDate);
        } catch (error) {
            console.error("Error deleting price:", error);
        }
    };

    const buttonDict = {
        "New": () => setShowPriceModal(!showPriceModal),
        "Delete": () => deletePrice()
    };

    return (
        <div style={{ width: "100%", height: "500px" }}>
            <div className="card">
                <div>
                    <ButtonGroupVertical buttonDict={buttonDict} />
                </div>
                <div style={{ padding: 15 }}>
                    <input
                        type="date"
                        value={queryDate}
                        onChange={(e) => setQueryDate(e.target.value)}
                        style={{ margin: 0 }}
                    />
                </div>
                <div style={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}>
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            {priceData.map((data) => (
                                <tr
                                    key={data.id}
                                    onClick={() => setSelectedPriceID(data.id)}
                                    style={{ cursor: "pointer", backgroundColor: selectedPriceID === data.id ? "#f0f0f0" : "transparent" }}
                                >
                                    <td>{data.date}</td>
                                    <td>{data.price}</td>
                                    <td>{data.source}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <NewPriceEntry
                show={showPriceModal}
                close={()=>setShowPriceModal(!showPriceModal)}
                refreshPrices={() => fetchPrices(queryDate)}
            />
        </div>
    );
};
export default InstrumentPrices;