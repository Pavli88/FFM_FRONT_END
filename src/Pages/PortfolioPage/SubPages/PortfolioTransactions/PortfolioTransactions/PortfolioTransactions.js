import Card from "react-bootstrap/Card";
import './PortfolioTransactions.css'
import { BiX } from 'react-icons/bi';
import axios from "axios";

const PortfolioTransactions = (props) => {
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
    const portTransData = props.data.map((data) => <tr key={data.id} className={'table-row-all'}>
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
        </div>
    );
};

export default PortfolioTransactions;