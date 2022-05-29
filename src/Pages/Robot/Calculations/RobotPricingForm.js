import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useState} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import DateContext from "../../../context/date-context";
const RobotPricingForm = (props) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const [startDate, setStartDate] = useState(firstDay.toISOString().substr(0,10));
    const [endDate, setEndDate] = useState(date.toISOString().substr(0,10));
    const [robot, setRobot] = useState(props.robot);
    const [response, setResponse] = useState([]);
    const treeData = response.map(function (data, index) {
        let treeNodes = data['response'].map(item => <TreeItem label={item['date'] + " " + item['msg']}></TreeItem>);
        return <TreeItem nodeId={index.toString()} label={data['robot']}>
            {treeNodes}
        </TreeItem>
    });
    const handleClose = () => {
        props.hide();
        setRobot(props.robot)
    };

    const startDateHandler = (event) => {
        setStartDate(event.target.value);
    };

    const endDateHandler = (event) => {
        setEndDate(event.target.value);
    };

    const changeRobot = (event) => {
        if (event.target.checked){
            setRobot('ALL');
        }else {
            setRobot(props.robot);
        };
        console.log(event.target.checked)
    };

    const submitHandler = (event) => {
        event.preventDefault();

        axios.post(props.server + 'robots/pricing/', {
            robot: robot,
            start_date: startDate,
            end_date: endDate,
        })
                .then(response => setResponse(response['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        // props.hide();
    };

    return (
        <Modal show={props.show} onHide={handleClose} animation={false} size={'xl'}>
            <Modal.Header closeButton>
                <Modal.Title>Pricing - {robot}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row style={{height:'100%'}}>
                    <Col style={{height:'100%'}}>
                        <Form onSubmit={submitHandler} style={{width: '100%', height:'100%'}}>
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
                    <Col style={{height:'100%'}}>
                        <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpandIcon={<ChevronRightIcon/>}
                    sx={{height: 200, flexGrow: 1, maxWidth: '100%', overflowY: 'auto'}}
                >
                    {treeData}
                </TreeView>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Row style={{width: '100%', margin: '0px'}}>
                    <Col>
                         <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check onClick={changeRobot} type="checkbox" label="All Robots"/>
                    </Form.Group>
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

export default RobotPricingForm;