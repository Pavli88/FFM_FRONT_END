import Card from "react-bootstrap/Card";
import './PortfolioTransactions.css'
import { BiX } from 'react-icons/bi';
import axios from "axios";
import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Nav} from "react-bootstrap";
import Select from "react-select";

const PortfolioTransactions = (props) => {
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [showModal, setShowModal] = useState(false);

    const deleteTransaction = (id) => {
        axios.post(props.server + 'portfolios/delete/transaction/', {
            id: id,
        })
            .then(response => alert(response.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
        // props.fetch()
    };

    const updateTransaction = () =>  {
        axios.post(props.server + 'portfolios/update/transaction/', selectedTransaction)
            .then(response => alert(response.data.response))
            .catch((error) => {
                console.error('Error Message:', error);
            });
    };

    const portTransData = props.data.map((data) => <tr key={data.id} className={'table-row-all'}
                                                       style={{cursor: data.sec_group === 'Cash' ? '': "pointer"}} onDoubleClick={() => {
        if (data.sec_group != 'Cash') {
            setSelectedTransaction(data)
            setShowModal(true)
        }

    }}>
        <td>{data.id}</td>
        <td>{data.portfolio_code}</td>
        <td >{data.security}</td>
        <td >{data.sec_group}</td>
        <td>{data.quantity}</td>
        <td>{data.price}</td>
        <td>{data.mv}</td>
        <td>{data.currency}</td>
        <td>{data.trading_cost}</td>
        <td >{data.transaction_type}</td>
        <td>{data.open_status}</td>
        <td>{data.transaction_link_code}</td>
        <td>{data.created_on}</td>
        <td>{data.trade_date}</td>
        <td>{data.account_id}</td>
        <td>{data.broker_id}</td>
        <td>{data['is_active']}</td>
        <td>{data.transaction_link_code === '' ? <div style={{padding: 0, width: 30}}><button className={'delete-button'} onClick={() => deleteTransaction(data.id)}><BiX/></button></div>: ''}</td>
    </tr>)
    return (
        <div style={{height: '100%', paddingLeft: 15}}>
            <Card className={'transactions-container'}>
                <Card.Header>Transactions</Card.Header>
                <div style={{height: '100%', width: '100%', overflowY: 'scroll', overflowX: 'auto'}}>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Portfolio Code</th>
                            <th>Security</th>
                            <th>Sec Group</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Market Value</th>
                            <th>Currency</th>
                            <th>Cost</th>
                            <th>Type</th>
                            <th>Open/Closed</th>
                            <th>Related Transaction</th>
                            <th>Created On</th>
                            <th>Trade Date</th>
                            <th>Account ID</th>
                            <th>Broker ID</th>
                            <th>Active</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {portTransData}
                        </tbody>
                    </table>
                </div>
            </Card>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Update Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{width: '100%'}}>

                    {selectedTransaction.sec_group === 'Cash' ? '': <div style={{display: 'flex', padding: '5px', width: '100%', height: '50px'}}>
                        <div className={'portfolio-settings-name-field'}>
                            <Nav.Link href="#" disabled>
                                Open Status
                            </Nav.Link>
                        </div>
                        <div style={{width: '100%'}}>
                            <Select style={{height: '100%'}}
                                    value={selectedTransaction.open_status}
                                    options={[
                                        { value: 'Open', label: 'Open'},
                                        { value: 'Closed', label: 'Closed'}
                                    ]}
                                    placeholder={selectedTransaction.open_status}
                                    onChange={(e) => setSelectedTransaction({...selectedTransaction, open_status: e.value})}
                            >
                            </Select>
                        </div>
                    </div>}


                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={updateTransaction}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
};

export default PortfolioTransactions;