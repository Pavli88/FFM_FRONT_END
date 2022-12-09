import RobotTrades from "./RobotTrades";
import RobotTransactionsTable from "./RobotTransactionsTable";
import DateSelectorRobotPage from "../../DateSelectorRobotPage";
import RobotTradesStatistics from "./RobotTradesStatistics";
import RobotTradesQuantiy from "./RobotTradesQuantity";

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import DateContext from "../../../../context/date-context";

// Context
import RobotContext from "../../../../context/robot-context";

const RobotTransactionsPage = (props) => {
    const [transactionData, setTransactionData] = useState([]);
    const pnlData = transactionData.map(data => data['pnl'])
    const quantityData = transactionData.map(data => data['quantity'])
    const startDate = useContext(DateContext)['startDate'];
    const endDate = useContext(DateContext)['endDate'];
    useEffect(() => {
            axios.get(props.server + 'robots/get/transactions/', {
                params: {
                    robot_id: props.robotData['id'],
                    start_date: startDate,
                    end_date: endDate,
                }
            })
                .then(data => setTransactionData(data['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );
    return (
        <Container fluid>
            <Row style={{width: '100%', height: '800px', margin: '0px', padding: '0px'}}>
                <Col style={{margin: '0px', width: '50%', padding: '0px'}}>
                    <Row style={{height: '100%', width: '100%', margin: '0px'}}>
                        <Row style={{height: '50%', width: '100%', padding: '5px', margin: '0px'}}>
                            <RobotTrades data={pnlData}/>
                        </Row>
                        <Row style={{height: '50%', width: '100%', padding: '5px', margin: '0px'}}>
                            <RobotTradesQuantiy data={quantityData}/>
                        </Row>
                    </Row>
                </Col>
                <Col style={{margin: '0px', width: '50%', height: '100%', padding: '0px'}}>
                    <Row style={{height: '100%', width: '100%', padding: '5px', margin: '0px'}}>
                        <RobotTransactionsTable server={props.server} data={transactionData}/>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default RobotTransactionsPage;