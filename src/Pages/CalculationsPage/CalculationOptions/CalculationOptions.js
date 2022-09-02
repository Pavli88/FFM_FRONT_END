import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'

// Context
import CalculationContext from "../CalculationPageContext/calculation-context";
import DateContext from "../../../context/date-context";

import ProcessIsLoadingModal from "../../../components/ProcessIsLoadingModal";

import {useContext, useRef, useState} from "react";
import axios from "axios";

const CalculationOptions = (props) => {
    const saveEntity = useContext(CalculationContext)['saveEntity'];
    const selectedEntity = useContext(CalculationContext)['selectedEntity'];
    const currentDate = useContext(CalculationContext)['currentDate'];
    const saveDate = useContext(CalculationContext)['saveCalcDate'];
    const [process, setProcess] = useState('cash');
    const [loadingModalStatus, setLoadingModalStatus] = useState(false);
    const [modalFinishedState, setModalFinishedState] = useState(false);

    let url = ''
    let params = {}
    console.log(currentDate)
    if (process === 'holding'){
        url = 'portfolios/holdings_calc/'

    };
    params = {
            portfolio_code: selectedEntity[1],
            calculation_date: currentDate,
        };
    const runCalculation = () => {
        setLoadingModalStatus(true);
        axios.post(props.server + 'portfolios/holdings_calc/', params)
            .then(function(response){
                setModalFinishedState(true);
            })
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    const hideCalculationModal = () => {
        setLoadingModalStatus(false);
        setModalFinishedState(false);
    };
    return(
        <Card className="card main-layout">
            <Card.Body>
            <Card.Title className="card-header-first">Calculation</Card.Title>
            <Form>
                <Form.Group as={Row} className="form-group">
                    <Col className={'search-parameter'} sm={4}>
                        <Form.Label style={{textAlign: 'left'}}>Calculation Entity</Form.Label>
                    </Col>
                    <Col sm={8}>
                        <Form.Control onChange={(e)=>saveEntity(e.target.value)} size="sm" as={'select'}>
                            <option value={'Portfolio'}>Portfolio</option>
                            <option value={'Robot'}>Robot</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                    <Col className={'search-parameter'} sm={4}>
                        <Form.Label style={{textAlign: 'left'}}>Process</Form.Label>
                    </Col>
                    <Col sm={8}>
                        <Form.Control onChange={(e) => setProcess(e.target.value)} size="sm" as={'select'}>
                            <option value={'cash'}>Cash Holding</option>
                            <option value={'positions'}>Positions</option>
                            <option value={'holding'}>Portfolio Holding</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                    <Col className={'search-parameter'} sm={4}>
                        <Form.Label style={{textAlign: 'left'}}>Start Date</Form.Label>
                    </Col>
                    <Col sm={8}>
                        <Form.Control onChange={(e) => saveDate(e.target.value)} defaultValue={currentDate} size="sm" type={'date'}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="form-group">
                    <Col className={'search-parameter'} sm={4}>
                        <Form.Label style={{textAlign: 'left'}}>End Date</Form.Label>
                    </Col>
                    <Col sm={8}>
                        <Form.Control onChange={(e) => saveDate(e.target.value)} defaultValue={currentDate} size="sm" type={'date'}/>
                    </Col>
                </Form.Group>
            </Form>
                </Card.Body>
            <Card.Footer className="text-muted">
                <Row>
                    <Col>
                        {selectedEntity[0]}
                    </Col>
                    <Col>
                        <Button onClick={runCalculation} variant="primary" type="submit">Calculate</Button>
                    </Col>
                </Row>
            </Card.Footer>
            <ProcessIsLoadingModal show={loadingModalStatus} finishedState={modalFinishedState} hide={hideCalculationModal}/>
        </Card>
    );
};
export default CalculationOptions;