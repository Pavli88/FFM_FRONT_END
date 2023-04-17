import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import './PortfolioTransactions.css'

const PortfolioTransactions = (props) => {
    const portTransData = props.data.map((data) => <tr key={data.id} className={'table-row-all'}>
        <td className={'table-row'}>{data.id}</td>
        <td className={'table-row'}>{data.portfolio_code}</td>
        <td className={'table-row'}>{data.security}</td>
        <td className={'table-row'}>{data.quantity}</td>
        <td className={'table-row'}>{data.price}</td>
        <td className={'table-row'}>{data.mv}</td>
        <td className={'table-row'}>{data.currency}</td>
        <td className={'table-row'}>{data.trading_cost}</td>
        <td className={'table-row'}>{data.transaction_type}</td>
        <td className={'table-row'}>{data.transaction_link_code}</td>
        <td className={'table-row'}>{data.created_on}</td>
        <td className={'table-row'}>{data.trade_date}</td>
        <td className={'table-row'}>{data['is_active']}</td>
    </tr>)
    return (
        <div style={{height: '100%', paddingLeft: 15}}>
            <Card className={'transactions-container'}>
                <Card.Header>Transactions</Card.Header>
                <div style={{height: '100%', overflowY: 'scroll', overflowX: 'auto'}}>
                    <Table >
                        <thead>
                        <tr>
                            <td className="transactions-table-header">ID</td>
                            <td className="transactions-table-header" >Portfolio Code</td>
                            <td className="transactions-table-header">Security</td>
                            <td className="transactions-table-header">Quantity</td>
                            <td className="transactions-table-header">Price</td>
                            <td className="transactions-table-header">Market Value</td>
                            <td className="transactions-table-header">Currency</td>
                            <td className="transactions-table-header">Cost</td>
                            <td className="transactions-table-header">Transaction Type</td>
                            <td className="transactions-table-header">Related Transaction</td>
                            <td className="transactions-table-header">Created On</td>
                            <td className="transactions-table-header">Trade Date</td>
                            <td className="transactions-table-header">Active</td>
                        </tr>
                        </thead>
                        <tbody>
                        {portTransData}
                        </tbody>
                    </Table>
                </div>
            </Card>
        </div>
    );
};

export default PortfolioTransactions;