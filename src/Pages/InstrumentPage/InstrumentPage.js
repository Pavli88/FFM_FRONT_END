import InstrumentSearch from "./InstrumentSearch";
import InstrumentResultTable from "./InstrumentResultTable";
import InstrumentSettings from "./InstrumentSettings/InstrumentSettings";
import InstrumentDetails from "./InstrumentDetails";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';

//CSS
import "./InstrumentPage.css"
import {useContext, useEffect, useState} from "react";

import InstrumentSearchBar from "./InstrumentSearchBar/InstrumentSearchBar";
import InstrumentInfo from "./InstrumentInfo/InstrumentInfo";
import InstrumentResuts from "./InstrumentResults/InstrumentResuts";

//Contexts
import ServerContext from "../../context/server-context";
import EnvContext from "../../context/env-context";
import InstrumentSearchContext from "./InstrumentPageContext/instrument-search-context";
import axios from "axios";

const InstrumentPage = () => {
    const [instrumentSearchResults, setInstrumentSearchResults] = useState([{
        'id': '',
        'name': '',
        'code': '',
        'country': '',
        'currency': '',
        'group': '',
        'type': '',
    }]);
    const [selectedInstrument, setSelectedInstrument] = useState([{'inst_code': ''}]);
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];

    useEffect(() => {
            // axios.get(server + 'instruments/get/instruments/', {
            //     params: parameters
            // })
            //     .then(data=>setInstrumentData(data.data))
            //     .catch((error) => {
            //         console.error('Error Message:', error);
            //     });
        }, [instrumentSearchResults]
    );

    return (
        <InstrumentSearchContext.Provider
            value={{
                searchResults: instrumentSearchResults,
                saveInstrumentSearchResults: setInstrumentSearchResults,
                selectedInstrument: selectedInstrument,
                saveSelectedInstrument: setSelectedInstrument,
            }}>
            <Container style={{width: "100%", height: window.innerHeight, padding: '0px'}} fluid>
                <Row style={{width:'100%'}}>
                    <InstrumentSearchBar/>
                </Row>
                <Row style={{height: 300, width: '100%'}}>
                    <InstrumentInfo/>
                </Row>
                <Row>
                    <InstrumentResuts data={[{}]}/>
                </Row>
            </Container>
        </InstrumentSearchContext.Provider>
    );
};

export default InstrumentPage;