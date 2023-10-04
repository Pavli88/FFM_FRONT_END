import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

const DashBoardPerformance = (props) => {

    const perfRows = props.data.map((data) => <tr key={data['id']} className={'table-row-all'}>
        <td>{data['portfolio_name']}</td>
        <td style={{color: data['1m,'] > 0.0 ? "green":"red"}}>{Math.round(data['1m']*100)/100}</td>
        <td style={{color: data['3m'] > 0.0 ? "green":"red"}}>{Math.round(data['3m']*100)/100}</td>
        <td style={{color: data['mtd'] > 0.0 ? "green":"red"}}>{Math.round(data['mtd']*100)/100}</td>
        <td style={{color: data['qtd'] > 0.0 ? "green":"red"}}>{Math.round(data['qtd']*100)/100}</td>
        <td style={{color: data['ytd'] > 0.0 ? "green":"red"}}>{Math.round(data['ytd']*100)/100}</td>
        <td style={{color: data['si'] > 0.0 ? "green":"red"}}>{Math.round(data['si']*100)/100}</td>
    </tr>)
    return(
         <div style={{paddingTop: 15}}>
            <Card header={'Instruments'} style={{width: '100%', height: '100%'}}>
                <Card.Header>
                    Performance %
                </Card.Header>
                <div style={{height: '100%', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <Table style={{width: '100%'}}>
                        <thead>
                        <tr>
                            <th>Portfolio</th>
                            <th>1 Month</th>
                            <th>3 Months</th>
                            <th>MTD</th>
                            <th>QTD</th>
                            <th>YTD</th>
                            <th>Since Inception</th>
                        </tr>
                        </thead>
                        <tbody style={{height: '100%', overflow: 'scroll'}}>
                        {perfRows}
                        </tbody>
                    </Table>
                </div>
            </Card>
        </div>
    )
};
export default DashBoardPerformance;