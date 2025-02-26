import "./InstrumentPage.css"
import {useContext, useEffect, useState, useRef} from "react";
import InstrumentSearchBar from "./InstrumentSearchBar/InstrumentSearchBar";
import InstrumentResuts from "./InstrumentResults/InstrumentResuts";
import ServerContext from "../../context/server-context";
import InstrumentSearchContext from "./InstrumentPageContext/instrument-search-context";
import axios from "axios";
import MyInstruments from "./MyInstruments/MyInstruments";
import ContainerWithSideMenu from "../../components/Layout/ContainerWithSideMenu";

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

    const mainArea = <div className={'page-container'} style={{height: '100%', width: '100%'}}>
        <div style={{width: '100%'}}>
            <InstrumentSearchBar/>
        </div>

        <div style={{width: '100%', paddingTop: '20px'}}>
            <InstrumentResuts data={instrumentSearchResults} server={server}
                              instrument={selectedInstrument}/>
        </div>
        <MyInstruments data={instrumentSearchResults}/>
    </div>

    return (
        <InstrumentSearchContext.Provider
            value={{
                searchResults: instrumentSearchResults,
                saveInstrumentSearchResults: setInstrumentSearchResults,
                selectedInstrument: selectedInstrument,
                saveSelectedInstrument: setSelectedInstrument,
                saveRequestParameters: setRequestParameters
            }}>
            <ContainerWithSideMenu mainArea={mainArea}/>
        </InstrumentSearchContext.Provider>
    );
};

export default InstrumentPage;