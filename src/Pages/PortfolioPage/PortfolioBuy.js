import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {useState} from "react";

import OptionLoader from "../../components/Options";

import axios from "axios";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PortfolioBuy = (props) => {

    const [show, setShow] = useState(false);
    const [securityId, setSecurity] = useState('');
    const [securityName, setSecurityName] = useState('');
    const [unit, setUnit] = useState(0.0);
    const [robotPrice, setRobotPrice] = useState(1.35);
    const [robotQuantity, setRobotQuantity] = useState(0.0);

    console.log(securityId)

    const instrumentParams = {
        'type': 'Robot',
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const securityHandler = (event) => {
        const selectIndex = event.nativeEvent.target.selectedIndex;

        setSecurity(event.target.value);
        setSecurityName(event.nativeEvent.target[selectIndex].text);
    };

    const unitHandler = (event) => {
        setUnit(event.target.value);
        setRobotQuantity(unit/robotPrice);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log('form submited')
        axios.post(props.server + 'portfolios/portfolio_trade/', {
            portfolio: props.portfolio,
            unit: robotQuantity,
            price: robotPrice,
            sec: securityName,
            sec_type: 'Robot',
            sec_id: securityId,
        })
                .then(response => alert(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        setShow(false);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Buy Robot
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Buy Robot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler} style={{width: '100%'}}>
                        <Form.Group>
                            <Form.Label>Portfolio</Form.Label>
                            <Form.Control type="text" placeholder={props.portfolio} value={props.portfolio} readOnly/>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Robot</Form.Label>
                                    <Form.Control onChange={securityHandler} as="select">
                                        <OptionLoader
                                            url={props.server + 'robots/get_robots/all'}
                                            params={instrumentParams}
                                            code={'id'}
                                            value={'name'}/>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <h2>{robotPrice}</h2>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Unit to invest</Form.Label>
                                    <Form.Control onChange={unitHandler} type="number" min={0.0}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Label>Portfolio Quantity</Form.Label>
                                <h2>{Math.round(robotQuantity*100)/100}</h2>
                            </Col>
                        </Row>
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

export default PortfolioBuy;