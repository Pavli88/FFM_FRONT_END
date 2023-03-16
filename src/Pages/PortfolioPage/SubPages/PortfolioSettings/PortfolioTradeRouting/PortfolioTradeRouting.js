import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import {BiX} from "react-icons/bi";
import {useState} from "react";
import Table from "react-bootstrap/Table";

const PortfolioSecTradeParams = (props) => {
    const [isActive, setIsActive] = useState(false);
    console.log(props.data)
    const parameters = props.data.map((record)=>
        <tr key={record['id']} style={{height:'40px'}}>
            <td style={{fontSize: '12px', verticalAlign:"middle", height:'40px'}}>{record['sec']}</td>
            <td style={{fontSize: 12, verticalAlign:"middle", height:'40px'}}>100</td>
            <td style={{fontSize: 12, verticalAlign:"middle", height:'40px'}}>AAPL</td>
            {/*<td style={{padding: '0px', paddingTop:'4px'}}><Button onClick={() => CloseTrade(record['broker_id'], record['robot'], record['id'])} style={{background:'lightgrey', border:"none"}} size="sm"><BiX style={{color:'black'}}/></Button></td>*/}
        </tr>)

    const security =
        <div style={{paddingTop:"5px", paddingBottom: '5px'}}>
            <Card style={{width: '100%'}}>
                <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '100%'}}>
                    <Table>
                        <thead>
                        <tr>
                            <th style={{verticalAlign: "middle"}}>Broker</th>
                            <th style={{verticalAlign: "middle"}}>Account Number</th>
                            <th style={{verticalAlign: "middle"}}>Ticker</th>
                        </tr>
                        </thead>
                        <tbody>
                        {parameters}
                        </tbody>
                    </Table>
                </div>
            </Card>
        </div>

    return(
        <div>
            <Card style={{height: '40px'}} onClick={() => isActive === false ? setIsActive(true) : setIsActive(false)}>
                <Row style={{padding:'0px'}}>
                    <Col md="auto" style={{paddingLeft: '15px'}}>
                        <p style={{color: "#343632", height:'100%', margin:'auto', paddingTop:'10px', fontSize: '12px'}}>Instrument</p>
                    </Col>
                    <Col md="auto" style={{height:'100%', paddingLeft: '5px', width:'180px'}} >
                        <p style={{color:"#6d7069", height:'100%', margin:'auto', paddingTop:'10px', fontSize: '12px'}}>Test Security</p>
                    </Col>
                </Row>
            </Card>
            {isActive ? security: null}
        </div>
    )
};
export default PortfolioSecTradeParams;