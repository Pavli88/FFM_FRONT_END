import {useState} from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

const PositionCalculation = (props) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const [startDate, setStartDate] = useState(firstDay.toISOString().substr(0,10));
    const [endDate, setEndDate] = useState(date.toISOString().substr(0,10));
    const [response, setResponse] = useState([]);
    const [portfolio, setPortfolio] = useState(props.portfolio);
    const treeData = response.map(function (data, index) {

        return <TreeItem nodeId={index.toString()} label={data['portfolio']}>
            {data['response'].map((item, index2) => <TreeItem nodeId={index.toString() + index2.toString()}
                                                              label={item['date']}>
                {item['msgs'].map(item2 => <TreeItem
                    label={item2['msg']}></TreeItem>)}
            </TreeItem>)}
        </TreeItem>
    });
    const startDateHandler = (event) => {
        setStartDate(event.target.value);
    };

    const endDateHandler = (event) => {
        setEndDate(event.target.value);
    };

    const handleClose = () => {
        props.hide();
    };
    const changePortfolio = (event) => {
        if (event.target.checked){
            setPortfolio('ALL');
        }else {
            setPortfolio(props.portfolio);
        };
    };
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'portfolios/positions/', {
            portfolio: portfolio,
            start_date: startDate,
            end_date: endDate,
        })
            .then(response => setResponse(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    return (
        <Modal show={props.show} onHide={handleClose} size={'xl'}>
            <Modal.Header closeButton>
                <Modal.Title>Portfolio Position Calculation - {portfolio}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{height: '300px'}}>
                <Row style={{height: '100%'}}>
                    <Col style={{height: '100%'}}>
                        <Form onSubmit={submitHandler} style={{width: '100%', height: '100%'}}>
                            <Row style={{height: '60px', width: '100%', padding: '5px', margin: '5px'}}>
                                <Row style={{width: '100%', margin: '0px'}}>
                                    <Form.Group style={{width: '100%', margin: '0px'}}>
                                        <Form.Label className="form-label-first" column sm={2}>
                                            From
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control type="date" onChange={startDateHandler}
                                                          defaultValue={firstDay.toISOString().substr(0, 10)}/>
                                        </Col>
                                    </Form.Group>
                                </Row>
                                <Row style={{width: '100%', margin: '0px'}}>
                                    <Form.Group style={{width: '100%'}}>
                                        <Form.Label className="form-label-first" column sm={2}>
                                            To
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control type="date" onChange={endDateHandler}
                                                          defaultValue={date.toISOString().substr(0, 10)}/>
                                        </Col>
                                    </Form.Group>
                                </Row>
                            </Row>
                        </Form>
                    </Col>
                    <Col style={{height: '100%'}}>
                        <TreeView
                            aria-label="file system navigator"
                            defaultCollapseIcon={<ExpandMoreIcon/>}
                            defaultExpandIcon={<ChevronRightIcon/>}
                            sx={{height: '100%', flexGrow: 1, maxWidth: '100%', overflowY: 'auto',}}
                        >
                            {treeData}
                        </TreeView>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer style={{width: '100%', margin: '0px'}}>
                <Row style={{width: '100%', margin: '0px'}}>
                    <Col>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check onClick={changePortfolio} type="checkbox" label="All Portfolios"/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check onClick={changePortfolio} type="checkbox" label="Since Inception"/>
                                </Form.Group>
                            </Col>
                        </Row>

                    </Col>
                    <Col>
                        <Form.Group style={{width: '100%'}}>
                            <Col sm={10}>
                                <Button variant="primary" onClick={submitHandler} style={{width: '100%'}}>
                                    Calculate
                                </Button>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    );
};

export default PositionCalculation;