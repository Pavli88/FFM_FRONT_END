import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import {useState} from "react";

const Holdings = () => {
    const date = new Date();
    const [startDate, setStartDate] = useState(date.toISOString().substr(0,10));
    const startDateHandler = (event) => {
        setStartDate(event.target.value);
    };
    return (
        <Card className="card">
            <Row>
                <Col>
                    <Card.Title className="card-header-first">Holdings</Card.Title>
                </Col>
                <Col>
                    <Form.Group as={Row} style={{margin:'0px', padding:'5px'}}>
                        <Form.Label className="form-label-first" column sm={2}>
                            Date
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="date" onChange={startDateHandler}
                                          defaultValue={date.toISOString().substr(0,10)}/>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                    <thead className="table-header-first">
                    <tr>
                        <td className="table-header-row">Starting Quantity</td>
                        <td className="table-header-row">Price</td>
                        <td className="table-header-row">Market Value</td>
                        <td className="table-header-row">Trade Date</td>
                        <td className="table-header-row">Instrument</td>
                        <td className="table-header-row">Instrument Type</td>
                        <td className="table-header-row">Source</td>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </Table>
            </div>
        </Card>
    );
};

export default Holdings;