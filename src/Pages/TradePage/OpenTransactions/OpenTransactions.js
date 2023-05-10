import Card from "react-bootstrap/Card";
import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {BiX} from "react-icons/bi";
import TradeContext from "../context/trade-context";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";




const UnitModal = (props) => {
    const [newUnit, setNewUnit] = useState(0);
    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>Close Units - {props.data.portfolio_code} - {props.data.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{width: '100%'}}>

                    <Form.Group>
                        <Form.Label>Units</Form.Label>
                        <Form.Control onChange={(e) => setNewUnit(e.target.value)} type="number" min={0} max={props.data.quantity} required/>
                    </Form.Group>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => props.close({...props.data, quantity: newUnit, status: 'Close Out'})}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const OpenTransactions = (props) => {
    const newTransactionID = useContext(TradeContext).newTransactionID;
    const saveNewTransactionID = useContext(TradeContext).saveNewTrnsactionID;
    const [openTransactionsData, setOpenTransactionsData] =  useState([{}]);
    const [showModal, setShowModal] = useState(false);
    const [transactionParams, setTransactionParams] = useState({});
    const MINUTE_MS = 10000;

    useEffect(() => {
        fetchTransactions()
        // const interval = setInterval(() => {
        //     fetchTransactions()
        // }, MINUTE_MS);
        // return () => clearInterval(interval);
    }, [newTransactionID])

    const closeTransactions = async (data) => {
        const response = await axios.post(props.server + 'trade_page/new/signal/', data)
        saveNewTransactionID(response.data.transaction_id)
    }

    const fetchTransactions = async() => {
        const response = await axios.get(props.server + 'portfolios/get/open_transactions/')
        setOpenTransactionsData(response.data)
    };

    const openTransactions = openTransactionsData.map((data) => <tr key={data.id} className={'table-row-all'} style={{color: data.quantity > 0 ? 'green': 'red'}}>
        <td>{data.id}</td>
        <td>{data.portfolio_code}</td>
        <td >{data.security}</td>
        <td >{data.sec_group}</td>
        <td>{data.currency}</td>
        <td>{data.transaction_type}</td>
        <td>{data.quantity}</td>
        <td>{data.price}</td>
        <td>{data.mv}</td>
        <td>{data.account_id}</td>
        <td>{data.broker_id}</td>
        <td >{<div><button className={'terminate-button'} onClick={() => {
            setTransactionParams(data)
            setShowModal(true)
        }}><BiX/></button>
        </div>}</td>
        <td>{<div>
            <button className={'delete-button'} onClick={() => closeTransactions({...data, transaction_type: 'Close'})}><BiX/></button>
        </div>}</td>
    </tr>)

    return(
        <div style={{height: '100%', paddingLeft: 15}}>
            <Card className={'transactions-container'}>
                <Card.Header>Open Transactions</Card.Header>
                <div style={{height: '100%', width: '100%', overflowY: 'scroll', overflowX: 'auto'}}>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Portfolio Code</th>
                            <th>Security</th>
                            <th>Sec Group</th>
                            <th>Currency</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Market Value</th>
                            <th>Account ID</th>
                            <th>Broker ID</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {openTransactions}
                        </tbody>
                    </table>
                </div>
            </Card>
            <UnitModal show={showModal}
                       hide={() => setShowModal(false)}
                       data={transactionParams}
                       close={closeTransactions}/>
        </div>
    )
};
export default OpenTransactions;