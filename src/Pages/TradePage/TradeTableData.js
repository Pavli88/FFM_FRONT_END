import axios from "axios";
import {useContext, useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import {Nav} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { BiX } from 'react-icons/bi';
import EnvContext from "../../context/env-context";


const RobotTradesCard = (props) => {
    const [isActive, setIsActive] = useState(false);
    const CloseTrade = (brokerId, robotId, tradeId) => {
        axios.post(props.server + 'trade_page/close_trade/', {
            broker_id: brokerId,
            robot: robotId,
            trd_id: tradeId,
        })
            .then(response => {
                alert(response['data'])
                // saveLastTrade(lastTrade + 1);
            })
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const tradeDataRow = props.data['trades'].map((record)=>
        <tr key={record['id']} style={{height:'40px'}}>
            <td style={{fontSize: '12px', verticalAlign:"middle", height:'40px'}}>{record['id']}</td>
            <td style={{fontSize: 12, verticalAlign:"middle", height:'40px'}}>{record['broker']}</td>
            <td style={{fontSize: 12, verticalAlign:"middle", height:'40px'}}>{record['broker_id']}</td>
            <td style={{fontSize: 12, verticalAlign:"middle", height:'40px'}}>{record['security']}</td>
            <td style={{fontSize: 12, verticalAlign:"middle", height:'40px'}}>{record['quantity']}</td>
            <td style={{fontSize: 12, verticalAlign:"middle", height:'40px'}}>{record['open_price']}</td>
            <td style={{padding: '0px', paddingTop:'4px'}}><Button onClick={() => CloseTrade(record['broker_id'], record['robot'], record['id'])} style={{background:'lightgrey', border:"none"}} size="sm"><BiX style={{color:'black'}}/></Button></td>
        </tr>)

    const trades =
        <div style={{paddingTop:"5px", paddingBottom: '5px'}}>
            <Card style={{width: '100%'}}>
                <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '100%'}}>
                    <Table>
                        <thead>
                        <tr>
                            <th style={{verticalAlign: "middle"}}>Platform ID</th>
                            <th style={{verticalAlign: "middle"}}>Broker</th>
                            <th style={{verticalAlign: "middle"}}>Broker ID</th>
                            <th style={{verticalAlign: "middle"}}>Security</th>
                            <th style={{verticalAlign: "middle"}}>Quantity</th>
                            <th style={{verticalAlign: "middle"}}>Price</th>
                            <th style={{verticalAlign: "middle"}}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {tradeDataRow}
                        </tbody>
                    </Table>
                </div>
            </Card>
        </div>

    return (
        <div>
            <Card style={{height: '40px'}} onClick={() => isActive === false ? setIsActive(true) : setIsActive(false)}>
                <Row style={{padding:'0px'}}>
                    <Col md="auto" style={{paddingLeft: '15px'}}>
                        <p style={{color: "#343632", height:'100%', margin:'auto', paddingTop:'10px', fontSize: '12px'}}>Robot</p>
                    </Col>
                    <Col md="auto" style={{height:'100%', paddingLeft: '5px', width:'180px'}} >
                        <p style={{color:"#6d7069", height:'100%', margin:'auto', paddingTop:'10px', fontSize: '12px'}}>{props.data['robot_name']}</p>
                    </Col>
                    <Col md="auto" style={{paddingLeft: '5px'}}>
                        <p style={{color:"#343632", height:'100%', margin:'auto', paddingTop:'10px', fontSize: '12px'}}>Market</p>
                    </Col>
                    <Col md="auto" style={{paddingLeft: '5px', width:'180px'}}>
                        <p style={{color:"#6d7069", height:'100%', margin:'auto', paddingTop:'10px', fontSize: '12px'}}>{props.data['market']}</p>
                    </Col>
                    <Col md="auto" style={{paddingLeft: '5px'}}>
                        <p style={{color:"#343632", height:'100%', margin:'auto', paddingTop:'10px', fontSize: '12px'}}>Total Positions</p>
                    </Col>
                    <Col md="auto" style={{paddingLeft: '5px', width:'80px'}}>
                        <p style={{color:"#6d7069", height:'100%', margin:'auto', paddingTop:'10px', fontSize: '12px'}}>{props.data['total_positions']}</p>
                    </Col>
                    <Col md="auto" style={{paddingLeft: '5px'}}>
                        <p style={{color:"#343632", height:'100%', margin:'auto', paddingTop:'10px', fontSize: '12px'}}>Total Units</p>
                    </Col>
                    <Col md="auto" style={{paddingLeft: '5px', width:'80px'}}>
                        <p style={{color:"#6d7069", height:'100%', margin:'auto', paddingTop:'10px', fontSize: '12px'}}>{props.data['total_units']}</p>
                    </Col>
                    <Col md="auto" style={{paddingLeft: '5px', width:'80px'}}>
                        <p style={{color:"#343632", height:'100%', margin:'auto', paddingTop:'10px', fontSize: '12px'}}>Avg. Price</p>
                    </Col>
                    <Col md="auto" style={{paddingLeft: '5px', width:'80px'}}>
                        <p style={{color:"#6d7069", height:'100%', margin:'auto', paddingTop:'10px', fontSize: '12px'}}>{props.data['average_price']}</p>
                    </Col>
                    <Col style={{paddingTop:'4px'}}>
                        <Button variant="danger" style={{paddingTop:'2px', position: 'absolute', right: 5}} size="sm"><BiX style={{color:'white', fontSize:'16px'}}/></Button>
                    </Col>
                </Row>
            </Card>
            {isActive ? trades: null}
        </div>
    )
};

const TradeTableData = (props) => {
    const environment = useContext(EnvContext)['environment']
    const [responseData, setResponseData] = useState(<></>)
    const [lastTrade, setLastTrade] = useState(0);

    useEffect(() => {
            axios.get(props.server + 'trade_page/get/open_trades/' + environment)
                .then(response => response['data'].map((data) => <RobotTradesCard server={props.server} data={data}/>))
                .then(data => setResponseData(data))
                .catch((error) => {
                    console.error('Error Message:', error);
                });
        }, [,lastTrade]
    );

    return (
        <>
            {responseData}
        </>

    );
};

export default TradeTableData;