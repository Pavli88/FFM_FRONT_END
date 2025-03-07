import CustomModal from "../../../components/Modals/Modals";
import {useContext, useRef, useState, useEffect, useCallback} from "react";

import axios from "axios";
import BrokerContext from "../../../context/broker-context";
import ServerContext from "../../../context/server-context";
import {ButtonGroupVertical} from "../../../components/Buttons/ButtonGroups";
import "./TradeTerminal.css"
import _ from "lodash";

const InstrumentSearch = ({ onSelect }) => {
    const server = useContext(ServerContext).server;
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch instruments (debounced)
    const fetchInstruments = useCallback(
        _.debounce(async (query) => {
            if (!query) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const token = localStorage.getItem("access");
                const response = await axios.get(`${server}instruments/get/instruments/`, {
                    params: { name: query },
                    headers: { Authorization: `Bearer ${token}` },
                });

                setResults(response.data || []); // Set results or empty array if no data
            } catch (error) {
                console.error("Error fetching instruments:", error);
                setResults([]);
            }
            setLoading(false);
        }, 300),
        [server]
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        fetchInstruments(value); // Debounced API call
    };

    const handleSelect = (instrument) => {
        setSearchTerm(instrument.name); // Set input value to selected item
        setResults([]); // Hide results
        onSelect(instrument); // Pass selected instrument to parent
    };

    return (
        <div className="relative w-80">
            {/* 🔹 Search Input */}
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for an instrument..."
                // className="w-full p-2 border rounded"
            />

            {/* 🔹 Loading Indicator */}
            {loading && <p className="text-gray-500 text-sm">Loading...</p>}

            {/* 🔹 Results Table Dropdown */}
            {results.length > 0 && (
                <div style={{ height: "400px", overflowY: "auto", border: "1px solid #ccc", margin: 5, width: '100%' }}>
                    <table style={{border: "none"}}>
                        <thead style={{height: '20px'}}>
                            <tr >
                                <th >Name</th>
                                <th >Type</th>
                                <th >Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((instrument) => (
                                <tr
                                    key={instrument.id}
                                    // className="cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSelect(instrument)}
                                    style={{border: "none", cursor: "pointer"}}
                                >
                                    <td style={{border: "none"}}>{instrument.name}</td>
                                    <td style={{border: "none"}}>{instrument.type}</td>
                                    <td style={{border: "none"}}>{instrument.group}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const OandaPriceStream = ({instrument, sendPrice}) => {
    const [status, setStatus] = useState("Connecting...");

    const API_KEY = "8266e498b3159a1171752e892daded37-c7d7ced541a949a9a39fb37c243d5f74"; // Replace with your OANDA API key
    const ACCOUNT_ID = "001-004-2840244-004"; // Replace with your OANDA Account ID
    // const INSTRUMENT = "EUR_USD"; // Currency pair

    const fetchPrice = async () => {
        try {
            const response = await fetch(
                `https://api-fxtrade.oanda.com/v3/accounts/${ACCOUNT_ID}/pricing?instruments=${instrument}`,
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const priceData = data.prices[0];
            // console.log(priceData)
            sendPrice({
                bid: priceData.bids[0].price,
                ask: priceData.asks[0].price,
                time: new Date(priceData.time).toLocaleTimeString(),
            });

            setStatus("Updated");
        } catch (error) {
            console.error("Error fetching price:", error);
            setStatus("Error");
        }
    };

    useEffect(() => {
        fetchPrice(); // Initial fetch
        const interval = setInterval(fetchPrice, 2000); // Fetch every 2 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [instrument]);

    // return (
    //     <div className="p-4 bg-gray-100 rounded-lg">
    //         <p>Status: {status}</p>
    //         {price ? (
    //             <div className="mt-2 p-2 bg-white shadow rounded">
    //                 <p style={{color: "#00a59a"}}>Bid: <strong>{price.bid}</strong></p>
    //                 <p style={{color: "#ee7d8b"}}>Ask: <strong>{price.ask}</strong></p>
    //                 <p>Last Updated: {price.time}</p>
    //             </div>
    //         ) : (
    //             <p>Loading prices...</p>
    //         )}
    //     </div>
    // );
};

const TradeTerminal = ({show, close, portfolioCode}) => {
    const server = useContext(ServerContext).server;
    const {apiSupportedBrokers, accounts} = useContext(BrokerContext);

    const [panelParameters, setPanelParameters] = useState({
        selectedBroker: null,
        selectedAccount: null,
        selectedInstrument: null,
        quantity: 0,
        transactionType: null,
        prices: null
    });

    const [prices, setPrices] = useState(null);
    const [brokerTicker, setBrokerTicker] = useState(null);
    const selectedAccounts = accounts.filter(data => data['broker_name'] === panelParameters.selectedBroker)

    const handleInstrumentSelect = (instrument) => {
        setPanelParameters(prevState => ({
            ...prevState,
            selectedInstrument: instrument
        }))
    };

    const submitHandler = async (event) => {

        const requestParameters = {
            portfolio_code: portfolioCode,
            account_id: panelParameters.selectedAccount,
            security_id: panelParameters.selectedInstrument ? panelParameters.selectedInstrument.id : null,
            transaction_type: panelParameters.transactionType,
            quantity: panelParameters.quantity,
            manual: true,
        };

        // Validation: Ensure required fields are not null or empty
        if (
            !requestParameters.account_id ||
            !requestParameters.security_id ||
            !requestParameters.transaction_type ||
            requestParameters.quantity <= 0
        ) {
            alert("Please fill in all required fields before submitting.");
            return; // Stop execution if validation fails
        }

        console.log("Submitting request with parameters:", requestParameters);

        try {
            const response = await axios.post(server + 'trade_page/new/signal/', requestParameters);
            console.log("Trade submitted successfully:", response.data);
        } catch (error) {
            console.error("Error submitting trade:", error);
            alert("Error submitting trade. Please try again.");
        }
    };

    const getTicker = () => {
        axios.get(server + 'instruments/get/broker/tickers/', {
            params: {
                inst_code: panelParameters.selectedInstrument.id,
                source: panelParameters.selectedBroker,
            }
        })
            .then(response => setBrokerTicker(response.data[0] === undefined ? null : response.data[0]))
            .catch((error) => {
                console.error('Error Message:', error);
            });

    };

    useEffect(() => {
        if (panelParameters.selectedInstrument && panelParameters.selectedBroker) {
            getTicker();
        }
    }, [panelParameters.selectedInstrument, panelParameters.selectedBroker]);

    const brokers = apiSupportedBrokers.map((data) =>
        <option key={data.id} value={data.broker_code}>{data.broker}</option>
    )

    const accountOptions = selectedAccounts.map((data) =>
        <option key={data.id} value={data.id}>
            {data.account_name} ({data.account_number})
        </option>
    )

    return (
        <div className={'card'}>

            <div className={'card-header'}>
                <span>Trade Panel</span>
            </div>


            <div style={{padding: 15}}>
                <div className={'block'}>
                    <span className={'input-label'}>Portfolio Code</span>

                    <div style={{padding: 5}}>
                        {portfolioCode}
                    </div>
                </div>

                <div className={'block'}>
                    <span className={'input-label'}>Brokers</span>
                    <select onChange={(e) => setPanelParameters(prevState => ({
                        ...prevState,
                        selectedBroker: e.target.value
                    }))}>
                        <option value={null}>Select Broker</option>
                        {brokers}
                    </select>
                </div>

                <div className={'block'}>
                    <span className={'input-label'}>Accounts</span>
                    <select onChange={(e) => setPanelParameters(prevState => ({
                        ...prevState,
                        selectedAccount: e.target.value
                    }))}>
                        <option>Select Account</option>
                        {accountOptions}
                    </select>
                </div>

                <div className={'block'}>
                    <span className={'input-label'}>Instrument</span>
                    <InstrumentSearch onSelect={handleInstrumentSelect}/>
                </div>

                <div className={'buy-sell-button-group'}>
                    <button
                        className={panelParameters.transactionType === 'Sale' ? 'sell-button' : 'sell-button-unselected'}
                        onClick={(e) => setPanelParameters(prevState => ({
                            ...prevState,
                            transactionType: 'Sale'
                        }))}>
                        SELL {prices ? prices.bid : ""}
                    </button>
                    <button
                        className={panelParameters.transactionType === 'Purchase' ? 'buy-button' : 'buy-button-unselected'}
                        onClick={(e) => setPanelParameters(prevState => ({
                            ...prevState,
                            transactionType: 'Purchase'
                        }))}>
                        BUY {prices ? prices.ask : ""}
                    </button>
                </div>

                {brokerTicker ? <OandaPriceStream instrument={brokerTicker['source_ticker']}
                                                  sendPrice={(prices) => setPrices(prices)}/> : ""}

                <div>
                    <span className={'input-label'}>Quantity</span>
                    <input type={'number'} onChange={(e) => setPanelParameters(prevState => ({
                        ...prevState,
                        quantity: e.target.value
                    }))} min={0} step={1}/>
                </div>

                <div style={{display: "flex"}}>
                    <div>
                        <span className={'input-label'}>Market Value</span>
                        <span>{panelParameters.quantity * (prices ? prices.ask : 0)}</span>
                    </div>
                    <div>
                        <span className={'input-label'}>Margin Required</span>
                        <span>{panelParameters.quantity * (prices ? prices.ask : 0)}</span>
                    </div>
                </div>

                <div style={{marginTop: 15}}>
                    <button
                        onClick={submitHandler}
                    >
                        Trade
                    </button>
                </div>

            </div>

        </div>
    );
};
export default TradeTerminal;