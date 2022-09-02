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
import {useContext, useState} from "react";

//Contexts
import ServerContext from "../../context/server-context";
import EnvContext from "../../context/env-context";
import InstrumentSearchContext from "./InstrumentPageContext/instrument-search-context";

const InstrumentPage = () => {
    const [instrumentSearchResults, setInstrumentSearchResults] = useState([{
        'id': '',
        'instrument_name': '',
        'currency': '',
        'inst_code': '',
        'instrument_type': '',
        'source': '',
    }]);
    const [selectedInstrument, setSelectedInstrument] = useState([{'inst_code': ''}]);
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];

    return (
        <InstrumentSearchContext.Provider
            value={{
                searchResults: instrumentSearchResults,
                saveInstrumentSearchResults: setInstrumentSearchResults,
                selectedInstrument: selectedInstrument,
                saveSelectedInstrument: setSelectedInstrument,
            }}>
            <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '0px'}} fluid>
                <Row className={"row"} style={{height: '90%', width: '100%'}}>
                    <Col style={{height:'100%'}} sm={4}>
                        <Row style={{height: '50%'}}>
                            <InstrumentSearch server={server}/>
                        </Row>
                        <Row style={{height: '50%'}}>
                            <InstrumentDetails server={server} data={selectedInstrument[0]}/>
                        </Row>
                    </Col>
                    <Col style={{height:'100%'}} sm={8}>
                        <InstrumentResultTable server={server}/>
                    </Col>
                </Row>
                {/*<Row className={"row"} style={{height: '40%', width: '100%'}}>*/}
                {/*    <Col style={{height:'100%'}}>*/}
                {/*        */}
                {/*    </Col>*/}
                {/*</Row>*/}
            </Container>
        </InstrumentSearchContext.Provider>
    );
};

export default InstrumentPage;