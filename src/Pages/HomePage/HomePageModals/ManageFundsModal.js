import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";
import {useContext} from "react";

import DateContext from "../../../context/date-context";

const ManageFundsModal = (props) => {
    const currentDate = useContext(DateContext)['currentDate'];
    const submitHandler = (event) => {
        event.preventDefault();
        // axios.post(props.server + 'robots/create/robot/', {
        //     robot_name: robotNameRef.current.value,
        //     env: environmentRef.current.value,
        //     currency: currencyRef.current.value,
        //     inception_date: inceptionDate,
        // })
        //     .then(response => alert(response['data']))
        //     .catch((error) => {
        //         console.error('Error Message:', error);
        //     });
        // saveNewRobot(robotCodeRef.current.value);
        props.hide();
    };
    return(
        <Modal show={props.show} onHide={() => props.hide()} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Manage Funds</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler} style={{width: '100%'}}>
                    <Form.Group>
                        <Form.Label>Transaction Type</Form.Label>
                        <Form.Control as="select">
                            <option value={'live'}>Deposit</option>
                            <option value={'demo'}>Withdraw</option>
                            <option value={'demo'}>Transfer</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Transaction Date</Form.Label>
                        <Form.Control type="date"
                                      defaultValue={currentDate}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.hide()}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitHandler}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
};
export default ManageFundsModal;