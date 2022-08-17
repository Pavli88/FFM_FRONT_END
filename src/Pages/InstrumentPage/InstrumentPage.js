import InstrumentSearch from "./InstrumentSearch";
import InstrumentResultTable from "./InstrumentResultTable";

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
    const server = useContext(ServerContext)['server'];
    const env = useContext(EnvContext)['environment'];

    return (
        <InstrumentSearchContext.Provider
            value={{searchResults: instrumentSearchResults, saveInstrumentSearchResults: setInstrumentSearchResults}}>
            <Container style={{background: '#FBFAFA', width: "100%", height: window.innerHeight, padding: '0px'}} fluid>
                <Row className={"row"} style={{height: '50%', width: '100%'}}>
                    <Col sm={4}>
                        <InstrumentSearch server={server}/>
                    </Col>
                    <Col style={{height:'100%'}} sm={8}>
                        <InstrumentResultTable/>
                    </Col>
                </Row>
                <Row className={"row"} style={{height: '50%', width: '100%'}}>
                    <Col>
                        <InstrumentSearch/>
                    </Col>
                </Row>
            </Container>
        </InstrumentSearchContext.Provider>
    );
};

export default InstrumentPage;