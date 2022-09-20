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
    const startDate = useContext(CalculationContext)['startDate'];
    const endDate = useContext(CalculationContext)['endDate'];
    const saveStartDate = useContext(CalculationContext)['saveStartDate'];
    const saveEndDate = useContext(CalculationContext)['saveEndDate'];
    const [processResponse, setProcessResponse] = useState('');

    const [processes, setProcesses] = useState([{'code': 'cash', 'name': 'Cash Holdings'},
        {'code': 'positions', 'name': 'Positions'},
        {'code': 'holding', 'name': 'Portfolio Holding'}]);
    const [loadingModalStatus, setLoadingModalStatus] = useState(false);
    const [modalFinishedState, setModalFinishedState] = useState(false);
    // let url = ''
    let params = {}
    // if (process === 'holding'){
    //     url = 'portfolios/holdings_calc/'
    //
    // };
    params = {
        portfolio_list: [selectedEntity[1]],
        start_date: startDate,
        end_date: endDate,
        process : '',
    };
    console.log(params)
    const entityChangeHandler = (event) => {
        saveEntity(event.target.value);
        if (event.target.value === 'Portfolio') {
            setProcesses([{'code': 'cash', 'name': 'Cash Holdings'},
                {'code': 'positions', 'name': 'Positions'},
                {'code': 'holding', 'name': 'Portfolio Holding'}]);
        } else {
            setProcesses([
                {'code': 'balance', 'name': 'Balance'}
            ]);
        };
    };
    const runCalculation = () => {
        setLoadingModalStatus(true);
        axios.get(props.server + 'calculate/portfolio/cash_holding/', {
            params: params
        })
            .then(function(response){
                setModalFinishedState(true);
                setProcessResponse(response['data']['response'])
                console.log(response['data'])
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
                {/*<Card.Title className="card-header-first">Calculation</Card.Title>*/}
                <Row>
                    <Col>
                        {selectedEntity[0]}
                    </Col>
                    <Col>
                        <Form.Group as={Row} className="form-group">
                            <Col className={'search-parameter'} sm={4}>
                                <Form.Label style={{textAlign: 'left'}}>Process</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control size="sm" as={'select'}>
                                    {processes.map((data) => <option value={data['code']}>{data['name']}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Row} className="form-group">
                            <Col className={'search-parameter'} sm={4}>
                                <Form.Label style={{textAlign: 'left'}}>Start Date</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control onChange={(e) => saveStartDate(e.target.value)} defaultValue={startDate}
                                              size="sm" type={'date'}/>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Row} className="form-group">
                            <Col className={'search-parameter'} sm={4}>
                                <Form.Label style={{textAlign: 'left'}}>End Date</Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control onChange={(e) => saveEndDate(e.target.value)} defaultValue={endDate}
                                              size="sm" type={'date'}/>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button onClick={runCalculation} variant="primary" type="submit">Calculate</Button>
                    </Col>
                </Row>
            </Card.Body>
            {/*<Card.Footer className="text-muted">*/}
            {/*    <Row>*/}
            {/*        <Col>*/}
            {/*            {selectedEntity[0]}*/}
            {/*        </Col>*/}
            {/*        <Col>*/}
            {/*            <Button onClick={runCalculation} variant="primary" type="submit">Calculate</Button>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</Card.Footer>*/}
            <ProcessIsLoadingModal show={loadingModalStatus} finishedState={modalFinishedState} hide={hideCalculationModal} response={processResponse}/>
        </Card>
    );
};
export default CalculationOptions;