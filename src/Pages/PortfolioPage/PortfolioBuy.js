import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";

import OptionLoader from "../../components/Options";
import GetRobotPrice from "../Robot/GetRobotPrice";

import axios from "axios";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const PortfolioBuy = (props) => {

    const [show, setShow] = useState(false);
    const [securityId, setSecurity] = useState('');
    const [securityName, setSecurityName] = useState('');
    const [unit, setUnit] = useState(0.0);
    const [robotPrice, setRobotPrice] = useState(0.0);
    const [robotQuantity, setRobotQuantity] = useState(0.0);

    const instrumentParams = {
        'env': props.env,
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const securityHandler = (event) => {
        const selectIndex = event.nativeEvent.target.selectedIndex;

        setSecurity(event.target.value);
        setSecurityName(event.nativeEvent.target[selectIndex].text);
        document.getElementById('unitInput').value = 0;
        setRobotQuantity(0);
        setUnit(0);
    };

    const unitHandler = (event) => {
        setRobotQuantity(unit/robotPrice);
        setUnit(event.target.value);

    };

    const getRobotPrice = (price) => {
        setRobotPrice(price);
        setRobotQuantity(unit/robotPrice);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (robotQuantity===0.0){
            alert('Quantity can not be 0 !')
        }else{
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
                                        <option></option>
                                        <OptionLoader
                                            url={props.server + 'robots/get_robots_with_instrument/'}
                                            params={instrumentParams}
                                            code={1}
                                            value={2}/>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <GetRobotPrice server={props.server} robot={securityName} getPrice={getRobotPrice}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Unit to invest</Form.Label>
                                    <Form.Control onChange={unitHandler} type="number" min={0.0}
                                                  defaultValue={0} id={'unitInput'}/>
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