import {useState} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SliderWidget = (props) => {

    const [value, setValue] = useState(props.defaultValue);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (

        <Form>
            <Form.Group style={{margin: '0px'}}>
                <Row>
                    <Col>
                        <Form.Label style={{verticalAlign:"middle"}}>{value}</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control onChange={handleChange} type="range" min={props.min} max={props.max} step={props.step}
                              value={value}/>
                    </Col>
                </Row>
            </Form.Group>
        </Form>

    );
};

export default SliderWidget;