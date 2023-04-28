import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import InstrumentInfoGeneral from "./InstrumentInfoGeneral/InstrumentInfoGeneral";
import {useContext} from "react";

const InstrumentInfo = (props) => {
    const selectedInstrument = useContext(InstrumentSearchContext).selectedInstrument;
    return (
        <div style={{width: '100%'}}>
            <Card style={{height:'100%'}}>
                <Card.Header>
                    {selectedInstrument.name}
                </Card.Header>
                <Tabs style={{margin: '0px', padding: '10px'}}
                      defaultActiveKey="general"
                      className="mb-3"
                      fill
                >
                    <Tab eventKey="general" title="General" style={{margin: '5px'}}>
                        <InstrumentInfoGeneral/>
                    </Tab>
                    <Tab eventKey="fixed" title="Fixed Income">

                    </Tab>
                    <Tab eventKey="settings" title="Settings">

                    </Tab>
                </Tabs>
            </Card>
        </div>
    )
};
export default InstrumentInfo;