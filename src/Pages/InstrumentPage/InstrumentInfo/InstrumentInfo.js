import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";

import InstrumentInfoGeneral from "./InstrumentInfoGeneral/InstrumentInfoGeneral";

const InstrumentInfo = (props) => {
    return (
        <div style={{width: '100%'}}>
            <Card style={{height:'100%'}}>
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