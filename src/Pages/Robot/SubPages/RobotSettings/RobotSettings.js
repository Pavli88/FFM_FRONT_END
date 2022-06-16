import CardWidget from "../../../../components/CardWidget";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useState} from "react";

const RobotSettings = (props) => {
    const [status, setStatus] = useState();
    const submitForm = (event) => {
        event.preventDefault();
        axios.post(props.server + 'robots/update_status/', {
            robot: props.robot,
            status: status,
        })
            .then(response => alert('Risk is updated for ' + props.robot))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    return (
        <CardWidget title={'Settings'} style={{margin:'5px'}}>
            <Form>
                <Form.Group className="mb-3" controlId="quantity_type">
                    <Form.Label>Status</Form.Label>
                    <Form.Control onChange={(e) => setStatus(e.target.value)} defaultValue={'active'} as="select">
                        <option value={'active'}>Active</option>
                        <option value={'inactive'}>Inactive</option>
                    </Form.Control>
                </Form.Group>
                <Button onClick={submitForm} variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </CardWidget>
    );
};

export default RobotSettings