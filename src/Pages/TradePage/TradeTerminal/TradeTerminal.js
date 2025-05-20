import InstrumentSearch from "../../../components/Search/InstrumentSearch/InstrumentSearch";
import {useContext, useState, useEffect} from "react";
import axios from "axios";
import BrokerContext from "../../../context/broker-context";
import ServerContext from "../../../context/server-context";
import "./TradeTerminal.css"
import fetchAPI from "../../../config files/api";
import TradeContext from "../context/trade-context";

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

const TradeTerminal = ({portfolioCode}) => {
    const {apiSupportedBrokers, accounts} = useContext(BrokerContext);
    const { fetchTransactions } = useContext(TradeContext);

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
    const selectedAccounts = accounts.filter(data => data['broker_id'] === panelParameters.selectedBroker)

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
            const response = await fetchAPI.post('trade_page/trade/', requestParameters);
            console.log("Trade submitted successfully:", response.data);
            fetchTransactions()
        } catch (error) {
            console.error("Error submitting trade:", error);
            alert("Error submitting trade. Please try again.");
        }
    };

    const getTicker = () => {
        fetchAPI.get('instruments/get/broker/tickers/', {
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
        <option key={data.id} value={data.id}>{data.broker}</option>
    )

    const accountOptions = selectedAccounts.map((data) =>
        <option key={data.id} value={data.id}>
            {data.account_name} ({data.account_number})
        </option>
    )

    return (
        <div className={'card'}>

            <div style={{padding: 15}}>
                <div className={'block'}>
                    <label>Portfolio Code</label>

                    <div style={{padding: 5}}>
                        {portfolioCode}
                    </div>
                </div>

                <div className={'block'}>
                    <label>Instrument</label>
                    <InstrumentSearch onSelect={handleInstrumentSelect}/>
                </div>

                <div>
                    <label>Quantity</label>
                    <input type={'number'} onChange={(e) => setPanelParameters(prevState => ({
                        ...prevState,
                        quantity: e.target.value
                    }))} min={0} step={1}/>
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

                <div className={'block'}>
                    <label>Brokers</label>
                    <select onChange={(e) => setPanelParameters(prevState => ({
                        ...prevState,
                        selectedBroker: e.target.value ? parseInt(e.target.value) : null,
                        selectedAccount: null
                    }))}>
                        <option value={null}>Select Broker</option>
                        {brokers}
                    </select>
                </div>

                <div className={'block'}>
                    <label>Accounts</label>
                    <select onChange={(e) => setPanelParameters(prevState => ({
                        ...prevState,
                        selectedAccount: e.target.value
                    }))}>
                        <option>Select Account</option>
                        {accountOptions}
                    </select>
                </div>

                {brokerTicker ? <OandaPriceStream instrument={brokerTicker['source_ticker']}
                                                  sendPrice={(prices) => setPrices(prices)}/> : ""}

                <div style={{display: "flex"}}>
                    <div>
                        <label>Market Value</label>
                        <span>{panelParameters.quantity * (prices ? prices.ask : 0)}</span>
                    </div>
                    <div>
                        <label>Margin Required</label>
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