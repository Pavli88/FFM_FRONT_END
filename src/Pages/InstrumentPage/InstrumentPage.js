import "./InstrumentPage.css"
import {useContext, useEffect, useState, useRef} from "react";
import InstrumentSearchBar from "./InstrumentSearchBar/InstrumentSearchBar";
import InstrumentResuts from "./InstrumentResults/InstrumentResuts";
import ServerContext from "../../context/server-context";
import InstrumentSearchContext from "./InstrumentPageContext/instrument-search-context";
import axios from "axios";
import InstrumentPricing from "./InstrumentPricing/InstrumentPricing";

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
            <div className={"page-container"} style={{overflow: "scroll"}}>
                    <div className={'search-bar'}>
                        <InstrumentSearchBar/>
                    </div>

                    <div>
                        <div style={{paddingTop: 15, paddingLeft: 15, paddingBottom: 15}}>

                            <InstrumentPricing/>
                        </div>

                        <div style={{padding: 15, width: '100%', height: '100%'}}>
                            <InstrumentResuts data={instrumentSearchResults} server={server}
                                              instrument={selectedInstrument}/>
                        </div>
                    </div>
            </div>
        </InstrumentSearchContext.Provider>
    );
};

export default InstrumentPage;