import RobotTrades from "./RobotTrades";
import RobotTransactionsTable from "./RobotTransactionsTable";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {useEffect, useState} from "react";
import axios from "axios";

const RobotTransactionsPage = (props) => {
    const [transactionData, setTransactionData] = useState([]);
    const pnlData = transactionData.map(data => data['pnl'])

    useEffect(() => {
            axios.get(props.server + 'robots/trades/', {
                params: {
                    robot: props.robot,
                    start_date: props.start_date,
                    end_date: props.end_date
                }
            })
                .then(data => setTransactionData(data['data']))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [props]
    );

    return (
        <Row style={{width: '100%', height:'100%', margin:'0px'}}>
            <Row style={{width: '100%', height: '400px', margin:'0px'}}>
                <RobotTrades data={pnlData}/>
            </Row>
            <Row style={{width: '100%', height: '400px', margin:'0px'}}>
                <RobotTransactionsTable data={transactionData}/>
            </Row>
        </Row>
    );
};

export default RobotTransactionsPage;