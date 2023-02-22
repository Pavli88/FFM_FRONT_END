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
import InstrumentBrokerTickers from "./InstrumentInfo/InstrumentBrokerTickers";
//Contexts
import ServerContext from "../../context/server-context";
import EnvContext from "../../context/env-context";
import InstrumentSearchContext from "./InstrumentPageContext/instrument-search-context";
import axios from "axios";

const InstrumentPage = () => {
    const [instrumentSearchResults, setInstrumentSearchResults] = useState([{}]);
    const [selectedInstrument, setSelectedInstrument] = useState({});
    const [requestParameters, setRequestParameters] = useState({})
    const server = useContext(ServerContext)['server'];

    useEffect(() => {
            axios.get(server + 'instruments/get/instruments/', {
                params: requestParameters
            })
                .then(data=> setInstrumentSearchResults(data.data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [requestParameters]
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
                <Row style={{width:'100%', paddingLeft:'15px', paddingRight:'15px'}}>
                    <InstrumentSearchBar/>
                </Row>
                <Row style={{height: 300, width: '100%', paddingLeft:'15px', paddingRight:'15px', paddingTop: '15px'}}>
                    <Col sm={10} style={{padding:0, paddingRight: 15}}>
                        <InstrumentInfo/>
                    </Col>
                    <Col sm={2} style={{padding:0}}>
                        <InstrumentBrokerTickers server={server} id={selectedInstrument.id}/>
                    </Col>
                </Row>
                <Row style={{height: 500, width: '100%', paddingLeft:'15px', paddingRight:'15px', paddingTop: '15px'}}>
                    <InstrumentResuts data={instrumentSearchResults}/>
                </Row>
            </Container>
        </InstrumentSearchContext.Provider>
    );
};

export default InstrumentPage;