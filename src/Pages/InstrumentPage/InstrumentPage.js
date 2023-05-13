import "./InstrumentPage.css"
import {useContext, useEffect, useState, useRef} from "react";
import InstrumentSearchBar from "./InstrumentSearchBar/InstrumentSearchBar";
import InstrumentInfo from "./InstrumentInfo/InstrumentInfo";
import InstrumentResuts from "./InstrumentResults/InstrumentResuts";
import InstrumentBrokerTickers from "./InstrumentInfo/InstrumentBrokerTickers/InstrumentBrokerTickers";
import ServerContext from "../../context/server-context";
import InstrumentSearchContext from "./InstrumentPageContext/instrument-search-context";
import axios from "axios";
import InstrumentPrices from "./InstrumentInfo/InstrumentPrices/InstrumentPrices";

const InstrumentPage = () => {
    const [instrumentSearchResults, setInstrumentSearchResults] = useState([{}]);
    const [selectedInstrument, setSelectedInstrument] = useState({});
    const [requestParameters, setRequestParameters] = useState({});
    const isMounted = useRef(false);
    const server = useContext(ServerContext)['server'];

    useEffect(() => {
        if (isMounted.current) {
            axios.post(server + 'instruments/get/instruments/',
                requestParameters,
            )
                .then(data => setInstrumentSearchResults(data.data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        } else {
            isMounted.current = true;
        }
        }, [requestParameters]
    );

    return (
        <InstrumentSearchContext.Provider
            value={{
                searchResults: instrumentSearchResults,
                saveInstrumentSearchResults: setInstrumentSearchResults,
                selectedInstrument: selectedInstrument,
                saveSelectedInstrument: setSelectedInstrument,
                saveRequestParameters: setRequestParameters
            }}>
            <div className={"page-container"}>
                <div className={'instrument-page-container'}>
                    <InstrumentSearchBar/>
                    <div className={'instrument-page-results-container'}>
                        <div style={{display: 'flex', paddingTop: 15, paddingLeft: 15, paddingRight: 15, height: 300}}>
                            <InstrumentInfo/>
                            <InstrumentPrices server={server} id={selectedInstrument.id}/>
                            <InstrumentBrokerTickers server={server} id={selectedInstrument.id}/>
                        </div>
                        <div style={{padding: 15, height: 600}}>
                            <InstrumentResuts data={instrumentSearchResults}/>
                        </div>
                    </div>
                </div>
            </div>
        </InstrumentSearchContext.Provider>
    );
};

export default InstrumentPage;