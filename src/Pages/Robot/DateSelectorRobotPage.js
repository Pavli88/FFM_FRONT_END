import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import DateContext from "../../context/date-context";
import {useContext} from "react";

const DateSelectorRobotPage = (props) => {
    const startDate = useContext(DateContext)['startDate']
    const endDate = useContext(DateContext)['endDate']
    const setStartDate = useContext(DateContext)['saveStartDate']
    const setEndDate = useContext(DateContext)['saveEndDate']
    const startDateHandler = (event) => {
        setStartDate(event.target.value);
    };
    const endDateHandler = (event) => {
        if (event.target.value < startDate) {
            alert('End date can not be less then start date!');
        }else {
            setEndDate(event.target.value);
        };
    };
    return (
        <Row style={{height: '60px', width: '100%', padding: '5px', margin: '0px'}}>
            <Col style={{height: '100%', width: '50%'}}>
                <Form.Group as={Row}>
                    <Form.Label size="sm" column sm={2}>
                        From
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control size="sm" type="date" onChange={startDateHandler} defaultValue={startDate}/>
                    </Col>
                </Form.Group>
            </Col>
            <Col style={{height: '100%', width: '50%'}}>
                <Form.Group as={Row}>
                    <Form.Label className="form-label-first" column sm={2}>
                        To
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control size="sm" type="date" onChange={endDateHandler} defaultValue={endDate}/>
                    </Col>
                </Form.Group>
            </Col>
        </Row>
    );
};

export default DateSelectorRobotPage;