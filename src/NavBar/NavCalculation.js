import Col from "react-bootstrap/Col";
import {Nav} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import {useContext} from "react";
import DateContext from "../context/date-context";
import EntityContext from "../context/entity-context";

const NavCalculation = () => {
    const startDate = useContext(DateContext)['startDate'];
    const endDate = useContext(DateContext)['endDate'];
    const setStartDate = useContext(DateContext)['saveStartDate'];
    const setEndDate = useContext(DateContext)['saveEndDate'];
    const saveEntity = useContext(EntityContext)['saveEntity'];

    return(
        <Row>
            <Col>
                <Nav.Link href="#" disabled>
                    From
                </Nav.Link>
            </Col>
            <Col>
                <FormControl
                    type="date"
                    className="me-2"
                    aria-label="Search"
                    defaultValue={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </Col>
            <Col>
                <Nav.Link href="#" disabled>
                    To
                </Nav.Link>
            </Col>
            <Col>
                <FormControl
                    type="date"
                    className="me-2"
                    aria-label="Search"
                    defaultValue={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </Col>
            <Col>
                <Dropdown onSelect={(entity) => saveEntity(entity)} style={{margin: '5px'}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Process
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="Portfolio">Portfolio</Dropdown.Item>
                        <Dropdown.Item eventKey="Robot">Robot</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col>
                <Dropdown onSelect={(entity) => saveEntity(entity)} style={{margin: '5px'}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Entity
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="Portfolio">Portfolio</Dropdown.Item>
                        <Dropdown.Item eventKey="Robot">Robot</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    );
};
export default NavCalculation;