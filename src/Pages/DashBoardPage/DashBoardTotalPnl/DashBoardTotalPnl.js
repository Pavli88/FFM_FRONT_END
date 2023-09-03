import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import InstrumentPrices from "../../InstrumentPage/InstrumentInfo/InstrumentPrices/InstrumentPrices";
import InstrumentBrokerTickers
    from "../../InstrumentPage/InstrumentInfo/InstrumentBrokerTickers/InstrumentBrokerTickers";

const DashBoardTotalPnl = (props) => {
    const pnls = props.data.map((data) => <tr key={data['id']} className={'table-row-all'}>
        <td style={{color: data['total'] > 0.0 ? "green":"red"}}>{Math.round(data['total']*100)/100}</td>
        <td>{data['portfolio_code']}</td>
    </tr>)
    return(
        <div style={{paddingTop: 15}}>
            <Card header={'Instruments'} style={{width: '100%', height: '100%'}}>
                <Card.Header>
                    Total Profit & Loss
                </Card.Header>
                <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <Table style={{width: '100%'}}>
                        <thead>
                        <tr>
                            <th>P&L</th>
                            <th>Currency</th>
                        </tr>
                        </thead>
                        <tbody style={{height: '100%', overflow: 'scroll'}}>
                        {pnls}
                        </tbody>
                    </Table>
                </div>
            </Card>
        </div>
    )
};
export default DashBoardTotalPnl;