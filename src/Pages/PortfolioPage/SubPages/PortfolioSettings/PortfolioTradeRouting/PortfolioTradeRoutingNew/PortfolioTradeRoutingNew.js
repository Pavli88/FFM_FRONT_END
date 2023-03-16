// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from "axios";
import {useState, useRef } from "react";
import Table from "react-bootstrap/Table";

import './PortfolioTradeRoutingNew.css'

const PortfolioTradeRoutingNew = (props) => {
    const [currentTab, setCurrentTab] = useState(0);
    const [tickers, setTickers] = useState([]);
    const [selectedTicker, setSelectedTicker] = useState({});
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState({});
    const instCodeRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(props.server + 'portfolios/create/robot/', {
            portfolio_code: 'TEST',
            inst_id: instCodeRef.current.value,
            ticker_id: selectedTicker['id'],
            broker_account_id: selectedAccount['id'],
        })
            .then(data=>alert(data.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const getTickers = () => {
        axios.get(props.server + 'instruments/get/broker/tickers/', {
            params: {
                id: instCodeRef.current.value
            }
        })
            .then(data => setTickers(data.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const getAccounts = (broker) => {
        axios.get(props.server + 'accounts/get_accounts/', {
            params: {
                broker_name: broker
            }
        })
            .then(data => setAccounts(data.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const handleClose = () => {
        setCurrentTab(0);
        setTickers([]);
        setSelectedTicker({});
        setAccounts([]);
        setSelectedAccount({});
        props.hide();
    };

    const tickerRows = tickers.map((data) => <tr key={data.id} onClick={function(){
        setSelectedTicker(data)
        getAccounts(data.source)
    }}>
        <td>{data.source}</td>
        <td>{data.source_ticker}</td>
    </tr>)

    const accountRows = accounts.map((data) => <tr key={data.id} onClick={() => setSelectedAccount(data)}>
        <td>{data.account_number}</td>
        <td>{data.env}</td>
    </tr>)

    const tickerTable = <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
        <Table style={{width: '100%'}}>
            <thead className="table-header-row">
            <tr>
                <td style={{border: '0px', verticalAlign: "middle"}}>Broker</td>
                <td style={{border: '0px', verticalAlign: "middle"}}>Ticker</td>
            </tr>
            </thead>
            <tbody style={{height: '100%', overflow: 'scroll'}}>
            {tickerRows}
            </tbody>
        </Table>
    </div>

    const accountTable = <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
        <Table style={{width: '100%'}}>
            <thead className="table-header-row">
            <tr>
                <td style={{border: '0px', verticalAlign: "middle"}}>Account Number</td>
                <td style={{border: '0px', verticalAlign: "middle"}}>Environment</td>
            </tr>
            </thead>
            <tbody style={{height: '100%', overflow: 'scroll'}}>
            {accountRows}
            </tbody>
        </Table>
    </div>

    const saveButton = <Button variant="primary" onClick={submitHandler}>
        Save
    </Button>

    const nextButton = <Button variant="primary" onClick={() => setCurrentTab(currentTab + 1)}>
        Next
    </Button>

    const previousButton = <Button variant="primary" disabled={currentTab === 0}
                                   onClick={() => setCurrentTab(currentTab - 1)}>
        Previous
    </Button>

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Instrument Routing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display: 'flex', marginBottom: 15}}>
                    <div className={'title'}>
                        Ticker
                    </div>
                    <div className={'title2'}>
                        {selectedTicker['source_ticker']}
                    </div>
                    <div className={'title'}>
                        Broker
                    </div>
                    <div className={'title2'}>
                        {selectedTicker['source']}
                    </div>
                    <div className={'title'}>
                        Account
                    </div>
                    <div className={'title2'}>
                        {selectedAccount['account_number']}
                    </div>
                </div>

                <Tabs
                    id="controlled-tab-example"
                    defaultActiveKey="instrument"
                    activeKey={currentTab}
                    className="mb-3"
                >
                    <Tab eventKey={0} title="Instrument" disabled={currentTab !== 0} className={'nav-tabs'}>
                        <Form.Label>Instrument ID</Form.Label>
                        <div style={{display: "flex", marginBottom: 15}}>
                            <div>
                                <Form.Control ref={instCodeRef} type="number" required/>
                            </div>
                            <div>
                                <Button onClick={getTickers}>Get</Button>
                            </div>
                        </div>
                        {tickers.length > 0 ? tickerTable : null}
                    </Tab>
                    <Tab eventKey={1} title="Broker Account" disabled={currentTab !== 1}>
                        {tickers.length > 0 ? accountTable : null}
                    </Tab>
                    <Tab eventKey={2} title="Quantity" disabled={currentTab !== 2}>
                        <div>
                            <Form.Label>Quantity Type</Form.Label>
                            <Form.Control as="select">
                                <option value={'Fix'}>Fix</option>
                                <option value={'Stop Based'}>Stop Based</option>
                            </Form.Control>
                        </div>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                {currentTab > 0 ? previousButton : null}
                {currentTab < 2 ? nextButton : null}
                {currentTab === 2 ? saveButton : null}
            </Modal.Footer>
        </Modal>
    )
}
export default PortfolioTradeRoutingNew;