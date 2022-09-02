import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

//Context
import InstrumentSearchContext from "./InstrumentPageContext/instrument-search-context";
import {useContext, useRef, useState} from "react";
import axios from "axios";

import InstrumentDetailsGeneral from "./InstrumentDetailsGeneral";
import InstrumentPrices from "./InstrumentPrices/InstrumentPrices";
import InstrumentSettings from "./InstrumentSettings/InstrumentSettings";

//CSS
import "./InstrumentDetails.css"

const InstrumentDetails = (props) => {
    return (
        <Card className="card main-layout">
            <Tabs style={{width: '100%', margin: '0px', padding: '10px'}}
                  defaultActiveKey="general"
                  id="fill-tab-example"
                  className="mb-3"
                  fill
            >
                <Tab eventKey="general" title="General" style={{ margin: '5px'}}>
                    <InstrumentDetailsGeneral data={props.data}/>
                </Tab>
                <Tab eventKey="fixed" title="Fixed Income">

                </Tab>
                <Tab eventKey="settings" title="Settings">
                    <InstrumentSettings data={props.data}/>
                </Tab>
                <Tab className={"tab-body"} eventKey="prices" title="Prices">
                    <InstrumentPrices data={props.data}/>
                </Tab>
            </Tabs>
        </Card>
    );
};
export default InstrumentDetails;