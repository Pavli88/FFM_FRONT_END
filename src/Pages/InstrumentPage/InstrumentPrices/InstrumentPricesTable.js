import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {useContext, useEffect, useRef, useState} from "react";

//Context
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";
import DateContext from "../../../context/date-context";
import axios from "axios";

//CSS
import "./InstrumentPricesTable.css"

import NewInstrumentPriceModal from "./NewInstrumentPriceModal";
import Button from "react-bootstrap/Button";

const InstrumentPricesTable = (props) => {
    const [priceData, setPriceData] = useState([]);
    const selectedInstrumentData = useContext(InstrumentSearchContext)['selectedInstrument'];
    const currentDate = useContext(DateContext)['currentDate'];
    const dateRef = useRef();
    const prices = priceData.map((data)=><tr key={data['id']}>
        <td className={'table-row'}>{data['price']}</td>
        <td className={'table-row'}>{data['date']}</td>
        <td className={'table-row'}>{data['source']}</td>
    </tr>);
    const dateHandler = () => {
        axios.get(props.server + 'instruments/get/prices/by_date', {
            params: {
                date: dateRef.current.value,
                instrument_id: selectedInstrumentData[0]['id'],
                source: selectedInstrumentData[0]['source'],
            }
        })
            .then(response => setPriceData(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    useEffect(() => {
        dateHandler();
    }, [props])

    return(
        <Card className="card main-layout">
            <Card.Title className="card-header-first">
                <Row>
                    <Col>
                        Prices
                    </Col>
                    <Col>
                        <Form.Control ref={dateRef} onChange={dateHandler} type="date" defaultValue={currentDate} required/>
                    </Col>
                    <Col>
                        <NewInstrumentPriceModal server={props.server}/>
                    </Col>
                    <Col>
                        <Button className={"operation-button"}>Delete</Button>
                    </Col>
                    <Col>
                        <Button className={"operation-button"}>Import</Button>
                    </Col>
                </Row>
            </Card.Title>
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                    <thead className="table-header-row">
                    <tr>
                        <td className="table-header-row">Price</td>
                        <td className="table-header-row">Date</td>
                        <td className="table-header-row">Source</td>
                    </tr>
                    </thead>
                    <tbody style={{height: '100%', overflow: 'scroll'}}>
                    {prices}
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};
export default InstrumentPricesTable;