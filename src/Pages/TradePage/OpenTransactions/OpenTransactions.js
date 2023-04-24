import Card from "react-bootstrap/Card";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {BiX} from "react-icons/bi";
import TradeContext from "../context/trade-context";

const OpenTransactions = (props) => {
    const newTransactionID = useContext(TradeContext).newTransactionID;
    const saveNewTransactionID = useContext(TradeContext).saveNewTrnsactionID;
    const [openTransactionsData, setOpenTransactionsData] =  useState([{}]);

    useEffect(() => {
        axios.get(props.server + 'portfolios/get/open_transactions/')
            .then(response => setOpenTransactionsData(response.data))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    }, [newTransactionID])

    const closeAllTransactions = (data) => {
        console.log(data)
        axios.post(props.server + 'trade_page/portfolio/close_transaction/', {
            id: data.id,
            portfolio_code: data.portfolio_code,
            transaction_link_code: data.id,
            quantity: data.quantity,
            sec_group: data.sec_group,
            security: data.security,
            currency: data.currency,
            transaction_type: data.transaction_type === 'Purchase' ? 'Sale': 'Purchase',
            open_status: 'Close Out',
            broker_id: data.broker_id,
        })
            .then(data => {
                alert(data.data.response)
                saveNewTransactionID(data.data.transaction_id)
            })
            .catch((error) => {
                console.error('Error Message:', error);
            });
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
        <td>{data.broker}</td>
        <td>{data.broker_id}</td>
        <td >{<div><button className={'terminate-button'} onClick={() => closeAllTransactions(data.id)}><BiX/></button></div>}</td>
        <td>{<div><button className={'delete-button'} onClick={() => closeAllTransactions(data)}><BiX/></button></div>}</td>
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
                            <th>Broker</th>
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
        </div>
    )
};
export default OpenTransactions;