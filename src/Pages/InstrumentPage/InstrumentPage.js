import {useState} from "react";
import InstrumentSearchBar from "./InstrumentSearchBar/InstrumentSearchBar";
import InstrumentResuts from "./InstrumentResults/InstrumentResuts";
import InstrumentPrices from "./InstrumentPrices/InstrumentPrices";
import InstrumentNew from "./InstrumentNew/InstrumentNew";
import InstrumentSearchContext from "./InstrumentPageContext/instrument-search-context";
import ContainerWithSideMenu from "../../components/Layout/ContainerWithSideMenu";
import InstrumentBrokerTickers from "./InstrumentBrokerTickers/InstrumentBrokerTickers";

const InstrumentPage = () => {
    const [instrumentSearchResults, setInstrumentSearchResults] = useState([{}]);
    const [selectedInstrument, setSelectedInstrument] = useState({});
    const [showNewInstrumentModal, setShowNewInstrumentModal] = useState(false);

    const panel = <div style={{width: '100%'}}>
        <div style={{padding: 15}}>
            <button onClick={() => setShowNewInstrumentModal(!showNewInstrumentModal)}>New Instrument</button>
        </div>
        <InstrumentNew show={showNewInstrumentModal} close={() => setShowNewInstrumentModal(!showNewInstrumentModal)}/>
        <InstrumentPrices/>
        <div style={{paddingTop: 15}}>
            <InstrumentBrokerTickers/>
        </div>
    </div>

    const mainArea = <div style={{padding: 20}}>
        <div style={{width: '100%'}}>
            <InstrumentSearchBar/>
        </div>

        <div style={{width: '100%', paddingTop: '20px'}}>
            <InstrumentResuts data={instrumentSearchResults}/>
        </div>
    </div>

    return (
        <InstrumentSearchContext.Provider
            value={{
                searchResults: instrumentSearchResults,
                saveInstrumentSearchResults: setInstrumentSearchResults,
                selectedInstrument: selectedInstrument,
                saveSelectedInstrument: setSelectedInstrument,
            }}>
            <ContainerWithSideMenu panel={panel} mainArea={mainArea} sidebarWidth={"400px"}/>
        </InstrumentSearchContext.Provider>
    );
};

export default InstrumentPage;