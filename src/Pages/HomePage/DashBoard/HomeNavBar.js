import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Dropdown from "react-bootstrap/Dropdown";
import {Nav} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const HomeNavBar = (props) => {
    return (
        <Card style={{height: '50px', paddingTop: '0px', margin: '0px'}}>
            <Row style={{height:'100%', padding:'5px'}}>
                <Col style={{padding: '0px', height: '100%'}}>
                    <Row style={{padding: '0px', width: '100%', height: '100%'}}>
                        <Col md="auto" style={{paddingLeft: '5px'}}>
                            <Nav.Link href="#" disabled>
                                Period Start
                            </Nav.Link>
                        </Col>
                        <Col md="auto">
                            <FormControl
                                type="date"
                                size="sm"
                                className="me-2"
                                aria-label="Search"
                                // defaultValue={startDate}
                                // onChange={(e) => setStartDate(e.target.value)}
                                style={{height: '100%'}}
                            />
                        </Col>
                        <Col md="auto" style={{paddingLeft: '5px'}}>
                            <Nav.Link href="#" disabled>
                                Strategy
                            </Nav.Link>
                        </Col>
                        <Col md="auto">
                            <Form.Control as="select">
                                <option value={'live'}>All</option>
                            </Form.Control>
                        </Col>
                    </Row>
                </Col>
                <Col style={{padding: '0px'}}>
                    <Row style={{padding: '0px', width: '100%'}}>
                        <Col>
                            {/*<Button onClick={() => setNewRobot(true)}>New Robot</Button>*/}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
};
export default HomeNavBar;