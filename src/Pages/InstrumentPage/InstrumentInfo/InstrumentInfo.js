import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";

import InstrumentInfoGeneral from "./InstrumentInfoGeneral/InstrumentInfoGeneral";

const InstrumentInfo = (props) => {
    return(
        <Card className="card main-layout">
            <Tabs style={{margin: '0px', padding: '10px'}}
                  defaultActiveKey="general"
                  className="mb-3"
                  fill
            >
                <Tab eventKey="general" title="General" style={{ margin: '5px'}}>
                    <InstrumentInfoGeneral/>
                </Tab>
                <Tab eventKey="fixed" title="Fixed Income">

                </Tab>
                <Tab eventKey="settings" title="Settings">

                </Tab>
                <Tab className={"tab-body"} eventKey="prices" title="Prices">

                </Tab>
            </Tabs>
        </Card>
    )
};
export default InstrumentInfo;