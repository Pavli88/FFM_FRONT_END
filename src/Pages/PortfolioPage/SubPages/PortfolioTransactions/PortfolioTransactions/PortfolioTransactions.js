import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import './PortfolioTransactions.css'

const PortfolioTransactions = (props) => {
    console.log(props.data)
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
        <td>{data.sub_type}</td>
        <td>{data.transaction_link_code}</td>
        <td>{data.created_on}</td>
        <td>{data.trade_date}</td>
        <td>{data['is_active']}</td>
        <td>{data['is_active']}</td>
        <td>{data['is_active']}</td>
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
                            <th>Sub Type</th>
                            <th>Related Transaction</th>
                            <th>Created On</th>
                            <th>Trade Date</th>
                            <th>Active</th>
                            <th>Active</th>
                            <th>Active</th>
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