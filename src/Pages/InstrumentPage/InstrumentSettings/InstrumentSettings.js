import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

//Contexts
import ServerContext from "../../../context/server-context";
import InstrumentSearchContext from "../InstrumentPageContext/instrument-search-context";

import axios from "axios";
import {useContext, useEffect, useState} from "react";

import NewInstrumentTickerModal from "./NewInstrumentTickerModal";

const InstrumentSettings = (props) => {
    const server = useContext(ServerContext)['server'];
    const selectedInstrumentData = useContext(InstrumentSearchContext)['selectedInstrument'];
    const [tickerData, setTickerData] = useState([]);
    const tickers = tickerData.map((data)=><tr key={data['id']}>
        <td className={'table-row'}>{data['internal_ticker']}</td>
        <td className={'table-row'}>{data['source']}</td>
        <td className={'table-row'}>{data['source_ticker']}</td>
    </tr>);
    const dateHandler = () => {
        axios.get(server + 'instruments/get/tickers/', {
            params: {
                inst_code: selectedInstrumentData[0]['id'],
            }
        })
            .then(response => setTickerData(response['data']))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };
    useEffect(() => {
        dateHandler();
    }, [props])

    return (
        <Card className="card main-layout">
            <Card.Title className="card-header-first">
                <Row>
                    <Col>
                        Source Tickers
                    </Col>
                    <Col>
                        <NewInstrumentTickerModal server={server}/>
                    </Col>
                    <Col>
                        <Button className={"operation-button"}>Delete</Button>
                    </Col>
                </Row>
            </Card.Title>
            <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                <Table>
                    <thead className="table-header-row">
                    <tr>
                        <td className="table-header-row">Internal Ticker</td>
                        <td className="table-header-row">Source</td>
                        <td className="table-header-row">Source Ticker</td>
                    </tr>
                    </thead>
                    <tbody style={{height: '100%', overflow: 'scroll'}}>
                    {tickers}
                    </tbody>
                </Table>
            </div>
        </Card>
    );
};
export default InstrumentSettings;