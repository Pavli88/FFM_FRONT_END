import Card from "react-bootstrap/Card";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {BiX} from "react-icons/bi";
import TradeContext from "../context/trade-context";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const OpenTransactions = (props) => {
    const newTransactionID = useContext(TradeContext).newTransactionID;
    const saveNewTransactionID = useContext(TradeContext).saveNewTrnsactionID;
    const [openTransactionsData, setOpenTransactionsData] =  useState([{}]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(props.server + 'portfolios/get/open_transactions/')
            .then(response => setOpenTransactionsData(response.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    }, [newTransactionID])

    const closeTransactions = (data) => {
        console.log(data)
        // axios.post(props.server + 'trade_page/portfolio/close_transaction/', data)
        //     .then(data => {
        //         alert(data.data.response)
        //         saveNewTransactionID(data.data.transaction_id)
        //     })
        //     .catch((error) => {
        //         console.error('Error Message:', error);
        //     });
    }

    const openTransactions = openTransactionsData.map((data) => <tr key={data.id} className={'table-row-all'}>
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
        <td >{<div><button className={'terminate-button'} onClick={() => closeTransactions({...data, status: 'close_out'})}><BiX/></button></div>}</td>
        <td>{<div><button className={'delete-button'} onClick={() => closeTransactions({...data, status: 'close_all'})}><BiX/></button></div>}</td>
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
            {/*<Modal show={showNewInstrumentModal} onHide={handleClose}>*/}
            {/*    <Modal.Header closeButton>*/}
            {/*        <Modal.Title>Close Unit</Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        <Form onSubmit={submitHandler} style={{width: '100%'}}>*/}
            {/*            */}
            {/*            <Form.Group>*/}
            {/*                <Form.Label>Units</Form.Label>*/}
            {/*                <Form.Control ref={tickerRef} type="text" required/>*/}
            {/*            </Form.Group>*/}
            {/*            */}
            {/*        </Form>*/}
            {/*    </Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button variant="secondary" onClick={handleClose}>*/}
            {/*            Close*/}
            {/*        </Button>*/}
            {/*        <Button variant="primary" onClick={submitHandler}>*/}
            {/*            Save*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}
        </div>
    )
};
export default OpenTransactions;