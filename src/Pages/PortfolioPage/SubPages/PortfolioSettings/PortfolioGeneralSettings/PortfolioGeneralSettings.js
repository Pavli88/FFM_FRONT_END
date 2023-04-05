import CardWithHeader from "../../../../../Widgets/Charts/CardWithHeader";
import {Nav} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";

const PortfolioGeneralSettings = () => {
    const header = <p>General</p>
    return(
        <CardWithHeader headerContent={header}>
            <div style={{display:'flex', padding: '5px', width: '100%', height: '100%'}}>
                <div style={{paddingLeft: '5px'}}>
                    <Nav.Link href="#" disabled>
                        Name
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
            <div style={{display:'flex', padding: '5px', width: '100%', height: '100%'}}>
                <div style={{paddingLeft: '5px'}}>
                    <Nav.Link href="#" disabled>
                        Code
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
            <div style={{display:'flex', padding: '5px', width: '100%', height: '100%'}}>
                <div style={{paddingLeft: '5px'}}>
                    <Nav.Link href="#" disabled>
                        Base Currency
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
            <div style={{display:'flex', padding: '5px', width: '100%', height: '100%'}}>
                <div style={{paddingLeft: '5px'}}>
                    <Nav.Link href="#" disabled>
                        Type
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

            <div style={{display:'flex', padding: '5px', width: '100%', height: '100%'}}>
                <div style={{paddingLeft: '5px'}}>
                    <Nav.Link href="#" disabled>
                        Status
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

            <div style={{display:'flex', padding: '5px', width: '100%', height: '100%'}}>
                <div style={{paddingLeft: '5px'}}>
                    <Nav.Link href="#" disabled>
                        Robot Trading
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

            <div style={{display:'flex', padding: '5px', width: '100%', height: '100%'}}>
                <div style={{paddingLeft: '5px'}}>
                    <Nav.Link href="#" disabled>
                        Multi Currency
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
export default PortfolioGeneralSettings;