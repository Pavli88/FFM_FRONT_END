import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import OptionLoader from "../../../components/Options";
import axios from "axios";
import {useState} from "react";


const StrategyOptionsModal = (props) => {
    const [side, setSide] = useState(props.params['side']); //props.params['side']
    const [threshold, setThreshold] = useState(props.params['strategy_params']['threshold']); // props.params['strategy_params']['threshold']
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const strategy_params = {'side': side, 'strategy_params': {'threshold': parseFloat(threshold)}}

    const submitHandler = (event) => {
        event.preventDefault();

        axios.post(props.server + 'robots/update_strategy_params/', {
            robot: props.robot,
            strategy_params: strategy_params,
        })
                .then(response => console.log(response))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        setShow(false)
    };

    const sideHandler = (event) => {
        setSide(event.target.value);
    };

    const thresholdHandler = (event) => {
        setThreshold(event.target.value);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Options
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Strategy Parameters</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler} style={{width: '100%'}}>
                        <Form.Group>
                            <Form.Label>Side</Form.Label>
                            <Form.Control onChange={sideHandler} defaultValue={side} as="select">
                                <option value={'BUY'}>BUY</option>
                                <option value={'SELL'}>SELL</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Threshold</Form.Label>
                            <Form.Control onChange={thresholdHandler} type="number" placeholder={threshold}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitHandler}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

};

export default StrategyOptionsModal;