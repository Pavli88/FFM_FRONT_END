import CardWithHeader from "../../../../../Widgets/Charts/CardWithHeader";
import {Nav} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
const PortfolioOwnershipSettings = () => {
    const header = <p>Ownership</p>
    return(
        <CardWithHeader headerContent={header}>
            <div style={{display:'flex', padding: '5px', width: '100%', height: '50px'}}>
                <div style={{paddingLeft: '5px'}}>
                    <Nav.Link href="#" disabled>
                        Owner
                    </Nav.Link>
                </div>
                <div>
                    <FormControl
                        size="sm"
                        className="me-2"
                        aria-label="Search"
                        style={{height: '100%'}}
                    />
                </div>
            </div>

            <div style={{display:'flex', padding: '5px', width: '100%', height: '50px'}}>
                <div style={{paddingLeft: '5px'}}>
                    <Nav.Link href="#" disabled>
                        Manager
                    </Nav.Link>
                </div>
                <div>
                    <FormControl
                        size="sm"
                        className="me-2"
                        aria-label="Search"
                        style={{height: '100%'}}
                    />
                </div>
            </div>

            <div style={{display:'flex', padding: '5px', width: '100%', height: '50px'}}>
                <div style={{paddingLeft: '5px'}}>
                    <Nav.Link href="#" disabled>
                        Public
                    </Nav.Link>
                </div>
                <div>
                    <FormControl
                        size="sm"
                        className="me-2"
                        aria-label="Search"
                        style={{height: '100%'}}
                    />
                </div>
            </div>
        </CardWithHeader>
    )
};
export default PortfolioOwnershipSettings;