import {Card} from "react-bootstrap";
import DateSelectorRobotPage from "../DateSelectorRobotPage";
import {useContext, useState} from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";
import DateContext from "../../../context/date-context";

const RobotBalanceCalculation = (props) => {
    const startDate = useContext(DateContext)['startDate']
    const endDate = useContext(DateContext)['endDate']
    const [loadState, setLoadState] = useState(false);
    const handleClose = () => {
        props.hide();
    };
    const submitHandler = (event) => {
        event.preventDefault();

        setLoadState(true);

        axios.post(props.server + 'robots/calculate_robot_balance/', {
            process: 'Balance',
            robot: props.robot,
            start_date: startDate,
            end_date: endDate,
        })
            .then(response => setLoadState(false))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    return (
        <Modal show={props.show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Balance - {props.robot}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width: '100%', height: '100px'}}>
                <DateSelectorRobotPage>
                    {/*<h2>Calculating ...</h2>*/}
                </DateSelectorRobotPage>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={submitHandler}>
                    Calculate
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RobotBalanceCalculation;