import {useContext, useState} from "react";
import InstrumentSearchBar from "./InstrumentSearchBar/InstrumentSearchBar";
import InstrumentResuts from "./InstrumentResults/InstrumentResuts";
import InstrumentPrices from "./InstrumentPrices/InstrumentPrices";
import InstrumentSearchContext from "./InstrumentPageContext/instrument-search-context";
import ContainerWithSideMenu from "../../components/Layout/ContainerWithSideMenu";
import InstrumentBrokerTickers from "./InstrumentBrokerTickers/InstrumentBrokerTickers";
import UserContext from "../../context/user-context";

const InstrumentPage = () => {
    const [instrumentSearchResults, setInstrumentSearchResults] = useState([{}]);
    const [selectedInstrument, setSelectedInstrument] = useState({});
    const userData = useContext(UserContext);

    const panel = <div style={{width: '100%', paddingTop: 20}}>

        <InstrumentPrices/>
        {userData?.is_superuser &&
            <div style={{paddingTop: 15}}>
                <InstrumentBrokerTickers/>
            </div>
        }
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